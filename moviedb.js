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
