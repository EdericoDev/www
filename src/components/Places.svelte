<script lang="ts">
    type Place = { name: string; url: string };
    let places: Place[] = [
      { name: "Linux Day 2023/2024", url: "https://www.linuxday.it/2024/" },
    ];
  </script>
  
  <div class="places-widget">
    <div class="relative w-full not-prose">
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 shadow-md">
        <ul class="space-y-3">
          {#each places as { name, url }}
            <li class="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">
              <span class="text-lg mr-3">📍</span>
              <a href={url} target="_blank" rel="noopener noreferrer" class="text-blue-600 font-medium hover:underline">
                {name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
  
  <style>
    .places-widget {
      max-width: 400px;
      margin: 2rem auto;
    }
  </style>
  