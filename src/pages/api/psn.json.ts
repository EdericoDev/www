import type { APIRoute } from "astro";
import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  makeUniversalSearch,
} from "psn-api";

let authorization = null;

async function authenticate() {
  if (!authorization || isAccessTokenExpired()) {
    const npsso = process.env.NPSSO;
    const accessCode = await exchangeNpssoForCode(npsso);
    authorization = await exchangeCodeForAccessToken(accessCode);
  }
}

const isAccessTokenExpired = () => {
  const now = new Date();
  return new Date(now.getTime() + authorization.expiresIn * 1000).getTime() < now.getTime();
};

export const GET: APIRoute = async () => {
  try {
    await authenticate();
    
    const PSN_USERNAME = process.env.PSN_USERNAME;
    const searchResults = await makeUniversalSearch(authorization, (PSN_USERNAME), "SocialAllAccounts");
    const accountId = searchResults.domainResponses[0].results[0].socialMetadata.accountId;
    const userData = searchResults.domainResponses[0].results[0];

    const { trophyTitles } = await getUserTitles(authorization, accountId);
    const lastPlayedGame = trophyTitles[0]; 

    const earnedCounts = trophyTitles.reduce(
      (acc, title) => ({
        platinum: acc.platinum + title.earnedTrophies.platinum,
        gold: acc.gold + title.earnedTrophies.gold,
        silver: acc.silver + title.earnedTrophies.silver,
        bronze: acc.bronze + title.earnedTrophies.bronze,
      }),
      { platinum: 0, gold: 0, silver: 0, bronze: 0 }
    );

    return new Response(
      JSON.stringify({
        profile: {
          onlineId: userData.socialMetadata.onlineId,
          avatarUrl: userData.socialMetadata.avatarUrl,
        },
        trophies: earnedCounts,
        lastPlayedGame: lastPlayedGame
          ? {
              name: lastPlayedGame.trophyTitleName,
              imageUrl: lastPlayedGame.trophyTitleIconUrl,
              progress: lastPlayedGame.earnedTrophies.progress, 
            }
          : null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
