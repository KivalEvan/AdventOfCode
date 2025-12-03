import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function getDigits(n: number): number {
   let digits = 0;
   while (n > 0) {
      digits++;
      n = Math.floor(n / 10);
   }
   return digits;
}

function* candidates(start: number, end: number): Generator<number> {
   const set = new Set<number>();
   const digitsMin = getDigits(start);
   const digitsMax = getDigits(end);
   for (let digit = 1; digit <= digitsMax / 2; digit++) {
      if (digitsMin % digit != 0 && digitsMax % digit != 0) continue;
      const s = Math.pow(10, digit - 1);
      const e = Math.pow(10, digit);
      for (let x = s; x < e; x++) {
         let n = x;
         while (true) {
            n = n * e + x;
            if (n < start) continue;
            if (n > end) break;
            if (set.has(n)) break;
            set.add(n);
            yield n;
         }
      }
   }
}

function solve(input: string, isTest: boolean, p2: boolean): string {
   return input
      .split("\n")
      .flatMap((line) => line.split(",").filter((line) => line))
      .map((pair) => pair.split("-").map(Number))
      .reduce((acc, [start, end]) => {
         for (const x of candidates(start, end)) {
            if (!p2) {
               const digits = getDigits(x);
               if (digits % 2 != 0) continue;

               const place = Math.pow(10, Math.floor(digits / 2));
               const left = Math.floor(x / place);
               const right = x % place;

               if (left == right) acc += x;
               continue;
            }
            acc += x;
         }
         return acc;
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
