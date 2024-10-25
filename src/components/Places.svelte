<script lang="ts">
    import { Icon } from "astro-icon/components"; 
  
    type Place = { 
      name: string; 
      url: string; 
      visitDate?: string; 
    };
  
    let places: Place[] = [
      { 
        name: "Linux Day 2023/2024", 
        url: "https://www.linuxday.it/2024/",
      }
    ];
  </script>
  
  <div class="places-widget">
    <div class="relative w-full not-prose">
      <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 shadow-md">
        <ul class="space-y-3">
          {#each places as { name, url, visitDate }}
            <li class="flex items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">
              <Icon name="linuxday" class="h-5 w-5 text-gray-800 dark:text-white" /> 
              <a href={url} target="_blank" rel="noopener noreferrer" class="text-zinc-800 dark:text-zinc-100 font-medium hover:underline flex-grow">
                {name}
              </a>
              {#if visitDate}
                <span class="text-sm text-gray-600 dark:text-gray-300 ml-2 italic">
                  {visitDate} 
                </span>
              {/if}
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
  
  