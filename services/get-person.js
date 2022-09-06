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

export function getPerson(path, commandOptions, spinner) {
  const requestOptions = getRequestOptions('singlePerson', commandOptions.id);
  let responseData = "";
  const { popular, page, save, local } = commandOptions;

  const req = https.request(requestOptions, (res) => {
    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      // save local
      if (save) {
        savePersonFile_id(
          `/persons/SinglePersons/SinglePerson-id=${page}.json`,
          JSON.parse(responseData), spinner
        );
      } else if (local) {
        console.log("Get info from file");
      } else {
        const popularPersonData = JSON.parse(responseData);
        console.log(popularPersonData)
        renderPersonDetails(popularPersonData);
        // spinnerHandlerOnSuccess(spinner, "Person data loaded");
      }
    });
  });

  req.on("error", (err) => {
    console.error(err);
    spinnerHandlerOnError(spinner, err.message);
  });

  req.end();
}
