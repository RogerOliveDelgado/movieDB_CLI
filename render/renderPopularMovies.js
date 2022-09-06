import { chalkSettings } from "./settings.js";

const { white, bold, yellow, blue, magenta, breakLine, tab } = chalkSettings;
const log = console.log;

export function renderMovies({ page, results, total_pages }) {
  results.forEach(({ id, title, release_date }) => {
    log(
      white(`
        ----------------------------------------
        ${breakLine}
        Movie:
        ${breakLine}
        ID: ${id}
        Title: ${bold(blue(title))}
        Release Date: ${release_date}
        `)
    );
  });

  if (total_pages > page) {
    log(
      white(`
      ----------------------------------------
        ${breakLine}
        Page: ${page} of ${total_pages}
        ${breakLine}`
      )
    );
  }
}
