import fs from "fs";
import path from "path";
import {
  spinnerHandlerOnSuccess,
  spinnerHandlerOnError,
} from "../utils/spinnersHandler.js";

export const savePersonFile = (filename, data, spinner) => {
  const BASENAME = path.resolve("files");
  const FILE_PATH = path.join(BASENAME, "hhdhd",filename);

  fs.writeFile(
    FILE_PATH,
    JSON.stringify(data, null, 4),
    "utf-8",
    (writeErr) => {
      if (writeErr) {
        spinnerHandlerOnError(spinner, writeErr.message);
        return;
      }
      spinnerHandlerOnSuccess(
        spinner,
        "File was successfully stored in the local system."
      );
    }
  );
};
