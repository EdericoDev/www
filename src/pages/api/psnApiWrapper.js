// psnApiWrapper.js
const psn = require('psn-api');

module.exports = {
  exchangeNpssoForCode: psn.exchangeNpssoForCode,
  exchangeCodeForAccessToken: psn.exchangeCodeForAccessToken,
  getRecentlyPlayedGames: psn.getRecentlyPlayedGames,
  getUserTitles: psn.getUserTitles,
  getProfileFromUserName: psn.getProfileFromUserName
};
