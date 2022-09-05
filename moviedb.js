import {Command} from 'commander'
import ora from "ora";
import dotenv from 'dotenv'

import { getPersons } from "./services/get-persons.js";

const program = new (Command);
//Env configuration
dotenv.config();

/**
 * HELP
 */

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
    const spinner = ora(
      `Fetching the ${chalk.red(`popular person's`)} data...`
    ).start();
    //   const spinner = ora("Loading unicorns").start();
    setTimeout(() => {
      spinner.color = "yellow";
      spinner.text = "Loading rainbows";
      spinner.succeed("Exit");
      //   spinner.stop()
    }, 2000);
    // console.log(options);

    const page = 1;
    const path = `/3/person/popular?page=${page}&api_key=${process.env.API_KEY}`;

    const createRequestOptions = {
      hostname: "api.themoviedb.org",
      port: 443,
      path: path,
      method: "GET",
    };

    getPersons(createRequestOptions, commandOptions);
  });

program.parse(process.argv);
