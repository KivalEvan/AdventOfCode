import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, isTest: boolean, p2: boolean): string {
   return "";
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
