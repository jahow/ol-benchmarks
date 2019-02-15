const fs = require('fs');
const path = require('path');

const benchmarks = path.join(__dirname, 'benchmarks');
const benchmarkDirs = fs.readdirSync(benchmarks);

const entry = {};
benchmarkDirs.forEach(c => {
  entry[`benchmarks/${c}/main`] = `./benchmarks/${c}/main.js`;
});

module.exports = {
  context: __dirname,
  target: 'web',
  entry: entry,
  devtool: 'source-map'
};