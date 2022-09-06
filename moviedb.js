import { Command } from "commander";
import dotenv from "dotenv";
import { getPersons } from "./services/get-persons.js";
import { createSpinner } from "./utils/spinnersHandler.js";
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const notifier = require('node-notifier')

// String
notifier.notify('Message');

// Object
notifier.notify({
  title: 'My notification',
  message: 'Hello, there!'
});

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
    console.log(commandOptions)
    const spinner = createSpinner(
      "Fetching the popular person's data..."
    );

    const path = `/3/person/popular?page=${commandOptions.page}`;

    setTimeout(() => {
      getPersons(path, commandOptions, spinner);
      spinner.stop();
    }, 2000);
  });

program.parse(process.argv);
