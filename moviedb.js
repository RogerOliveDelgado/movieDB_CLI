import { Command } from "commander";
import dotenv from "dotenv";
import { getPersons } from "./services/get-persons.js";
import { getMovies } from "./services/get-movies.js";
import { createSpinner } from "./utils/spinnersHandler.js";
import { readMoviesFile, readPersonFile } from "./services/fsPersonMethods.js";

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
      spinner.stop();
    }, 2000);
  });

program.parse(process.argv);
