const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Отримуємо базову конфігурацію
const config = getDefaultConfig(__dirname);

// Додаємо підтримку кириличних символів
config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [...process.env.RN_SRC_EXT.split(',').map(ext => ext.trim()), ...config.resolver.sourceExts]
  : config.resolver.sourceExts;

// Встановлюємо фіксований порт для Metro Bundler
config.server = {
  port: 8083
};

// Додаємо налаштування для вирішення проблеми з .expo/.virtual-metro-entry
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '.expo': __dirname + '/.expo',
};

// Налаштування для NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });
