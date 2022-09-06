import { Command } from "commander";
import dotenv from "dotenv";
import {
  createSpinner,
  spinnerHandlerOnError,
  spinnerHandlerOnSuccess,
} from "./utils/spinners/spinnersHandler.js";
import {
  readMoviesFile,
  readPersonFile,
  saveRequestData,
} from "./services/fsPersonMethods.js";
import {
  renderPersonsData,
  renderPersonData,
  renderMoviesData,
  renderMovieData,
} from "./utils/renders/renders.js";
import { moviedbRequest } from "./services/moviedbRequest.js";

const program = new Command();
//Env configuration
dotenv.config();

// Settings
program
  .name("movieDB CLI")
  .description("CLI to obtain information from movieDB API")
  .version("0.0.1");

//Set help setting
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name(),
});

//Get persons command
program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .option("-s, --save", "Store the data in the local file system.")
  .option("-l, --local", "Read the data from the local file system")
  .action((commandOptions) => {
    const spinner = createSpinner("Fetching the popular person's data...");

    const path = `/3/person/popular?page=${commandOptions.page}`;

    setTimeout(() => {
      if (commandOptions.local) {
        readPersonFile(
          `Persons/PopularPersons/popularPersons-page${commandOptions.page}.json`,
          spinner
        );
      }
      getPersons(path, commandOptions, spinner);
      spinner.stop();
    }, 2000);
  });

//Get movies command
program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --nowPlaying", "Fetch the movies that are playing now")
  .option("-s, --save", "Store the data in the local file system.")
  .option("-l, --local", "Read the data from the local file system")
  .action((commandOptions) => {
    const spinner = createSpinner("Fetching the movie's data...");

    let path = `/3/movie/`;

    if (commandOptions.nowPlaying) {
      path += "now_playing";
    } else {
      path += "popular";
    }

    path += `?page=${commandOptions.page}`;

    setTimeout(() => {
      if (commandOptions.local) {
        if (commandOptions.nowPlaying) {
          readMoviesFile(
            `movies/PopularMovies/now-playing-movies-page${commandOptions.page}.json`,
            spinner
          );
        } else {
          readMoviesFile(
            `movies/PopularMovies/popular-movies-page${commandOptions.page}.json`,
            spinner
          );
        }
      } else {
        getMovies(path, commandOptions, spinner);
      }
    });
  });

program
  .command("get-person")
  .description("Make a network to fetch the data of a single person")
  .requiredOption("-i, --id <number>", "Fetch the person with ID")
  .option("-s, --save", "Store the data in the local file system.")
  .option("-l, --local", "Read the data from the local file system")
  .action((options) => {
    const { id, save, local } = options;
    const spinner = createSpinner(
      `Fetching the person's data with id=${id} ...`
    );

    setTimeout(async () => {
      if (local) {
        spinner.stop();
        return;
      }

      try {
        const response = await moviedbRequest("singlePerson", options);
        if (save) {
          try {
            await saveRequestData(
              "singlePerson",
              `/person-${id}.json`,
              response
            );
            spinnerHandlerOnSuccess(spinner, "Person data stored");
          } catch (error) {
            spinnerHandlerOnError(spinner, error.message);
          }
          spinner.stop();
          return;
        }
        renderPersonData(reqResponse);
        spinnerHandlerOnSuccess(spinner, "Person data loaded");
      } catch (error) {
        spinnerHandlerOnError(spinner, error.message);
      }

      spinner.stop();
    }, 2000);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single movie")
  .requiredOption("-i, --id <number>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .option("-s, --save", "Store the data in the local file system.")
  .option("-l, --local", "Read the data from the local file system")
  .action((options) => {
    const { id, reviews, save, local } = options;
    const spinner = createSpinner(
      `Fetching the movies's data with id=${id} ...`
    );

    setTimeout(async () => {
      if (local) {
        spinner.stop();
        return;
      }

      if (reviews) {
        try {
          const response = await moviedbRequest("singleMovieReviews", options);
          if (save) {
            try {
              await saveRequestData(
                "singleMovieReviews",
                `/movieReview-${id}.json`,
                response
              );
              spinnerHandlerOnSuccess(spinner, "Movie reviews data stored");
            } catch (error) {
              spinnerHandlerOnError(spinner, error.message);
            }
            spinner.stop();
            return;
          }
          //render reviews
          spinnerHandlerOnSuccess(spinner, "Movie reviews data loaded");
        } catch (error) {
          spinnerHandlerOnError(spinner, error.message);
        }
        spinner.stop();
        return;
      }

      try {
        const response = await moviedbRequest("singleMovie", options);
        if (save) {
          try {
            await saveRequestData("singleMovie", `/movie-${id}.json`, response);
            spinnerHandlerOnSuccess(spinner, "Movie data stored");
          } catch (error) {
            spinnerHandlerOnError(spinner, error.message);
          }
          spinner.stop();
          return;
        }
        renderMovieData(response);
        spinnerHandlerOnSuccess(spinner, "Movie data loaded");
      } catch (error) {
        spinnerHandlerOnError(spinner, error.message);
      }

      spinner.stop();
    }, 2000);
  });

program.parse(process.argv);
