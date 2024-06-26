import { run } from '../../../src/ts/run.ts';

export const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

export function part1(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((str) => str.split(''));
   for (let x = 0; x < grid[0].length; x++) {
      let shift = -1;
      for (let y = 0; y < grid.length; y++) {
         if (grid[y][x] === '#') shift = y;
         if (grid[y][x] === 'O') {
            grid[y][x] = '.';
            grid[++shift][x] = 'O';
         }
      }
   }

   let res = 0;
   for (let i = 0; i < grid.length; i++) {
      for (const k of grid[i]) if (k === 'O') res += grid.length - i;
   }

   return res.toString();
}

function bigstuff(grid: string[][]): string {
   for (let x = 0; x < grid[0].length; x++) {
      let shift = -1;
      for (let y = 0; y < grid.length; y++) {
         if (grid[y][x] === '#') shift = y;
         if (grid[y][x] === 'O') {
            grid[y][x] = '.';
            grid[++shift][x] = 'O';
         }
      }
   }
   for (let y = 0; y < grid.length; y++) {
      let shift = -1;
      for (let x = 0; x < grid[0].length; x++) {
         if (grid[y][x] === '#') shift = x;
         if (grid[y][x] === 'O') {
            grid[y][x] = '.';
            grid[y][++shift] = 'O';
         }
      }
   }
   for (let x = 0; x < grid[0].length; x++) {
      let shift = grid.length;
      for (let y = shift - 1; y >= 0; y--) {
         if (grid[y][x] === '#') shift = y;
         if (grid[y][x] === 'O') {
            grid[y][x] = '.';
            grid[--shift][x] = 'O';
         }
      }
   }
   for (let y = 0; y < grid.length; y++) {
      let shift = grid[0].length;
      for (let x = shift - 1; x >= 0; x--) {
         if (grid[y][x] === '#') shift = x;
         if (grid[y][x] === 'O') {
            grid[y][x] = '.';
            grid[y][--shift] = 'O';
         }
      }
   }
   return grid.map((str) => str.join('')).join('\n');
}

export function part2(input: string, _isTest: boolean): string {
   // store pattern string here
   const set = new Set<string>();
   let grid = input.split('\n').map((str) => str.split(''));

   const CYCLES = 1_000_000_000;
   for (let c = 0; c < CYCLES; c++) {
      const temp = bigstuff(grid);
      // if we got to any prev pattern, then it's loop from here
      if (set.has(temp)) {
         const ary = [...set.keys()];
         const loopIdx = ary.indexOf(temp);
         // skip to the loop idx, get idx from target cycle - current cycle - this cycle
         input = ary[loopIdx + ((CYCLES - c - 1) % (ary.length - loopIdx))];
         break;
      }
      set.add(temp);
   }

   grid = input.split('\n').map((str) => str.split(''));
   let res = 0;
   for (let i = 0; i < grid.length; i++) {
      for (const k of grid[i]) if (k === 'O') res += grid.length - i;
   }

   return res.toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
