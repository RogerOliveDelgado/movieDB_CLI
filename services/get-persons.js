import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require('node:https');
const dotenv = require("dotenv");
//Env configuration
dotenv.config();

const page  = 1
const path = `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`

const options = {
  hostname: 'api.themoviedb.org',
  port: 443,
  path: path,
  method: 'GET',
};

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();