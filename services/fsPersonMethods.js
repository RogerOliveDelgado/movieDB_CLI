import fs from "fs";
import path from "path";
import {
  spinnerHandlerOnSuccess,
  spinnerHandlerOnError,
} from "../utils/spinnersHandler.js";

import { createRequire } from "node:module";
import {render} from '../render/renderPopularPersons.js'

const require = createRequire(import.meta.url);

const notifier = require("node-notifier");

// Object

export const savePersonFile = (filename, data, spinner) => {
  const BASENAME = path.resolve("files");
  const FILE_PATH = path.join(BASENAME, filename);

  fs.writeFile(
    FILE_PATH,
    JSON.stringify(data, null, 4),
    "utf-8",
    (readErr) => {
      if (readErr) {
        spinnerHandlerOnError(spinner, readErr.message);
        notifier.notify({
          title: "Error",
          message: `${readErr.message}`,
        });
        return;
      }
      spinnerHandlerOnSuccess(
        spinner,
        "File was successfully stored in the local system."
      );
      notifier.notify({
        title: "Succeess",
        message: "File was successfully stored in the local system.",
      });
    }
  );
};

export const readPersonFile = (filename, spinner) => {
  const BASENAME = path.resolve("files");
  const FILE_PATH = path.join(BASENAME, filename);
  console.log(FILE_PATH)

  fs.readFile(FILE_PATH, "utf-8",(readErr, data) => {
    if (readErr) {
      spinnerHandlerOnError(spinner, readErr.message);
      notifier.notify({
        title: "Error",
        message: `${readErr.message}`,
      });
      return;
    }
    render(JSON.parse(data))
    spinnerHandlerOnSuccess(
      spinner,
      "File was successfully stored in the local system."
    );
    notifier.notify({
      title: "Succeess",
      message: "File was successfully stored in the local system.",
    });
  })
}

export const savePersonFile_id = (filename, data, spinner) => {
  const BASENAME = path.resolve("files");
  const FILE_PATH = path.join(BASENAME, filename);

  fs.writeFile(
    FILE_PATH,
    JSON.stringify(data, null, 4),
    "utf-8",
    (readErr) => {
      if (readErr) {
        spinnerHandlerOnError(spinner, readErr.message);
        notifier.notify({
          title: "Error",
          message: `${readErr.message}`,
        });
        return;
      }
      spinnerHandlerOnSuccess(
        spinner,
        "File was successfully stored in the local system."
      );
      notifier.notify({
        title: "Succeess",
        message: "File was successfully stored in the local system.",
      });
    }
  );
};


export const readPersonFile_id = (filename, spinner) => {
  const BASENAME = path.resolve("files");
  const FILE_PATH = path.join(BASENAME, filename);
  console.log(FILE_PATH)

  fs.readFile(FILE_PATH, "utf-8",(readErr, data) => {
    if (readErr) {
      spinnerHandlerOnError(spinner, readErr.message);
      notifier.notify({
        title: "Error",
        message: `${readErr.message}`,
      });
      return;
    }
    render(JSON.parse(data))
    spinnerHandlerOnSuccess(
      spinner,
      "File was successfully stored in the local system."
    );
    notifier.notify({
      title: "Succeess",
      message: "File was successfully stored in the local system.",
    });
  })
}