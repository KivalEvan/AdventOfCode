import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const directions = [
   [0, -1],
   [1, 0],
   [0, 1],
   [-1, 0],
];

function getPosition(grid: string[], str: string): [number, number] {
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === str) {
            return [x, y];
         }
      }
   }
   return [0, 0];
}

function rollover(num: number, max: number) {
   return ((num % max) + max) % max;
}

function solve(input: string, p2: boolean): string {
   const grid = input.split("\n");

   // dijkstra

   const start = getPosition(grid, "S");
   // const end = getPosition(grid, 'E');

   const queue: [number, number, number, number, [number, number][]][] = [
      [...start, 0, 1, []],
   ];

   const visited: Record<string, number> = {};
   let result = Number.MAX_SAFE_INTEGER;
   const tiles = grid.map((s) => s.split("").map((_) => false));
   while (queue.length) {
      // console.log(queue)
      const [x, y, step, direction, toVisit] = queue.pop()!;
      toVisit.push([x, y]);
      // console.log(x,y)

      if (result < step) {
         break;
      }

      if (grid[y][x] === "E") {
         result = step;
         for (const v of toVisit) {
            tiles[v[1]][v[0]] = true;
         }
         continue;
      }

      for (let d = -1; d <= 1; d++) {
         const nD = rollover(direction + d, directions.length);
         const [dx, dy] = directions[nD];
         const nx = x + dx;
         const ny = y + dy;

         if (grid[ny][nx] === "#") {
            continue;
         }

         const key = `${nx},${ny},${direction}`;
         visited[key] ||= Number.MAX_SAFE_INTEGER;
         if (visited[`${nx},${ny},${rollover(nD + 2, directions.length)}`] < step) {
            continue;
         }
         if (visited[key] < step) {
            continue;
         }
         visited[key] = step;

         queue.push([
            nx,
            ny,
            step + (direction !== nD ? 1001 : 1),
            nD,
            [...toVisit],
         ]);
      }
      queue.sort((a, b) => b[2] - a[2]);
   }

   if (p2) {
      return tiles
         .flatMap((e) => e)
         .filter((e) => e)
         .length.toString();
   }
   return result.toString();
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
