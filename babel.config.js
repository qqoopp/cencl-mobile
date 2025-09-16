module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@redux': './src/redux',
          '@utils': './src/utils',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
