import { createRequire } from "module";
const require = createRequire(import.meta.url);
const https = require("node:https");
const dotenv = require("dotenv");
import {
  spinnerHandlerOnSuccess,
  spinnerHandlerOnError,
} from "../utils/spinners/spinnersHandler.js";
import { renderMovies } from "../render/renderPopularMovies.js";
import { getRequestOptions } from "./getRequestOptions.js";
import { savePersonFile } from "./fsPersonMethods.js";

//Env configuration
dotenv.config();

export function getMovies(path, commandOptions, spinner) {
  const requestOptions = getRequestOptions(path);
  let responseData = "";
  const { save, page, nowPlaying } = commandOptions;

  const req = https.request(requestOptions, (res) => {
    res.on("data", (chunk) => {
      responseData += chunk;
    });

    res.on("end", () => {
      // save local
      if (save) {
        if (nowPlaying) {
          //es la misma en todo
          savePersonFile(
            `/movies/PopularMovies/now-playing-movies-page${page}.json`,
            JSON.parse(responseData),
            spinner
          );
        } else {
          //es la misma en todo
          savePersonFile(
            `/movies/PopularMovies/popular-movies-page${page}.json`,
            JSON.parse(responseData),
            spinner
          );
        }
      } else {
        const popularMovieData = JSON.parse(responseData);
        renderMovies(popularMovieData);
        spinnerHandlerOnSuccess(spinner, "Popular Movies data loaded");
      }
    });
  });

  req.on("error", (err) => {
    console.error(err);
    spinnerHandlerOnError(spinner, err.message);
  });

  req.end();
}
