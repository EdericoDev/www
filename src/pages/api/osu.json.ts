import type { APIRoute } from 'astro';
import { z } from 'zod';
import { VercelKV as Redis } from '@vercel/kv';

// Dynamically import psn-api
const psnApi = await import('psn-api');

const redis = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

const npsso = import.meta.env.PSN_NPSSO;
const psnUsername = import.meta.env.PSN_USERNAME;

async function getAccessToken() {
  const { exchangeNpssoForCode, exchangeCodeForAccessToken } = psnApi;
  const accessCode = await exchangeNpssoForCode(npsso);
  const accessTokenResponse = await exchangeCodeForAccessToken(accessCode);
  return accessTokenResponse;
}

async function getUserData(authPayload: any) {
  const { getProfileFromUserName } = psnApi;
  return await getProfileFromUserName(authPayload, psnUsername);
}

async function getLastPlayedGame(authPayload: any) {
  const { getUserTitles } = psnApi;
  const userTitles = await getUserTitles(authPayload, psnUsername);

  if (userTitles.trophyTitles && userTitles.trophyTitles.length > 0) {
    const lastGame = userTitles.trophyTitles[0];
    return {
      title: lastGame.trophyTitleName,
      progress: lastGame.earnedTrophies.platinum + lastGame.earnedTrophies.gold + lastGame.earnedTrophies.silver + lastGame.earnedTrophies.bronze,
      iconUrl: lastGame.trophyTitleIconUrl
    };
  }
  return null;
}

export type PsnResponse = {
  accountId: string;
  username: string;
  avatarUrl: string;
  trophies: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  lastPlayedGame: {
    title: string;
    progress: number;
    iconUrl: string;
  } | null;
};

const getPsnStatus = async (): Promise<PsnResponse> => {
  try {
    const authPayload = await getAccessToken();
    const userData = await getUserData(authPayload);
    const avatarUrl = userData.profile.avatarUrls.find((avatar: any) => avatar.size === 'm')?.avatarUrl || '';
    const lastPlayedGame = await getLastPlayedGame(authPayload);

    return {
      accountId: userData.profile.accountId,
      username: userData.profile.onlineId,
      avatarUrl,
      trophies: {
        platinum: userData.profile.trophySummary.earnedTrophies.platinum,
        gold: userData.profile.trophySummary.earnedTrophies.gold,
        silver: userData.profile.trophySummary.earnedTrophies.silver,
        bronze: userData.profile.trophySummary.earnedTrophies.bronze,
      },
      lastPlayedGame,
    };
  } catch (error) {
    console.error('Error fetching PSN data:', error);
    throw error;
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const psnCache = await redis.get('psn-cache').catch((err) => {
      console.error(err);
    });

    if (psnCache) {
      return new Response(JSON.stringify(psnCache), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const psnStatus = await getPsnStatus();
    await redis.setex('psn-cache', 300, psnStatus).catch((err) => {
      console.error(err);
    });

    return new Response(JSON.stringify(psnStatus), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    console.error('Error in PSN API:', error);

    let errorMessage = 'Failed to fetch PSN data';
    let errorDetails = 'An unknown error occurred';

    if (error instanceof Error) {
      errorDetails = error.message;
    } else if (typeof error === 'string') {
      errorDetails = error;
    }

    return new Response(JSON.stringify({ error: errorMessage, details: errorDetails }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
