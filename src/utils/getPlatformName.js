const platforms = ["Facebook", "WhatsApp", "Instagram", "Twitter", "Telegram", "LinkedIn"];

const getPlatformName = platformId => {
  if (platformId >= 0 && platformId <= platforms.length) return platforms[platformId];
  return "Unknown Platform";
};

export default getPlatformName;
