var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  let resultCount = 1;
  let onPage = 1;
  const allJobs = [];

  console.log("*** START fetch-github: ", (new Date()).toString());

  // fetch all pages
  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('fetch-github: got', resultCount, 'jobs');
    onPage++;
  }

  console.log('fetch-github: got', allJobs.length, 'jobs total');

  // set in redis
  const success = await setAsync('github', JSON.stringify(allJobs));
  console.log({success});
  client.quit();

  console.log("*** STOP fetch-github: ", (new Date()).toString());
}

module.exports = fetchGithub;
