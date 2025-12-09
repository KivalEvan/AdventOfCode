import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, isTest: boolean, p2: boolean): string {
   let total = 0;
   const len = input.indexOf("\n");
   const buffer = new Array(len).fill(0);
   buffer[input.indexOf("S")] = 1;
   for (let i = 0; i < input.length; i++) {
      const x = i % (len + 1);
      if (input[i] != "^") continue;
      if (buffer[x] > 0) total++;
      buffer[x - 1] += buffer[x];
      buffer[x + 1] += buffer[x];
      buffer[x] = 0;
   }

   return p2 ? buffer.reduce((a, b) => a + b, 0).toString() : total.toString();
}

function part1(input: string, isTest: boolean): string {
   return solve(input, isTest, false);
}

function part2(input: string, isTest: boolean): string {
   return solve(input, isTest, true);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
