import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, isTest: boolean, p2: boolean): string {
   const textEncoder = new TextEncoder();
   return input
      .split("\n")
      .map((line) => textEncoder.encode(line))
      .reduce((acc, line) => {
         let res = 0;
         let start = 0;
         const max = p2 ? 12 : 2;
         for (let digit = 0; digit < max; digit++) {
            let marked = 0;
            let n = 0;
            const t = max - 1 - digit;
            const l = line.length - t;
            for (let it = start; it < l; it++) {
               const parsed = line[it] - 0x30;
               if (n < parsed) {
                  marked = it;
                  n = parsed;
               }
            }
            start = marked + 1;
            res += n * Math.pow(10, t);
         }
         return acc + res;
      }, 0)
      .toString();
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
