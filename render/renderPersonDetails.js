import { chalkSettings } from "../utils/renders/settings.js";

const { white, bold, yellow, blue, magenta, breakLine, tab, blueBold } = chalkSettings;
const log = console.log;

export function renderPersonDetails({id,name}) {
  log(white(`----------------------------------------`));
  log(white(`Person`));
  log(`${breakLine}`);
  log(white(`Person ID: ${id}`));
  log(white(`Name: ${blue(name)}`));
  known_for_department === "Acting" &&
    log(white(`Department: ${magenta(name)}${breakLine}`));
  log(`${white(`----------------------------------------${breakLine}`)}`);
}
