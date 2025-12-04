import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function countNeighbour(x: number, y: number, max: number, input: string) {
   let adjacent = 0;
   for (let nX = -1; nX <= 1; nX++)
      for (let nY = -1; nY <= 1; nY++) {
         const index = max * (y + nY) + x + nX + y + nY;
         if (index < 0 || index >= input.length) continue;
         if (input[index] == '@') adjacent++;
      }

   return adjacent - 1;
}

function updateNeighbour(
   x: number,
   y: number,
   max: number,
   grid: Uint8Array,
   candidates: [number, number][]
) {
   for (let nX = -1; nX <= 1; nX++)
      for (let nY = -1; nY <= 1; nY++) {
         const index = max * (y + nY) + x + nX + y + nY;
         if (index < 0 || index >= grid.length) continue;
         grid[index]--;
         if (grid[index] == 3) {
            candidates.push([x + nX, y + nY]);
         }
      }
}

function solve(input: string, isTest: boolean, p2: boolean): string {
   const grid = new Uint8Array(input.length);
   const max = input.indexOf('\n');

   const candidates: [number, number][] = [];
   for (let y = 0; y < max; y++)
      for (let x = 0; x < max; x++) {
         const index = max * y + x + y;
         if (input[index] == '@') {
            grid[index] = countNeighbour(x, y, max, input);
            if (grid[index] < 4) candidates.push([x, y]);
         }
      }

   let total = 0;
   while (candidates.length) {
      const [x, y] = candidates.pop()!;
      grid[max * y + x + y] = 0;
      total++;
      if (p2) updateNeighbour(x, y, max, grid, candidates);
   }

   return total.toString();
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
