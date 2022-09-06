import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require("node:https");
const dotenv = require("dotenv");
import {
  spinnerHandlerOnSuccess,
  spinnerHandlerOnError,
} from "../utils/spinnersHandler.js";
import { render } from "../render/renderPopularPersons.js";

//Env configuration
dotenv.config();

export function getPersons(options, commandOptions, spinner) {
  let responseData = "";
  const { popular, page, save, local } = commandOptions;

  const req = https.request(options, (res) => {
    console.log("statusCode:", res.statusCode);
    // console.log('headers:', res.headers);

    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      // save local
      if (save) {
        console.log("Save file");
      } else if (local) {
        console.log("Get info from file");
      } else {
        console.log("Print on the command promt");
      }
      const popularPersonData = JSON.parse(responseData);
      render(popularPersonData);
      spinnerHandlerOnSuccess(spinner, "Popular Persons data loaded");
    });
  });

  req.on("error", (err) => {
    console.error(err);
    spinnerHandlerOnError(spinner, err.message);
  });

  req.end();
}
