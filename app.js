'use strict';

const express = require('express');
const redis = require('redis');
const tokenKey = 'tokenABC';
const PORT = 4040;
const HOST = '0.0.0.0';
const app = express();

const cacheClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

app.get('/token', (req, res) => {
  cacheClient.get(tokenKey, (err, data) => {
    if (err) console.error(err);
    else res.send(`Are you ${data ? data : 'nobody'}?`);
  });
});

app.get('/token/:token', async (req, res) => {
  const token = req.params.token;

  await cacheClient.set(tokenKey, token);
  res.send(`Welcome ${token}`);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
