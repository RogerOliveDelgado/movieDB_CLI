const { Command } = require("commander");
const program = new Command();

program.option("--first").option("-s, --separator <char>");

program.parse();

const options = program.opts();
const limit = options.first ? 1 : undefined;

console.log("----------OPTIONS-------");
console.log(options);
console.log("--------OPTIONS FORMATTED-------");
console.log(program.args[0].split(options.separator, limit));

/**
 * HELP
 */

program
  .name("movieDB CLI")
  .description("CLI to obtain info from movieDB API")
  .version("0.0.1");

program
  .command("get-persons")
  .description("Get persons from movieDB API")
  .option("--popular", "Display the most popular persons");

program.parse();


const { Command } = require("commander");
const program = new Command();
const dotenv = require("dotenv");
const ora = require("ora");

dotenv.config();

//Command settings
program.name("moviedb").description("CLI to MovieDB").version("0.0.1");

//Set help setting
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name(),
});

//Get persons command
program
  .name("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .option("-s, --save", "Store the data in the local file system.")
  .option("-l, --local", "Read the data from the local file system")
  .action(() => {
    console.log("options", program.opts());
  });

program.parse(process.argv);