import { createRequire } from "module";
import { getRequestOptions } from "./getRequestOptions.js";
import dotenv from "dotenv";

const require = createRequire(import.meta.url);
const https = require("node:https");

//Env configuration
dotenv.config();

/**
 * It resolves to the response data from the API
 * @param command - CLI executed command
 * @param commandOptions - CLI command options
 * @returns A promise.
 */
export async function moviedbRequest(command, commandOptions) {
  const requestOptions = getRequestOptions(command, commandOptions.id);
  let data = "";

  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      console.log(requestOptions.path);
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const responseData = JSON.parse(data);
        if (responseData.status_code === 34) {
          reject(new Error("The resource you requested could not be found"));
        }
        resolve(responseData);
      });
    });

    req.on("error", (err) => {
      reject(new Error(err.message));
      console.log(err);
    });

    req.end();
  });
}
