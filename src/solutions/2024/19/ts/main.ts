import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function recurse(
   design: string,
   patterns: string[],
   memo: Map<string, number>,
): number {
   if (memo.has(design)) {
      return memo.get(design)!;
   }
   if (design.length === 0) {
      return 1;
   }
   let total = 0;
   for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
         total += recurse(design.slice(pattern.length), patterns, memo);
      }
      memo.set(design, total);
   }
   return total;
}

function fastP1(
   design: string,
   patterns: string[],
   visited: Set<string>,
): boolean {
   if (design.length === 0) {
      return true;
   }
   if (visited.has(design)) {
      return false;
   }
   visited.add(design);
   for (const pattern of patterns) {
      if (design.startsWith(pattern)) {
         if (fastP1(design.slice(pattern.length), patterns, visited)) {
            return true;
         }
      }
   }
   return false;
}

function solve(input: string, p2: boolean): string {
   const lines = input.split("\n\n");
   const patterns = lines[0].split(", ");
   let total = 0;
   const memo = new Map<string, number>();
   for (const design of lines[1].split("\n")) {
      if (p2) {
         total += recurse(design, patterns, memo);
      }
      else if (fastP1(design, patterns, new Set())) {
         total++;
      }
   }
   return total.toString();
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
