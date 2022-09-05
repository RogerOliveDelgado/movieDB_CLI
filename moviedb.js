import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Command } = require("commander");
const dotenv = require("dotenv");

import ora from 'ora'

const program = new Command();

//Env configuration
dotenv.config();

/**
 * HELP
 */

//Command Settings
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
program.command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .option("-s, --save", "Store the data in the local file system.")
  .option("-l, --local", "Read the data from the local file system")
  .action(() => {
    console.log("options", program.opts(), "these are the options");
  });

program.parse(process.argv);