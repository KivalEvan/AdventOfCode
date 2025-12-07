import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, isTest: boolean, p2: boolean): string {
   const chunks = input.split("\n\n");
   const ranges = chunks[0].split("\n").map((x) => x.split("-").map(Number));

   if (p2) {
      let highestMin = 0;
      return ranges
         .sort((a, b) => a[0] - b[0])
         .reduce((acc, current) => {
            const res = Math.max(
               current[1] + 1 - Math.max(current[0], highestMin),
               0,
            );
            highestMin = Math.max(highestMin, current[1] + 1);
            return acc + res;
         }, 0)
         .toString();
   }
   return chunks[1]
      .split("\n")
      .map(Number)
      .filter((x) => ranges.some((r) => r[0] <= x && x <= r[1]))
      .length.toString();
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
