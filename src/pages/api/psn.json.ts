import type { APIRoute } from 'astro';

const npsso = import.meta.env.PSN_NPSSO; 
const psnUsername = import.meta.env.PSN_USERNAME; 

async function getAccessToken(psnApi: any) {
  const { exchangeNpssoForCode, exchangeCodeForAccessToken } = psnApi;
  const accessCode = await exchangeNpssoForCode(npsso);
  const accessTokenResponse = await exchangeCodeForAccessToken(accessCode);
  return accessTokenResponse;
}

async function getUserData(psnApi: any, authPayload: any) {
  const { getProfileFromUserName } = psnApi;
  return await getProfileFromUserName(authPayload, psnUsername);
}

async function getLastPlayedGame(psnApi: any, authPayload: any) {
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

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const psnApi = await import('psn-api');

    const authPayload = await getAccessToken(psnApi);
    console.log('Authorization Payload:', authPayload);

    const userData = await getUserData(psnApi, authPayload);
    console.log('User Data:', userData);

    const avatarUrl = userData.profile.avatarUrls.find((avatar: any) => avatar.size === 'm')?.avatarUrl || '';

    const lastPlayedGame = await getLastPlayedGame(psnApi, authPayload);
    console.log('Last Played Game:', lastPlayedGame);

    const psnData: PsnResponse = {
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

    return new Response(JSON.stringify(psnData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    console.error('Error fetching PSN data:', error);

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