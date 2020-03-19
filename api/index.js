const express = require('express');
const app = express();
const port = 3002;

const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);


app.get('/jobs', async (req, res) => {
  const jobs = await getAsync('github');
  return res.send(JSON.parse(jobs));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
