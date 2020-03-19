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

  // filter algo
  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();

    if (
         jobTitle.includes('senior') ||
         jobTitle.includes('manager') ||
         jobTitle.includes('sr.') ||
         jobTitle.includes('architect')
    ) {
      return false;
    }

    return true;
  });

  console.log('fetch-github: filtered down to', jrJobs.length);

  // set in redis
  const success = await setAsync('github', JSON.stringify(jrJobs));
  console.log({success});
  client.quit();

  console.log("*** STOP fetch-github: ", (new Date()).toString());
}

module.exports = fetchGithub;
