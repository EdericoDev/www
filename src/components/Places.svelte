<script>
    const places = [
      { name: "Linux Day 2023/2024", url: "https://www.linuxday.it/2024/" },
    ];
  </script>
  
  <div class="prose mx-auto p-4 md:p-6 rounded-lg bg-gray-50 shadow-sm transition-all hover:shadow-md duration-200">
    <h2 class="text-gray-800 text-xl font-semibold text-center mb-3">Conventions I’ve Attended 📅</h2>
    <ul class="space-y-3">
      {#each places as { name, url }}
        <li class="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-all">
          <span class="text-lg mr-3">📍</span>
          <a href={url} target="_blank" rel="noopener noreferrer" class="text-blue-600 font-medium hover:underline">
            {name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  