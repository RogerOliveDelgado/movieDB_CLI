import { Command } from "commander";
import dotenv from "dotenv";
import { getPersons } from "./services/get-persons.js";
import { createSpinner } from "./utils/spinnersHandler.js";

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
    const spinner = createSpinner(
      "yellow",
      "moon",
      "Fetching the popular person's data..."
    );

    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "Loading rainbows";
      spinner.succeed("Exit");
      spinner.stop();
    }, 2000);

    const page = 1;
    const path = `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`;

    const createRequestOptions = {
      hostname: "api.themoviedb.org",
      port: 443,
      path: path,
      method: "GET",
    };

    getPersons(createRequestOptions, commandOptions, spinner);
  });

program.parse(process.argv);
