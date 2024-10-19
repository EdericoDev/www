import type { APIRoute } from 'astro';
import env from "env-var";
import * as psn from 'psn-api';
import { kv } from '@vercel/kv';

interface TrophyCounts {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
}

interface LastPlayed {
  name: string;
  iconUrl: string;
  completionPercentage: number;
}

interface PSNResponse {
  trophyCounts: TrophyCounts;
  lastPlayed: LastPlayed;
  username: string;
}

async function getAccessToken(): Promise<any> {
  const PSN_NPSSO_TOKEN = env.get('PSN_NPSSO_TOKEN').required().asString();
  try {
    console.log('Exchanging NPSSO for access code');
    const accessCode = await psn.exchangeNpssoForCode(PSN_NPSSO_TOKEN);
    console.log('Exchanging access code for authorization');
    return await psn.exchangeCodeForAccessToken(accessCode);
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw new Error('Failed to obtain access token');
  }
}

async function getCachedData(key: string): Promise<string | null> {
  try {
    return await kv.get(key);
  } catch (error) {
    console.error('Vercel KV get error:', error);
    return null;
  }
}

async function setCachedData(key: string, value: string, expirationInSeconds: number): Promise<void> {
  try {
    await kv.set(key, value, { ex: expirationInSeconds });
  } catch (error) {
    console.error('Vercel KV set error:', error);
  }
}

export const get: APIRoute = async ({ request }) => {
  console.log('PSN API request received');
  
  try {
    const cachedResponse = await getCachedData('psn_data');
    if (cachedResponse) {
      console.log('Returning cached PSN data');
      return new Response(cachedResponse, {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    console.log('Cache miss, fetching fresh PSN data');
    const authorization = await getAccessToken();

    console.log('Fetching recently played games');
    const { data: { gameLibraryTitlesRetrieve: recentlyPlayedGames } } = await psn.getRecentlyPlayedGames(
      authorization
    );

    console.log('Fetching user trophy titles');
    const trophies = await psn.getUserTitles(
      authorization,
      'me'
    );

    console.log('Fetching user profile');
    const { profile } = await psn.getProfileFromUserName(authorization, 'me');

    const lastPlayedGame = recentlyPlayedGames.games
      .filter(g => g.platform !== 'UNKNOWN')
      [0];

    if (!lastPlayedGame) {
      throw new Error('No valid recently played games found');
    }

    const trophiesForGame = trophies.trophyTitles.find(t => lastPlayedGame.name.includes(t.trophyTitleName));

    let progress = 0;
    if (trophiesForGame) {
      const totalTrophies = Object.values(trophiesForGame.definedTrophies).reduce((total, current) => total + current, 0);
      const earnedTrophies = Object.values(trophiesForGame.earnedTrophies).reduce((total, current) => total + current, 0);
      progress = Math.round((earnedTrophies / totalTrophies) * 100);
    }

    const totalTrophies = trophies.trophyTitles.reduce((acc, title) => {
      Object.entries(title.earnedTrophies).forEach(([type, count]) => {
        acc[type as keyof TrophyCounts] += count;
      });
      return acc;
    }, { bronze: 0, silver: 0, gold: 0, platinum: 0 });

    const psnResponse: PSNResponse = {
      trophyCounts: totalTrophies,
      lastPlayed: {
        name: lastPlayedGame.name,
        iconUrl: lastPlayedGame.image.url,
        completionPercentage: progress
      },
      username: profile.onlineId
    };

    await setCachedData('psn_data', JSON.stringify(psnResponse), 3600); 

    console.log('Returning fresh PSN data');
    return new Response(JSON.stringify(psnResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error('Error in PSN API route:', error);
    let errorMessage = 'An unexpected error occurred';
    let errorDetails = '';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    }

    if (errorMessage.includes('Failed to obtain access token')) {
      statusCode = 401;
      errorMessage = 'Authentication failed';
    }

    return new Response(JSON.stringify({
      error: errorMessage,
      details: errorDetails
    }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" }
    });
  }
};