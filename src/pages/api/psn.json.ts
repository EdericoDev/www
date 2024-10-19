import type { APIRoute } from 'astro';
import env from "env-var";
import * as psn from 'psn-api';

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

async function getAccessToken(): Promise<psn.AuthorizationPayload> {
  const PSN_NPSSO_TOKEN = env.get('PSN_NPSSO_TOKEN').required().asString();
  const accessCode = await psn.exchangeNpssoForCode(PSN_NPSSO_TOKEN);
  return await psn.exchangeCodeForAccessToken(accessCode);
}

export const get: APIRoute = async ({ request }) => {
  try {
    const authorization = await getAccessToken();

    // Fetch recently played games
    const { data: { gameLibraryTitlesRetrieve: recentlyPlayedGames } } = await psn.getRecentlyPlayedGames(
      authorization
    );

    // Fetch user's trophy titles
    const trophies = await psn.getUserTitles(
      authorization,
      'me'
    );

    // Fetch user's profile
    const { profile } = await psn.getProfileFromUserName(authorization, 'me');

    const lastPlayedGame = recentlyPlayedGames.games
      .filter(g => g.platform !== 'UNKNOWN')
      [0];

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

    return new Response(JSON.stringify(psnResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error('Error fetching PSN data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch PSN data' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};