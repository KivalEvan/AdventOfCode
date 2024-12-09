import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, p2: boolean): string {
   const grid = input.split('\n');
   const visited = grid.map(() => new Array(grid[0].length).fill(false));
   const antennas: Record<string, [number, number][]> = {};
   grid.forEach((line, y) => {
      line.split('').forEach((char, x) => {
         if (char !== '.') {
            if (!antennas[char]) antennas[char] = [];
            antennas[char].push([x, y]);
         }
      });
   });

   for (const char in antennas) {
      for (const [x, y] of antennas[char]) {
         for (const [cx, cy] of antennas[char]) {
            if (cx === x && cy === y) {
               continue;
            }

            const distX = cx - x;
            const distY = cy - y;

            if (p2) {
               let calcX = x + distX;
               let calcY = y + distY;
               while (grid[calcY]?.[calcX] !== undefined) {
                  visited[calcY][calcX] = true;
                  calcX += distX;
                  calcY += distY;
               }
               calcX = x - distX;
               calcY = y - distY;
               while (grid[calcY]?.[calcX] !== undefined) {
                  visited[calcY][calcX] = true;
                  calcX -= distX;
                  calcY -= distY;
               }
            } else {
               if (
                  grid[y + distY]?.[x + distX] !== char &&
                  grid[y + distY]?.[x + distX] !== undefined
               ) {
                  visited[y + distY][x + distX] = true;
               }
               if (
                  grid[y - distY]?.[x - distX] !== char &&
                  grid[y - distY]?.[x - distX] !== undefined
               ) {
                  visited[y - distY][x - distX] = true;
               }
            }
         }
      }
   }

   return visited
      .flat()
      .filter((x) => x)
      .length.toString();
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
