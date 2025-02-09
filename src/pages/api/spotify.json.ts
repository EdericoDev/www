import type { APIRoute } from "astro";
import { z } from "zod";
import querystring from "node:querystring";
import { VercelKV as Redis } from "@vercel/kv";

const redis = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  return response.json();
};

export type SpotifyResponse = 
  | { 
      isListening: true; 
      href: string; 
      name: string; 
      thumbnailUrl: string; 
      artists: { name: string; href: string; }[]; 
    }
  | { 
      isListening: false; 
      href: string | null;
      name: string | null;
      thumbnailUrl: string | null;
      artists: { name: string; href: string; }[] | null;
    };


    const getLastSong = async (): Promise<SpotifyResponse> => {
      const lastSpotifySong = (await redis.get("last-spotify-song").catch((err) => {
        console.error(err);
      })) as SpotifyResponse | null;
      
      if (lastSpotifySong) {
        return {
          ...lastSpotifySong,
          isListening: false
        };
      }
      
      return {
        isListening: false,
        href: null,
        name: null,
        thumbnailUrl: null,
        artists: null
      };
    };    

const getSpotifyStatus = async (): Promise<SpotifyResponse> => {
  let errored = false;
  const { access_token: accessToken } = await getAccessToken().catch(() => (errored = true));
  if (errored) {
    return getLastSong();
  }

  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok || response.status == 204) {
    return getLastSong();
  }

  const data = await response.json();

  const spotifySchema = z.object({
    item: z.object({
      album: z.object({
        images: z
          .object({ url: z.string() })
          .array(),
      }),
      name: z.string(),
      external_urls: z.object({ spotify: z.string() }),
      artists: z
        .object({
          name: z.string(),
          external_urls: z.object({ spotify: z.string() }),
        })
        .array(),
    }),
    currently_playing_type: z.literal("track"),
    is_playing: z.boolean(),
  });

  const dataValidation = spotifySchema.safeParse(data);
  if (!dataValidation.success) {
    return getLastSong();
  }

  const { data: parsedData } = dataValidation;

  const spotifyStatus: SpotifyResponse = {
    isListening: true,
    href: parsedData.item.external_urls.spotify,
    name: parsedData.item.name,
    thumbnailUrl: parsedData.item.album.images[1].url,
    artists: parsedData.item.artists.map((artist) => ({
      name: artist.name,
      href: artist.external_urls.spotify,
    })),
  };

  await redis.set("last-spotify-song", spotifyStatus).catch((err) => {
    console.error(err);
  });

  return spotifyStatus;
};

export const GET: APIRoute = async ({ params, request }) => {
  const spotifyStatus = await getSpotifyStatus();
  
  await redis.set("last-spotify-song", spotifyStatus).catch((err) => {
    console.error(err);
  });

  return new Response(JSON.stringify(spotifyStatus), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  });
};
