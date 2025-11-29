import { argv } from "node:process";
import { start } from "node:repl";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function getAllStart(grid: number[][]): [x: number, y: number][] {
   const starts: [number, number][] = [];
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === 0) {
            starts.push([x, y]);
         }
      }
   }
   return starts;
}

function solve(input: string, p2: boolean): string {
   const grid = input.split("\n").map((str) => str.split("").map(Number));

   const starting = getAllStart(grid);
   let count = 0;
   for (const start of starting) {
      const visited = new Set<string>();
      const queue = [start];
      while (queue.length) {
         const [x, y] = queue.pop()!;
         const pos = grid[y][x];
         if (pos === 9 && !visited.has(`${x},${y}`)) {
            if (!p2) visited.add(`${x},${y}`);
            count++;
            continue;
         }
         for (
            const [dx, dy] of [
               [1, 0],
               [-1, 0],
               [0, 1],
               [0, -1],
            ]
         ) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= grid[0].length || ny < 0 || ny >= grid.length) {
               continue;
            }
            if (grid[ny][nx] === pos + 1) {
               queue.push([nx, ny]);
            }
         }
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
