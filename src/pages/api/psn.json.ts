import env from "env-var";
import * as psn from 'psn-api';

export async function getPsnGameData(): Promise<{
  avatarUrl: string;
  username: string;
  trophiesByType: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  lastPlayedGame: {
    title: string;
    iconUrl: string;
    progress: number;
  } | null;
}> {
  const PSN_NPSSO_TOKEN = env.get('PSN_NPSSO_TOKEN').required().asString();

  const accessCode = await psn.exchangeNpssoForCode(PSN_NPSSO_TOKEN);
  const authorization = await psn.exchangeCodeForAccessToken(accessCode);

  const { data: { gameLibraryTitlesRetrieve: recentlyPlayedGames } } = await psn.getRecentlyPlayedGames(
    { accessToken: authorization.accessToken }
  );

  const trophies = await psn.getUserTitles(
    { accessToken: authorization.accessToken },
    'me'
  );

  const username = 'me'; 
  const avatarUrl = "public./img/temp.gif"; 

  const trophiesByType = {
    bronze: 0,
    silver: 0,
    gold: 0,
    platinum: 0,
  };

  trophies.trophyTitles.forEach(title => {
    trophiesByType.bronze += title.earnedTrophies.bronze || 0;
    trophiesByType.silver += title.earnedTrophies.silver || 0;
    trophiesByType.gold += title.earnedTrophies.gold || 0;
    trophiesByType.platinum += title.earnedTrophies.platinum || 0;
  });

  let lastPlayedGame: { title: string; iconUrl: string; progress: number; } | null = null;

  if (recentlyPlayedGames.games.length > 0) {
    const lastGame = recentlyPlayedGames.games[0]; // Prende il primo gioco della lista
    const trophiesForGame = trophies.trophyTitles.find(t => lastGame.name.includes(t.trophyTitleName));
    
    let progress = 0;
    if (trophiesForGame) {
      const totalTrophies = Object.values(trophiesForGame.definedTrophies).reduce((total, current) => total + current, 0);
      const earnedTrophies = Object.values(trophiesForGame.earnedTrophies).reduce((total, current) => total + current, 0);
      progress = Math.round((earnedTrophies / totalTrophies) * 100);
    }

    lastPlayedGame = {
      title: lastGame.name,
      iconUrl: lastGame.image.url,
      progress,
    };
  }

  return {
    avatarUrl,
    username,
    trophiesByType,
    lastPlayedGame,
  };
}
