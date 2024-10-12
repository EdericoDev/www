<script lang="ts">
    import { fade } from "svelte/transition";
    import type { OsuResponse } from "../pages/api/osu.json";
    import { onMount } from "svelte";
    
    let data: OsuResponse | undefined = undefined;
    let isLoading = true;
    
    onMount(async () => {
      try {
        const rawResponse = await fetch("/api/osu.json");
        if (!rawResponse.ok) {
          throw new Error(`HTTP error! status: ${rawResponse.status}`);
        }
        data = await rawResponse.json();
      } catch (error) {
        console.error("Error fetching osu! data:", error);
      } finally {
        isLoading = false;
      }
    });
    </script>
    
    <div class="osu-widget">
      <div class="relative w-full">
        {#if isLoading}
          <div
            transition:fade={{ delay: 0, duration: 250 }}
            class="absolute h-full w-full rounded-lg bg-zinc-50 dark:bg-zinc-800"
          ></div>
          <div
            transition:fade={{ delay: 0, duration: 250 }}
            class="animate-pulse-fast absolute h-full w-full rounded-lg"
          >
            <div class="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-700" />
          </div>
        {/if}
        {#if data}
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 shadow-md">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 flex-shrink-0">
                <img
                  src={data.avatarUrl}
                  class="w-full h-full object-cover rounded-full"
                  alt={data.username}
                  on:load={() => (isLoading = false)}
                />
              </div>
              <div class="flex-grow">
                <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  <a href={`https://osu.ppy.sh/users/${data.userId}`} target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {data.username}
                  </a>
                </h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">
                  Global Rank: #{data.globalRank} | Country Rank: #{data.countryRank}
                </p>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">
                  PP: {data.pp.toFixed(2)} | Accuracy: {data.accuracy.toFixed(2)}%
                </p>
              </div>
            </div>
            {#if data.lastPlayed}
              <div class="mt-4">
                <h4 class="text-md font-semibold text-zinc-700 dark:text-zinc-300">Last Played:</h4>
                <a href={data.lastPlayed.beatmapUrl} target="_blank" rel="noopener noreferrer" class="text-sm text-blue-500 hover:underline">
                  {data.lastPlayed.beatmapTitle}
                </a>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">
                  Score: {data.lastPlayed.score} | Accuracy: {data.lastPlayed.accuracy.toFixed(2)}% | Rank: {data.lastPlayed.rank}
                </p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    
    <style>
      .osu-widget {
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
    