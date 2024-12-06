import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function goUp(grid: string[], x: number, y: number, i: number): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goUp(grid, x, y - 1, i + 1));
   }
   return [];
}

function goDown(grid: string[], x: number, y: number, i: number): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goDown(grid, x, y + 1, i + 1));
   }
   return [];
}

function goLeft(grid: string[], x: number, y: number, i: number): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goLeft(grid, x - 1, y, i + 1));
   }
   return [];
}

function goUpLeft(grid: string[], x: number, y: number, i: number): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goUpLeft(grid, x - 1, y - 1, i + 1));
   }
   return [];
}

function goDownLeft(
   grid: string[],
   x: number,
   y: number,
   i: number,
): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goDownLeft(grid, x - 1, y + 1, i + 1));
   }
   return [];
}

function goRight(grid: string[], x: number, y: number, i: number): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goRight(grid, x + 1, y, i + 1));
   }
   return [];
}

function goDownRight(
   grid: string[],
   x: number,
   y: number,
   i: number,
): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goDownRight(grid, x + 1, y + 1, i + 1));
   }
   return [];
}

function goUpRight(
   grid: string[],
   x: number,
   y: number,
   i: number,
): number[][] {
   if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) return [];
   if (grid[y][x] === 'XMAS'[i]) {
      return [[x, y]].concat(goUpRight(grid, x + 1, y - 1, i + 1));
   }
   return [];
}

function searchXmas(grid: string[], x: number, y: number): number {
   const given = [
      goUp(grid, x, y, 0),
      goDown(grid, x, y, 0),
      goLeft(grid, x, y, 0),
      goRight(grid, x, y, 0),
      goUpLeft(grid, x, y, 0),
      goUpRight(grid, x, y, 0),
      goDownLeft(grid, x, y, 0),
      goDownRight(grid, x, y, 0),
   ];
   let counted = 0;
   for (const g of given) {
      if (g.length > 4) console.log(g);
      if (g.length === 4) {
         counted++;
      }
   }
   return counted;
}

function part1(input: string, _isTest: boolean): string {
   const grid: string[] = input.split('\n');

   let count = 0;
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === 'X') {
            count += searchXmas(grid, x, y);
         }
      }
   }

   return count.toString();
}

function fkinkillme(grid: string[], x: number, y: number): number {
   for (let dy = -1; dy <= 1; dy += 2) {
      for (let dx = -1; dx <= 1; dx += 2) {
         if (
            grid[y + dy][x + dx] === 'M' &&
            grid[y + -dy][x + -dx] === 'S' &&
            grid[y + dy][x + -dx] === 'M' &&
            grid[y + -dy][x + dx] === 'S'
         ) {
            return 1;
         }
         if (
            grid[y + -dy][x + -dx] === 'M' &&
            grid[y + -dy][x + dx] === 'S' &&
            grid[y + dy][x + -dx] === 'M' &&
            grid[y + dy][x + dx] === 'S'
         ) {
            return 1;
         }
      }
   }
   return 0;
}

function part2(input: string, _isTest: boolean): string {
   const grid: string[] = input.split('\n');

   console.log();
   let count = 0;
   for (let y = 1; y < grid.length - 1; y++) {
      for (let x = 1; x < grid[y].length - 1; x++) {
         if (grid[y][x] === 'A') {
            count += fkinkillme(grid, x, y);
         }
      }
   }
   return count.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
