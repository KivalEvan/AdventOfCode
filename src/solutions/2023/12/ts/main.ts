// deno-lint-ignore-file no-explicit-any
import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(field: string, conditions: number[]): number {
   const cache = new Map<string, number>();
   function memoize(fn: (x: number, y: number) => any) {
      return (x: number, y: number) => {
         const key = x.toString() + y.toString();
         if (cache.has(key)) {
            return cache.get(key);
         }
         else {
            const result = fn(x, y);
            cache.set(key, result);
            return result;
         }
      };
   }

   function lookahead(fIdx: number, cIdx: number): number {
      if (cIdx === conditions.length) return 0;
      if (field.length - fIdx < conditions[cIdx]) return 0;
      for (let k = fIdx; k < fIdx + conditions[cIdx]; k++) if (field[k] === ".") return 0;
      if (field.length - 1 === conditions[cIdx]) return wedoabitofrecursion(field.length, cIdx + 1);
      if (field[fIdx + conditions[cIdx]] !== "#") {
         return wedoabitofrecursion(fIdx + conditions[cIdx] + 1, cIdx + 1);
      }
      return 0;
   }

   const wedoabitofrecursion = memoize((fIdx: number, cIdx: number): number => {
      if (fIdx >= field.length) return cIdx === conditions.length ? 1 : 0;
      if (field[fIdx] === ".") return wedoabitofrecursion(fIdx + 1, cIdx);
      if (field[fIdx] === "#") return lookahead(fIdx, cIdx);
      return wedoabitofrecursion(fIdx + 1, cIdx) + lookahead(fIdx, cIdx);
   });

   return wedoabitofrecursion(0, 0);
}

function part1(input: string, _isTest: boolean): string {
   const parsed = input.split("\n").map((str) => {
      const temp: any[] = str.split(" ");
      temp[1] = temp[1].split(",").map(Number);
      return temp as [string, number[]];
   });

   let res = 0;
   for (const [field, conditions] of parsed) res += solve(field, conditions);

   return res.toString();
}

function part2(input: string, _isTest: boolean): string {
   const parsed = input.split("\n").map((str) => {
      const temp: any[] = str.split(" ");
      temp[1] = temp[1].split(",").map(Number);
      return temp as [string, number[]];
   });

   let res = 0;
   for (const [field, conditions] of parsed) {
      res += solve(field + "?" + field + "?" + field + "?" + field + "?" + field, [
         ...conditions,
         ...conditions,
         ...conditions,
         ...conditions,
         ...conditions,
      ]);
   }

   return res.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
