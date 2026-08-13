const path = require('path');

module.exports = {
  haste: {
    defaultPlatform: 'ios',
    platforms: ['ios', 'native'],
  },
  moduleNameMapper: {
    '\\.(css)$': require.resolve('./jest.styleMock.js'),
    '^react-native/setup-env$': `${path.dirname(
      require.resolve('react-native'),
    )}/src/setup-env.js`,
    '^react-native($|/.*)': `${path.dirname(
      require.resolve('react-native'),
    )}/$1`,
  },
  resolver: require.resolve('@react-native/jest-preset/jest/resolver.js'),
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
      '@react-native/jest-preset/jest/assetFileTransformer.js',
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-css-interop|react-native-safe-area-context|react-native-screens|@react-native-async-storage)/)',
  ],
  setupFiles: [require.resolve('./jest.setup.js')],
  testEnvironment: require.resolve(
    '@react-native/jest-preset/jest/react-native-env.js',
  ),
};
