import chalk from "chalk";
import { PopularPersonsResponse, KnownFor } from "../interfaces/PopularPersons";
import { Person } from "../interfaces/PopularPersons";

const lineBreak = "\n";
const tab = "\t";
const separator = '-----------------'

export function render({ page, results, total_pages }: PopularPersonsResponse) {
  let formattedPersons = "";
  results.map(
    ({
      adult,
      gender,
      id,
      name,
      known_for_department,
      known_for,
    }: Person): void => {
      const PERSON = `${chalk.white(`Person${lineBreak}`)}`;
      const ID = `${chalk.white(`ID: ${id}`)}${lineBreak}`;
      const NAME = `${chalk.white(`Name`)}${chalk.blue.bold(
        `${name}`
      )}${lineBreak}`;
      const DEPARTMENT =
        known_for_department === "Acting"
          ? `Department: ${chalk.magenta("Acting")}`
          : "";

      const hasMovie = known_for.find(
        (movie: KnownFor) => movie.original_title !== undefined
      );
      const MOVIES = hasMovie
        ? `${chalk.white(`${tab}Movie:${tab}ID: ${hasMovie}`)}`
        : ``;
        formattedPersons += PERSON + ID + NAME + DEPARTMENT
    }

    console.log(formattedPersons)
  );
}
