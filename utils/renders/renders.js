import { chalkSettings } from "./settings.js";

//Main settings
const { white, bold, yellow, blue, magenta, breakLine, tab } = chalkSettings;
const log = console.log;

/**
 * It takes two arguments, a page number and a total number of pages, and renders a page number and
 * total number of pages to the console.
 * @param page - The current page number
 * @param total_pages - The total number of pages in the search results.
 */
export function renderPages(page, total_pages) {
  log(
    white(`----------------------------------------
          ${breakLine}
          Page: ${page} of ${total_pages}
          ${breakLine}`)
  );
}

/**
 * It renders the data of a person
 */
export function renderPersonsData({ page, results, total_pages }) {
  results.map(({ id, name, known_for_department, known_for }) => {
    log(
      white(`
              ----------------------------------------
              ${breakLine}
              Person:
              ${breakLine}
              ID: ${id}
              Title: ${bold(blue(name))}
              ${
                known_for_department === "Acting" &&
                `Department: ${magenta(name)}`
              }`)
    );

    //Check if character appears in any movie
    const appearInMovie = known_for.some((movie) => {
      return movie.title !== undefined;
    });

    //render if appears in movies
    if (appearInMovie) {
      known_for.map(({ id, title, release_date }) => {
        log(white(`Appearing in movies:${breakLine}`));
        if (title) {
          log(
            white(`
                  ${tab}Movie: 
                  ${tab}ID: ${id}
                  ${tab}Release Date: ${release_date}
                  ${tab}Title: ${title}
                  ${breakLine}
                `)
          );
        }
      });
    } else {
      log(`${yellow(`${name} doesn't appear in any movie`)}`);
    }
  });

  if (total_pages > page) {
    renderPages(page, total_pages);
  }
}

/**
 * It renders the movie data to the console
 */
export function renderMoviesData({ page, results, total_pages }) {
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
    renderPages(page, total_pages);
  }
}
