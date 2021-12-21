module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    'babel-plugin-styled-components',
    ['module:react-native-dotenv', {
      envName: 'APP_ENV',
      moduleName: '@env',
      path: '.env',
      safe: true,
    }],
    'react-native-reanimated/plugin',
  ],
};
