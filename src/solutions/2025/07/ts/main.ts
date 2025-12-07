import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, isTest: boolean, p2: boolean): string {
   const splitters = input
      .split("\n")
      .map((x) =>
         x
            .split("")
            .map((x, i) => (x === "^" ? i : -1))
      );

   const visited = {};
   function depth(column: number, row: number): number {
      if (row >= splitters.length) return 1;
      const key = `${row},${column}`;
      if (key in visited) return visited[key];

      let res = 0;
      if (splitters[row].includes(column)) {
         res = depth(column - 1, row + 2) + depth(column + 1, row + 2);
         visited[key] = res;
      }
      else {
         res = depth(column, row + 2);
      }

      return res;
   }

   const timelines = depth(input.indexOf("S"), 0);
   return p2 ? timelines.toString() : Object.keys(visited).length.toString();
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
