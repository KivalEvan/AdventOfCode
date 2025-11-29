import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function findPosition(grid: string[][], str: string) {
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === str) {
            return { x, y };
         }
      }
   }
   return { x: -1, y: -1 };
}

const directions = [
   [0, 1],
   [1, 0],
   [0, -1],
   [-1, 0],
];

function solve(input: string, p2: boolean, isTest: boolean): string {
   const grid = input.split("\n").map((line) => line.split(""));

   const startPos = findPosition(grid, "S");
   const endPos = findPosition(grid, "E");

   const pathPositions = [];
   const visited = new Set();
   const queue = [{ ...startPos }];
   while (queue.length > 0) {
      const { x, y } = queue.shift()!;
      if (visited.has(`${x},${y}`)) {
         continue;
      }
      visited.add(`${x},${y}`);

      pathPositions.push({ x, y });
      if (x === endPos.x && y === endPos.y) {
         break;
      }

      for (const dir of directions) {
         const nx = x + dir[0];
         const ny = y + dir[1];

         if (nx < 0 || ny < 0 || nx >= grid[0].length || ny >= grid.length) {
            continue;
         }

         if (grid[ny][nx] === "#") {
            continue;
         }

         queue.push({ x: nx, y: ny });
      }
   }

   let skips = 0;
   for (let l = 0; l < pathPositions.length - 1; l++) {
      for (let r = l + 1; r < pathPositions.length; r++) {
         const skipped = r - l;

         const xDiff = Math.abs(pathPositions[l].x - pathPositions[r].x);
         const yDiff = Math.abs(pathPositions[l].y - pathPositions[r].y);

         if (xDiff + yDiff <= (p2 ? 20 : 2)) {
            const saved = skipped - (xDiff + yDiff);
            if (saved >= (isTest ? 64 : 100)) {
               skips++;
            }
         }
      }
   }

   return skips.toString();
}

function part1(input: string, isTest: boolean): string {
   return solve(input, false, isTest);
}

function part2(input: string, isTest: boolean): string {
   return solve(input, true, isTest);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
