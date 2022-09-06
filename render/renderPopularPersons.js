import { chalkSettings } from "./settings.js";

const { white, bold, yellow, blue, magenta, breakLine, tab } = chalkSettings;
const log = console.log;

export function render({ page, results, total_pages }) {
  results.forEach(({ id, name, known_for_department, known_for }) => {
    log(white(`----------------------------------------`));
    log(white(`Person`));
    log(`${breakLine}`);
    log(white(`Person ID: ${id}`));
    log(white(`Name: ${bold(blue(name))}`));
    known_for_department === "Acting" &&
      log(white(`Department: ${magenta(name)}${breakLine}`));

    //Check if character appears in any movie
    const appearInMovieWithTitle = known_for.some((movie) => {
      return movie.title !== undefined;
    });

    if (appearInMovieWithTitle) {
      log(white(`Appearing in movies:`));
      log(`${breakLine}`);
      known_for.forEach(({ id, title, release_date }) => {
        //Check if title is not empty
        if (title) {
          log(`${tab}${white("Movie")}`);
          log(`${tab}ID: ${white(id)}`);
          log(`${tab}Release Date: ${white(release_date)}`);
          log(`${tab}Title: ${white(title)}`);
          log(`${breakLine}`);
        }
      });
    } else {
      log(`${breakLine}`);
      log(`${yellow(`${name} doesn't appear in any movie`)}`);
      log(`${breakLine}`);
    }
  });

  if (total_pages > page) {
    log(
      `${white(
        `----------------------------------------\n\nPage: ${page} of ${total_pages}${breakLine}`
      )}`
    );
  }
}
