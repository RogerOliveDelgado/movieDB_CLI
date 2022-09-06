import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require("node:https");
const dotenv = require("dotenv");
import {
  spinnerHandlerOnSuccess,
  spinnerHandlerOnError,
} from "../utils/spinners/spinnersHandler.js";
import { renderPersonDetails } from "../render/renderPersonDetails.js";
import { getRequestOptions } from "./getRequestOptions.js";
import { savePersonFile } from "./fsPersonMethods.js";

//Env configuration
dotenv.config();

export async function moviedbRequest(command, commandOptions, spinner) {
  const requestOptions = getRequestOptions("singlePerson", commandOptions.id);
  let responseData = "";

  const req = https.request(requestOptions, (res) => {
    res.on("data", (chunk) => {
      responseData += chunk;
    });

    const response = res.on("end", () => {
      return responseData;
    });

  });

  req.on("error", (err) => {
    return "Todo todo a ido mal";
  });

  req.end();
  console.log(Object.keys(req))
  console.log(req.outputData.callback)
}
