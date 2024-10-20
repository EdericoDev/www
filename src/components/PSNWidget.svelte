<script lang="ts">
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import type { PsnResponse } from "../pages/api/psn.json";
  
    interface LastPlayedGame {
      title: string;
      progress: number;
      iconUrl: string;
    }
  
    interface PsnResponse {
      accountId: string;
      username: string;
      avatarUrl: string;
      trophies: {
        platinum: number;
        gold: number;
        silver: number;
        bronze: number;
      };
      lastPlayedGame: LastPlayedGame | null;
    }
  
    let psnData: PsnResponse | undefined = undefined;
    let isLoading = true;
  
    onMount(async () => {
      try {
        const response = await fetch("/api/psn.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        psnData = await response.json();
      } catch (error) {
        console.error("Error fetching PSN data:", error);
      } finally {
        isLoading = false;
      }
    });
  </script>
  
  <div class="psn-widget">
    <div class="relative w-full not-prose">
      {#if isLoading}
        <div
          transition:fade={{ delay: 0, duration: 250 }}
          class="absolute h-full w-full rounded-lg bg-gray-100 dark:bg-gray-800"
        ></div>
        <div
          transition:fade={{ delay: 0, duration: 250 }}
          class="animate-pulse-fast absolute h-full w-full rounded-lg"
        >
          <div class="h-full w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      {/if}
  
      {#if psnData}
        <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 shadow-md">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 flex-shrink-0">
              <img
                src={psnData.avatarUrl}
                class="w-full h-full object-cover rounded-full"
                alt={psnData.username}
              />
            </div>
            <div class="flex-grow">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {psnData.username}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Trophies: {psnData.trophies.platinum} Platinum, {psnData.trophies.gold} Gold,
                {psnData.trophies.silver} Silver, {psnData.trophies.bronze} Bronze
              </p>
            </div>
          </div>
  
          {#if psnData.lastPlayedGame}
            <div class="mt-4">
              <h4 class="text-md font-semibold text-gray-700 dark:text-gray-300">Last Game Played:</h4>
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 flex-shrink-0">
                  <img
                    src={psnData.lastPlayedGame.iconUrl}
                    class="w-full h-full object-cover rounded-lg"
                    alt={psnData.lastPlayedGame.title}
                  />
                </div>
                <div class="flex-grow">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {psnData.lastPlayedGame.title}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Progress: {psnData.lastPlayedGame.progress}%
                  </p>
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
  