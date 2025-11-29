import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const keypadArray = [
   [" ", "^", "A"],
   ["<", "v", ">"],
];

const codepadArray = [
   ["7", "8", "9"],
   ["4", "5", "6"],
   ["1", "2", "3"],
   [" ", "0", "A"],
];

const directions: [number, number, string][] = [
   [0, -1, "^"],
   [1, 0, ">"],
   [0, 1, "v"],
   [-1, 0, "<"],
];

function getPaths(
   grid: string[][],
   cx: number,
   cy: number,
   nx: number,
   ny: number,
): string[] {
   const maxPathLength = Math.abs(cx - nx) + Math.abs(cy - ny);
   const queue: [number, number, string][] = [[cx, cy, ""]];
   const possiblePaths: string[] = [];
   while (queue.length > 0) {
      const [x, y, path] = queue.shift()!;

      if (path.length > maxPathLength) {
         continue;
      }

      if (x === nx && y === ny) {
         possiblePaths.push(path + "A");
         continue;
      }

      for (const [dx, dy, dir] of directions) {
         const nx = x + dx;
         const ny = y + dy;
         if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
            if (grid[ny][nx] !== " ") {
               queue.push([nx, ny, path + dir]);
            }
         }
      }
   }

   return possiblePaths;
}

function findPosition(grid: string[][], value: string): [number, number] {
   for (const [y, row] of grid.entries()) {
      const x = row.indexOf(value);
      if (x >= 0) {
         return [x, y];
      }
   }
   return [-1, -1];
}

function recurse(
   code: string,
   depth: number,
   grid: string[][],
   memo: Map<string, number>,
): number {
   const key = code + depth.toString();
   if (memo.has(key)) {
      return memo.get(key)!;
   }
   if (depth < 0) {
      return code.length;
   }

   let [x, y] = findPosition(grid, "A");
   let total = 0;
   for (const seq of code) {
      const [nx, ny] = findPosition(grid, seq);
      total += Math.min(
         ...getPaths(grid, x, y, nx, ny).map((p) => recurse(p, depth - 1, keypadArray, memo)),
      );
      [x, y] = [nx, ny];
   }

   memo.set(key, total);
   return total;
}

function solve(input: string, p2: boolean): string {
   const codes = input.split("\n");
   let total = 0;
   const memo = new Map<string, number>();
   for (const code of codes) {
      total += recurse(code, p2 ? 25 : 2, codepadArray, memo)
         * parseInt(code.match(/\d+/g)![0]);
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
