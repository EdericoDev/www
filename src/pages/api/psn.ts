import type { APIRoute } from "astro";

const PSN_API_URL = "https://psn-api.achievements.app/v1/";
const PSN_USERNAME = import.meta.env.PSN_USERNAME;

export type PSNResponse = {
  accountId: string;
  onlineId: string;
  avatarUrl: string;
  trophyLevel: number;
  trophies: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  lastPlayedGame: {
    name: string;
    imageUrl: string;
    trophyProgress: number;
  } | null;
};

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const userResponse = await fetch(`${PSN_API_URL}players/${PSN_USERNAME}`);
    const userData = await userResponse.json();

    const trophiesResponse = await fetch(`${PSN_API_URL}players/${PSN_USERNAME}/trophies`);
    const trophiesData = await trophiesResponse.json();

    const recentGamesResponse = await fetch(`${PSN_API_URL}players/${PSN_USERNAME}/recent-games`);
    const recentGamesData = await recentGamesResponse.json();

    const psnData: PSNResponse = {
      accountId: userData.accountId,
      onlineId: userData.onlineId,
      avatarUrl: userData.avatarUrl,
      trophyLevel: userData.trophySummary.level,
      trophies: {
        bronze: trophiesData.bronze,
        silver: trophiesData.silver,
        gold: trophiesData.gold,
        platinum: trophiesData.platinum,
      },
      lastPlayedGame: recentGamesData[0] ? {
        name: recentGamesData[0].name,
        imageUrl: recentGamesData[0].imageUrl,
        trophyProgress: recentGamesData[0].progress,
      } : null,
    };

    return new Response(JSON.stringify(psnData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error fetching PSN data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch PSN data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
