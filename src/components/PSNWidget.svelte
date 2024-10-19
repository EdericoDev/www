<script lang="ts">
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    
    interface PSNData {
      trophyCounts: {
        bronze: number;
        silver: number;
        gold: number;
        platinum: number;
      };
      lastPlayed: {
        name: string;
        iconUrl: string;
        completionPercentage: number;
      };
      username: string;
    }
    
    let data: PSNData | undefined = undefined;
    let isLoading = true;
    
    const bannerUrl = "/public/img/cyberpunkgif.gif";
    const profilePictureUrl = "/public/img/reddeadpfp.png";
    
    onMount(async () => {
      try {
        const rawResponse = await fetch("/api/psn.json");
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
            <div class="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-700" />
          </div>
        {/if}
        {#if data}
          <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md overflow-hidden">
            <div class="h-32 bg-cover bg-center" style="background-image: url({bannerUrl});"></div>
            <div class="p-4">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-20 h-20 flex-shrink-0">
                  <img
                    src={profilePictureUrl}
                    class="w-full h-full object-cover rounded-full"
                    alt={data.username}
                  />
                </div>
                <div class="flex-grow">
                  <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                    {data.username}
                  </h3>
                  <div class="flex space-x-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span>🏆 {data.trophyCounts.platinum}</span>
                    <span>🥇 {data.trophyCounts.gold}</span>
                    <span>🥈 {data.trophyCounts.silver}</span>
                    <span>🥉 {data.trophyCounts.bronze}</span>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <h4 class="text-md font-semibold text-zinc-700 dark:text-zinc-300">Last Played:</h4>
                <div class="flex items-center space-x-2 mt-2">
                  <img src={data.lastPlayed.iconUrl} alt={data.lastPlayed.name} class="w-12 h-12 rounded" />
                  <div>
                    <p class="text-sm text-zinc-800 dark:text-zinc-200">{data.lastPlayed.name}</p>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400">
                      Completion: {data.lastPlayed.completionPercentage.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
    