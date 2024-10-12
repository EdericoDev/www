import type { APIRoute } from "astro";
import { z } from "zod";

const OSU_API_URL = "https://osu.ppy.sh/api/v2";
const OSU_TOKEN_URL = "https://osu.ppy.sh/oauth/token";

const clientId = import.meta.env.OSU_CLIENT_ID;
const clientSecret = import.meta.env.OSU_CLIENT_SECRET;
const userId = import.meta.env.OSU_USER_ID;

async function getAccessToken() {
  const response = await fetch(OSU_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
      scope: "public",
    }),
  });

  const data = await response.json();
  return data.access_token;
}

async function getUserData(accessToken: string) {
  const response = await fetch(`${OSU_API_URL}/users/${userId}/osu`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}

async function getRecentLazerActivity(accessToken: string) {
  const response = await fetch(`${OSU_API_URL}/users/${userId}/scores/recent?mode=lazer`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.json();
}


export type OsuResponse = {
  userId: string;
  username: string;
  avatarUrl: string;
  globalRank: number;
  countryRank: number;
  pp: number;
  accuracy: number;
  lastPlayed: {
    beatmapTitle: string;
    beatmapUrl: string;
    score: number;
    accuracy: number;
    rank: string;
    ruleset: string;
  } | null;
};

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const accessToken = await getAccessToken();
    const userData = await getUserData(accessToken);
    const recentActivity = await getRecentLazerActivity(accessToken);

    const osuData: OsuResponse = {
      userId: userData.id,
      username: userData.username,
      avatarUrl: userData.avatar_url,
      globalRank: userData.statistics.global_rank,
      countryRank: userData.statistics.country_rank,
      pp: userData.statistics.pp,
      accuracy: userData.statistics.hit_accuracy,
      lastPlayed: recentActivity[0] ? {
        beatmapTitle: recentActivity[0].beatmapset.title,
        beatmapUrl: `https://osu.ppy.sh/beatmapsets/${recentActivity[0].beatmapset.id}`,
        score: recentActivity[0].score,
        accuracy: recentActivity[0].accuracy * 100,
        rank: recentActivity[0].rank,
        ruleset: recentActivity[0].ruleset.short_name,
      } : null,
    };

    return new Response(JSON.stringify(osuData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching osu!lazer data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch osu!lazer data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
