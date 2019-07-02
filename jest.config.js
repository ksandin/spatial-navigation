const path = require('path');

const binaries = '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)$';
const audio = '\\.(mp4|webm|wav|ogg|mp3|m4a|aac|oga)$';

// Note that this configuration is reused in all packages so
// <rootDir> will be relative to each package, not the monorepo root.
module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.test.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    [audio]: path.resolve(__dirname, 'jest-mocks/emptyAudio.js'),
    [binaries]: path.resolve(__dirname, 'jest-mocks/empty.js'),
    '\\.css$': path.resolve(__dirname, 'jest-mocks/empty.js'),
    '\\.svg$': path.resolve(__dirname, 'jest-mocks/svg.js')
  }
};
