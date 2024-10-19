import type { APIRoute } from "astro";
import * as psn from 'psn-api';
import { getValidAccessToken } from '../api/psnauth';

export type PSNGame = {
  iconUrl: string;
  platform: string;
  name: string;
  progress: number;
  lastPlayed: number;
};

export type PSNResponse = {
  recentlyPlayedGames: PSNGame[];
};

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const accessToken = await getValidAccessToken();

    const { data: { gameLibraryTitlesRetrieve: recentlyPlayedGames } } = await psn.getRecentlyPlayedGames(
      { accessToken }
    );

    const trophies = await psn.getUserTitles(
      { accessToken },
      'me'
    );

    const psnData: PSNResponse = {
      recentlyPlayedGames: recentlyPlayedGames.games
        .filter(g => g.platform !== 'UNKNOWN')
        .slice(0, 5)
        .map(game => {
          const trophiesForGame = trophies.trophyTitles.find(t => game.name.includes(t.trophyTitleName));
          let progress = 0;
          if (trophiesForGame) {
            const totalTrophies = Object.values(trophiesForGame.definedTrophies).reduce((total, current) => total + current, 0);
            const earnedTrophies = Object.values(trophiesForGame.earnedTrophies).reduce((total, current) => total + current, 0);
            progress = Math.round((earnedTrophies / totalTrophies) * 100);
          }
          return {
            iconUrl: game.image.url,
            platform: game.platform,
            name: game.name,
            progress,
            lastPlayed: new Date(game.lastPlayedDateTime).getTime()
          };
        })
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
