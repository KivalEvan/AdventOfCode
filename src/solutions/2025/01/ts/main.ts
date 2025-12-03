import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function mod(n: number, m: number): number {
   return ((n % m) + m) % m;
}

function solve(input: string, p2: boolean): string {
   let dial = 50;
   return input
      .split("\n")
      .reduce((acc, n) => {
         const newDial = dial + parseInt(n.slice(1)) * (n[0] === "R" ? 1 : -1);

         let zero = 0;
         if (p2) {
            zero += Math.floor(Math.abs(newDial) / 100)
               + (dial && newDial <= 0 ? 1 : 0);
            dial = mod(newDial, 100);
         }
         else {
            zero += (dial = mod(newDial, 100)) % 100 === 0 ? 1 : 0;
         }

         return acc + zero;
      }, 0)
      .toString();
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
