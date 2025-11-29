import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

function solve(input: string, p2: boolean): string {
   let doit = true;
   let mul = 0;
   for (const m of input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g)!) {
      if (m === "do()") {
         if (p2) doit = true;
         continue;
      }
      if (m === "don't()") {
         if (p2) doit = false;
         continue;
      }
      if (!doit) continue;
      const [_, a, b] = m.match(/(\d{1,3}),(\d{1,3})/)!;
      mul += parseInt(a) * parseInt(b);
   }
   return mul.toString();
}

function part1(input: string, _isTest: boolean): string {
   return solve(input, false);
}

function part2(input: string, _isTest: boolean): string {
   return solve(input, true);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
