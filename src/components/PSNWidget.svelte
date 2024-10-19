<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let data = null;
  let isLoading = true;

  onMount(async () => {
    try {
      const rawResponse = await fetch("/api/psn-trophies");
      if (!rawResponse.ok) throw new Error(`HTTP error! status: ${rawResponse.status}`);

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
      <div transition:fade={{ delay: 0, duration: 250 }} class="animate-pulse-fast"></div>
    {/if}
    {#if data}
      <div class="rounded-lg border p-4 shadow-md mb-4 bg-white dark:bg-zinc-900">
        <div class="flex items-center space-x-4">
          <img src={data.profile.avatarUrl} class="w-16 h-16 rounded-full" alt={data.profile.onlineId} />
          <div>
            <h3 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{data.profile.onlineId}</h3>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">Total Trophies:</p>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              🏆 {data.trophies.platinum} | 🥇 {data.trophies.gold} | 🥈 {data.trophies.silver} | 🥉 {data.trophies.bronze}
            </p>
          </div>
        </div>

        {#if data.lastPlayedGame}
          <div class="mt-4">
            <h4 class="text-md font-semibold text-zinc-700 dark:text-zinc-300">Last Played Game:</h4>
            <div class="flex items-center space-x-2">
              <img src={data.lastPlayedGame.imageUrl} class="w-12 h-12 object-cover rounded" alt={data.lastPlayedGame.name} />
              <div>
                <p class="text-sm text-zinc-800 dark:text-zinc-200">{data.lastPlayedGame.name}</p>
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
</style>
