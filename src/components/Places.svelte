<script>
    const places = [
      { name: "Linux days 23/24 editions", url: "https://www.linuxday.it/2024/" },
    ];
  </script>
  
  <div class="prose mx-auto p-6 rounded-lg bg-orange-100 shadow-lg">
    <ul class="space-y-2">
      {#each places as { name, url }}
        <li class="flex items-center p-3 bg-orange-50 rounded-lg hover:scale-105 transition-transform">
          <span class="text-lg mr-3">📍</span>
          <a href={url} target="_blank" rel="noopener noreferrer" class="text-orange-700 font-semibold hover:text-orange-500 transition-colors">
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  