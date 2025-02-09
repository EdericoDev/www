<script lang="ts">
  import { fade } from "svelte/transition";
  import type { SpotifyResponse } from "../pages/api/spotify.json";
  import { onMount, onDestroy } from "svelte";
  
  let data: SpotifyResponse | undefined = undefined;
  let isLoading = true;
  let interval: ReturnType<typeof setInterval>;

  async function fetchSpotifyData() {
    try {
      const rawResponse = await fetch("/api/spotify.json");
      if (!rawResponse.ok) {
        throw new Error(`HTTP error! status: ${rawResponse.status}`);
      }
      data = await rawResponse.json();
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchSpotifyData();
    interval = setInterval(fetchSpotifyData, 5000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="spotify-widget">
  <div class="relative w-full not-prose">
    {#if isLoading}
      <div
        transition:fade={{ delay: 0, duration: 250 }}
        class="absolute h-full w-full rounded-lg bg-zinc-50 dark:bg-zinc-800"
      ></div>
      <div
        transition:fade={{ delay: 0, duration: 250 }}
        class="animate-pulse-fast absolute h-full w-full rounded-lg"
      >
        <!-- svelte-ignore element_invalid_self_closing_tag -->
        <div class="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-700" />
      </div>
    {/if}
    {#if data}
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 shadow-md">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 flex-shrink-0">
            <img
              src={data.thumbnailUrl || '/path/to/default/album-cover.jpg'}
              class="w-full h-full object-cover rounded-md"
              alt={data.name || "Album cover"}
              on:load={() => (isLoading = false)}
            />
          </div>
          <div class="flex-grow">
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              {#if data.href}
                <a href={data.href} target="_blank" rel="noopener noreferrer" class="hover:underline">
                  {data.name || "Not playing"}
                </a>
              {:else}
                {data.name || "Not playing"}
              {/if}
            </h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              {#if data.artists && data.artists.length > 0}
                <a href={data.artists[0].href} target="_blank" rel="noopener noreferrer" class="hover:underline">
                  {data.artists[0].name}
                </a>
              {:else}
                No artist
              {/if}
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
              {data.isListening ? "Currently playing" : "Last played"}
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .spotify-widget {
    max-width: 400px;
    margin: 2rem auto;
  }
  .animate-pulse-fast {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
