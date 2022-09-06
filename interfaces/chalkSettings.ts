import { type ChalkInstance } from "chalk";

export interface chalkObject {
  white: ChalkInstance;
  bold: ChalkInstance;
  blue: ChalkInstance;
  yellow: ChalkInstance;
  magenta: ChalkInstance;
  breakLine: String;
  tab: String;
}
