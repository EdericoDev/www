import type { APIRoute } from "astro";

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

async function getRecentActivity(accessToken: string) {
  const response = await fetch(`${OSU_API_URL}/users/${userId}/scores/recent?limit=1`, {
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
  globalRank: number | null;
  countryRank: number | null;
  pp: number | null;
  accuracy: number | null;
  lastPlayed: {
    beatmapTitle: string;
    beatmapUrl: string;
    score: number;
    accuracy: number;
    rank: string;
    difficulty: {
      name: string;
      star_rating: number;
    };
  } | null;
};

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const accessToken = await getAccessToken();
    console.log("Access Token:", accessToken);

    const userData = await getUserData(accessToken);
    console.log("User Data:", userData);

    const recentActivity = await getRecentActivity(accessToken);
    console.log("Recent Activity:", recentActivity);

    const osuData: OsuResponse = {
      userId: userData.id,
      username: userData.username,
      avatarUrl: userData.avatar_url,
      globalRank: userData.statistics?.global_rank ?? null,
      countryRank: userData.statistics?.country_rank ?? null,
      pp: userData.statistics?.pp ?? null,
      accuracy: userData.statistics?.hit_accuracy ?? null,
      lastPlayed: recentActivity[0] ? {
        beatmapTitle: recentActivity[0].beatmapset?.title ?? 'Unknown',
        beatmapUrl: `https://osu.ppy.sh/beatmapsets/${recentActivity[0].beatmapset?.id}#osu/${recentActivity[0].beatmap?.id}`,
        score: recentActivity[0].score ?? 0,
        accuracy: (recentActivity[0].accuracy ?? 0) * 100,
        rank: `${recentActivity[0].rank ?? 'Unknown'} (${recentActivity[0].beatmap?.version ?? 'Unknown'})`,
        difficulty: {
          name: recentActivity[0].beatmap?.version ?? 'Unknown',
          star_rating: recentActivity[0].beatmap?.difficulty_rating ?? 0,
        },
      } : null,
    };

    return new Response(JSON.stringify(osuData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching osu! data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch osu! data", details: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

