const simplegit = require('simple-git/promise');
const path = require('path');
const fs = require('fs');

const log = require('loglevelnext');
const main = require('./benchmark').main;

const olGit = simplegit(path.join(__dirname, 'openlayers'));

const logStart = 'v5.3.0';
const logEnd = 'master';

const resultData = {};
const resultFilePath = path.join(__dirname, 'benchmark-data.json');

const benchmarkDirs = fs.readdirSync(path.join(__dirname, 'benchmarks'));
const benchmarkEntries = [];
benchmarkDirs.forEach(c => {
  benchmarkEntries.push(`./benchmarks/${c}/main.js`);
});

const benchmarkOptions = {
  host: '127.0.0.1',
  port: 3000,
  iterations: 10,
  timeout: '60000',
  log: log.create({name: 'benchmarking', level: 'error'})
};

olGit.log({
  from: logStart,
  to: logEnd,
  '--merges': true,
  '--reverse': true
})
  .then(async log => {
    log.all.reduce((prev, curr) => {
      resultData[curr.hash] = { ...curr };
      return resultData;
    }, resultData);

    for (let hash in resultData) {
      console.log(`Running benchmarks for commit ${hash}...`);
      await olGit.reset([hash, '--hard']).then(async () => {
        resultData[hash].benchmarks = await main(benchmarkEntries, benchmarkOptions);
      }, console.error);
    }

    // write results to disk
    fs.writeFile(resultFilePath, JSON.stringify(resultData, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }, console.error);