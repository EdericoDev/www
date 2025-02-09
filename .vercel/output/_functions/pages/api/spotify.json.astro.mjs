import { z } from 'zod';
import querystring from 'node:querystring';
import { VercelKV } from '@vercel/kv';
export { r as renderers } from '../../chunks/_@astro-renderers_B2oNcLm2.mjs';

const redis = new VercelKV({
  url: undefined                               ,
  token: undefined                                 
});
const clientId = undefined                                 ;
const clientSecret = undefined                                     ;
const refreshToken = undefined                                     ;
const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
const getAccessToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  });
  return response.json();
};
const getLastSong = async () => {
  const lastSpotifySong = await redis.get("last-spotify-song").catch((err) => {
    console.error(err);
  });
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
const getSpotifyStatus = async () => {
  let errored = false;
  const { access_token: accessToken } = await getAccessToken().catch(() => errored = true);
  if (errored) {
    return getLastSong();
  }
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!response.ok || response.status == 204) {
    return getLastSong();
  }
  const data = await response.json();
  const spotifySchema = z.object({
    item: z.object({
      album: z.object({
        images: z.object({ url: z.string() }).array()
      }),
      name: z.string(),
      external_urls: z.object({ spotify: z.string() }),
      artists: z.object({
        name: z.string(),
        external_urls: z.object({ spotify: z.string() })
      }).array()
    }),
    currently_playing_type: z.literal("track"),
    is_playing: z.boolean()
  });
  const dataValidation = spotifySchema.safeParse(data);
  if (!dataValidation.success) {
    return getLastSong();
  }
  const { data: parsedData } = dataValidation;
  const spotifyStatus = {
    isListening: true,
    href: parsedData.item.external_urls.spotify,
    name: parsedData.item.name,
    thumbnailUrl: parsedData.item.album.images[1].url,
    artists: parsedData.item.artists.map((artist) => ({
      name: artist.name,
      href: artist.external_urls.spotify
    }))
  };
  await redis.set("last-spotify-song", spotifyStatus).catch((err) => {
    console.error(err);
  });
  return spotifyStatus;
};
const GET = async ({ params, request }) => {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
