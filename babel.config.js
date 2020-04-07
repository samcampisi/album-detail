module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          components: './src/components/views',
          screens: './src/components/screens',
          managers: './src/managers',
          utils: './src/utils',
          api: './src/api',
        },
      },
    ],
  ],
};
