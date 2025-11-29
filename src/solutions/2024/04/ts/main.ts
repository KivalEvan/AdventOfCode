import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
   const grid: string[] = input.split("\n");

   let count = 0;
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === "X") {
            for (let dy = -1; dy <= 1; dy += 1) {
               for (let dx = -1; dx <= 1; dx += 1) {
                  if (
                     (dy === 0 && dx === 0)
                     || y + dy * 3 > grid.length - 1
                     || x + dx * 3 > grid[y].length - 1
                     || y + dy * 3 < 0
                     || x + dx * 3 < 0
                  ) {
                     continue;
                  }
                  if (
                     grid[y + dy][x + dx] === "M"
                     && grid[y + dy * 2][x + dx * 2] === "A"
                     && grid[y + dy * 3][x + dx * 3] === "S"
                  ) {
                     count++;
                  }
               }
            }
         }
      }
   }

   return count.toString();
}

function fkinkillme(grid: string[], x: number, y: number): number {
   for (let d = -1; d <= 1; d += 2) {
      if (
         grid[y + d][x + d] === "M"
         && grid[y + -d][x + -d] === "S"
         && grid[y + d][x + -d] === "M"
         && grid[y + -d][x + d] === "S"
      ) {
         return 1;
      }
      if (
         grid[y + -d][x + -d] === "M"
         && grid[y + -d][x + d] === "S"
         && grid[y + d][x + -d] === "M"
         && grid[y + d][x + d] === "S"
      ) {
         return 1;
      }
   }
   return 0;
}

function part2(input: string, _isTest: boolean): string {
   const grid: string[] = input.split("\n");

   let count = 0;
   for (let y = 1; y < grid.length - 1; y++) {
      for (let x = 1; x < grid[y].length - 1; x++) {
         if (grid[y][x] === "A") {
            count += fkinkillme(grid, x, y);
         }
      }
   }
   return count.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
