const items = require('./src/data/items');
const imageSection = require('./src/data/imageSection');

module.exports = {
  site: {
    title: 'Static Site Generator',
    description: 'Static Site Generator in Node.js',
    basePath: process.env.NODE_ENV === 'production' ? '/fedChallenge' : '',
    items,
    imageSection
  },
  build: {
    outputPath: process.env.NODE_ENV === 'production' ? './docs' : './public'
  }
}
