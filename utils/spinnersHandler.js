import ora from "ora";

/**
 * It takes in a color, a type, and a message, and returns a spinner with those properties.
 * @param spinnerColor - The color of the spinner.
 * @param spinnerType - The type of spinner you want to use.
 * @param spinnerMessage - The spinner message.
 * @returns A function that returns an object.
 */
export const createSpinner = (
  spinnerColor,
  spinnerType = "dots",
  spinnerMessage
) => {
  return ora({
    color: spinnerColor,
    spinner: spinnerType,
    text: spinnerMessage,
  }).start();
};

/**
 * Set spinner to fail
 * @param spinner - The spinner object
 */
export const spinnerHandlerOnError = (spinner, message) => {
  return spinner.fail(message);
};

/**
 * Set spinner to success
 * @param spinner - The spinner object
 */
export const spinnerHandlerOnSuccess = (spinner, message) => {
  return spinner.succeed(message);
};
