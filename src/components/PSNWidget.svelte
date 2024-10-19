<script lang="ts">
    import { fade } from "svelte/transition";
    import type { PSNResponse } from "../pages/api/psn.json";
    import { onMount } from "svelte";
  
    let data: PSNResponse | undefined = undefined;
    let isLoading = true;
  
    onMount(async () => {
      try {
        const rawResponse = await fetch("/api/psn");
        if (!rawResponse.ok) {
          throw new Error(`HTTP error! status: ${rawResponse.status}`);
        }
        data = await rawResponse.json();
      } catch (error) {
        console.error("Error fetching PSN data:", error);
      } finally {
        isLoading = false;
      }
    });
  </script>
  
  <div class="psn-widget">
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
                alt={data.onlineId}
                on:load={() => (isLoading = false)}
              />
            </div>
            <div class="flex-grow">
              <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                {data.onlineId}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">
                Trophy Level: {data.trophyLevel}
              </p>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">
                Trophies: 🏆 {data.trophies.platinum} | 🥇 {data.trophies.gold} | 🥈 {data.trophies.silver} | 🥉 {data.trophies.bronze}
              </p>
            </div>
          </div>
          {#if data.lastPlayedGame}
            <div class="mt-4">
              <h4 class="text-md font-semibold text-zinc-700 dark:text-zinc-300">Last Played Game:</h4>
              <div class="flex items-center space-x-2">
                <img src={data.lastPlayedGame.imageUrl} alt={data.lastPlayedGame.name} class="w-12 h-12 object-cover rounded" />
                <div>
                  <p class="text-sm text-zinc-800 dark:text-zinc-200">{data.lastPlayedGame.name}</p>
                  <p class="text-xs text-zinc-600 dark:text-zinc-400">Trophy Progress: {data.lastPlayedGame.trophyProgress}%</p>
                </div>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  
  <style>
    .psn-widget {
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
  