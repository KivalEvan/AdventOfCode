import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, p2: boolean): string {
   const pins: number[][] = [];
   const keys: number[][] = [];
   for (const k of input.split("\n\n").map((line) => line.split("\n"))) {
      const size = [0, 0, 0, 0, 0];
      for (let y = 1; y <= 5; y++) {
         for (let x = 0; x < 5; x++) {
            if (k[y][x] === "#") size[x]++;
         }
      }
      if (k[0].includes("#")) pins.push(size);
      else keys.push(size);
   }
   let count = 0;
   for (let p = 0; p < pins.length; p++) {
      compare: for (let k = 0; k < keys.length; k++) {
         for (let i = 0; i < 5; i++) {
            if (pins[p][i] + keys[k][i] > 5) continue compare;
         }
         count++;
      }
   }
   return count.toString();
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
