import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, p2: boolean): string {
   const nums = input.split(" ").map(Number);

   let map: Map<number, number> = new Map();
   for (let i = 0; i < nums.length; i++) {
      if (!map.has(nums[i])) map.set(nums[i], 0);
      map.set(nums[i], map.get(nums[i])! + 1);
   }

   for (let i = 0; i < (p2 ? 75 : 25); i++) {
      const newMap: Map<number, number> = new Map();
      for (const [value, count] of map.entries()) {
         if (value === 0) {
            if (!newMap.has(1)) newMap.set(1, 0);
            newMap.set(1, newMap.get(1)! + count);
         }
         else if (value.toString().length % 2 === 0) {
            const l = parseInt(value.toString().slice(0, value.toString().length / 2));
            const r = parseInt(value.toString().slice(value.toString().length / 2));
            if (!newMap.has(l)) newMap.set(l, 0);
            newMap.set(l, newMap.get(l)! + count);
            if (!newMap.has(r)) newMap.set(r, 0);
            newMap.set(r, newMap.get(r)! + count);
         }
         else {
            const n = value * 2024;
            if (!newMap.has(n)) newMap.set(n, 0);
            newMap.set(n, newMap.get(n)! + count);
         }
      }
      map = newMap;
   }

   return map.values()
      .reduce((pv, v) => pv + v, 0)
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
