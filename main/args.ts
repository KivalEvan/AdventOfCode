import { argv } from "node:process";
import { parseArgs } from "node:util";

export function fetchArgs() {
   return parseArgs({
      args: argv.slice(2),
      options: {
         day: { type: "string", short: "d" },
         year: { type: "string", short: "y" },
         month: { type: "boolean", short: "m" },
         all: { type: "boolean", short: "a" },
         lang: { type: "string", short: "l" },
         bench: { type: "string", short: "b" },
         debug: { type: "boolean", short: "h" },
      },
   }).values;
}
