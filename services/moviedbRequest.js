import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require("node:https");
const dotenv = require("dotenv");
import {
  spinnerHandlerOnSuccess,
  spinnerHandlerOnError,
} from "../utils/spinnersHandler.js";
import { renderPersonDetails } from "../render/renderPersonDetails.js";
import { getRequestOptions } from "./getRequestOptions.js";
import { savePersonFile } from "./fsPersonMethods.js";

//Env configuration
dotenv.config();

export async function moviedbRequest(command, commandOptions) {
  const requestOptions = getRequestOptions(command, commandOptions.id);
  let responseData = "";

  return new Promise(function (resolve, reject) {
    const req = https.request(requestOptions, (res) => {
      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        resolve(responseData)
      });
    });

    req.on("error", (err) => {
      reject("Todo todo ha ido mal")
    });

    req.end();
  });
}
