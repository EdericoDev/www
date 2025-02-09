export { r as renderers } from '../../chunks/_@astro-renderers_B2oNcLm2.mjs';

const OSU_API_URL = "https://osu.ppy.sh/api/v2";
const OSU_TOKEN_URL = "https://osu.ppy.sh/oauth/token";
const clientId = undefined                             ;
const clientSecret = undefined                                 ;
const userId = undefined                           ;
async function getAccessToken() {
  const response = await fetch(OSU_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
      scope: "public"
    })
  });
  const data = await response.json();
  return data.access_token;
}
async function getUserData(accessToken) {
  const response = await fetch(`${OSU_API_URL}/users/${userId}/osu`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.json();
}
async function getRecentActivity(accessToken) {
  const response = await fetch(`${OSU_API_URL}/users/${userId}/scores/recent?limit=1`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.json();
}
const GET = async ({ params, request }) => {
  try {
    const accessToken = await getAccessToken();
    console.log("Access Token:", accessToken);
    const userData = await getUserData(accessToken);
    console.log("User Data:", userData);
    const recentActivity = await getRecentActivity(accessToken);
    console.log("Recent Activity:", recentActivity);
    const osuData = {
      userId: userData.id,
      username: userData.username,
      avatarUrl: userData.avatar_url,
      globalRank: userData.statistics?.global_rank ?? null,
      countryRank: userData.statistics?.country_rank ?? null,
      pp: userData.statistics?.pp ?? null,
      accuracy: userData.statistics?.hit_accuracy ?? null,
      lastPlayed: recentActivity[0] ? {
        beatmapTitle: recentActivity[0].beatmapset?.title ?? "Unknown",
        beatmapUrl: `https://osu.ppy.sh/beatmapsets/${recentActivity[0].beatmapset?.id}#osu/${recentActivity[0].beatmap?.id}`,
        score: recentActivity[0].score ?? 0,
        accuracy: (recentActivity[0].accuracy ?? 0) * 100,
        rank: recentActivity[0].rank ?? "Unknown",
        difficulty: recentActivity[0].beatmap?.version ?? "Unknown",
        starRating: recentActivity[0].beatmap?.difficulty_rating ?? 0
      } : null
    };
    return new Response(JSON.stringify(osuData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching osu! data:", error);
    let errorMessage = "Failed to fetch osu! data";
    let errorDetails = "An unknown error occurred";
    if (error instanceof Error) {
      errorDetails = error.message;
    } else if (typeof error === "string") {
      errorDetails = error;
    }
    return new Response(JSON.stringify({ error: errorMessage, details: errorDetails }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
