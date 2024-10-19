import type { APIRoute } from "astro";
import * as psn from 'psn-api';
import { getValidAccessToken } from './psnauth';

export type PSNResponse = {
  profile: {
    onlineId: string;
    avatarUrl: string;
  };
  trophies: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  lastPlayedGame: {
    name: string;
    imageUrl: string;
  } | null;
  recentlyPlayedGames: {
    iconUrl: string;
    platform: string;
    name: string;
    progress: number;
    lastPlayed: number;
  }[];
};

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const accessToken = await getValidAccessToken();

    const { profile } = await psn.getProfileFromUserName({ accessToken }, 'me');
    const trophySummary = await psn.getUserTrophyProfileSummary({ accessToken }, profile.accountId);
    const { data } = await psn.getRecentlyPlayedGames({ accessToken });

    const psnData: PSNResponse = {
      profile: {
        onlineId: profile.onlineId,
        avatarUrl: profile.avatarUrls[0].avatarUrl,
      },
      trophies: {
        platinum: trophySummary.earnedTrophies.platinum,
        gold: trophySummary.earnedTrophies.gold,
        silver: trophySummary.earnedTrophies.silver,
        bronze: trophySummary.earnedTrophies.bronze,
      },
      lastPlayedGame: data.gameLibraryTitlesRetrieve.games[0] ? {
        name: data.gameLibraryTitlesRetrieve.games[0].name,
        imageUrl: data.gameLibraryTitlesRetrieve.games[0].image.url,
      } : null,
      recentlyPlayedGames: data.gameLibraryTitlesRetrieve.games
        .map(game => ({
          iconUrl: game.image.url,
          platform: game.platform,
          name: game.name,
          progress: 0, 
          lastPlayed: new Date(game.lastPlayedDateTime).getTime()
        }))
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
