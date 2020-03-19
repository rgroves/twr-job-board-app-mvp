var fetch = require('node-fetch');

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
  let resultCount = 1;
  let onPage = 1;
  const allJobs = [];

  console.log("*** START fetch-github: ", (new Date()).toString());

  while (resultCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    resultCount = jobs.length;
    console.log('fetch-github: got', resultCount, 'jobs');
    onPage++;
  }

  console.log('fetch-github: got', allJobs.length, 'jobs total');
  console.log("*** STOP fetch-github: ", (new Date()).toString());
}

module.exports = fetchGithub;
