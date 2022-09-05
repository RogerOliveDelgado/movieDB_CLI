import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require('node:https');
const dotenv = require("dotenv");
//Env configuration
dotenv.config();


export function getPersons(options, commandOptions){

  let responseData = ''
  const {popular, page, save, local} = commandOptions

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
  
    res.on('data', (chunk) => {
      responseData += chunk
    });

    res.on('end', ()=> {
      // save local 
      if(save){
        console.log("Save file")
      }
      else if(local){
        console.log("Get info from file")
      }
      else {
        console.log("Print on the command promt")
      }
      console.log(JSON.parse(responseData))
    })

  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}