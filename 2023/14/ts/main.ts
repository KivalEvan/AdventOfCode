import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

export function part1(input: string): string {
   const grid = input.split('\n').map((str) => str.split(''));
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === 'O') {
            for (let z = y - 1; z >= 0; z--) {
               if (grid[z][x] !== '.') break;
               grid[z][x] = 'O';
               grid[z + 1][x] = '.';
            }
         }
      }
   }

   let res = 0;
   for (let i = 0; i < grid.length; i++)
      for (const k of grid[i]) if (k === 'O') res += grid.length - i;

   return res.toString();
}

export function part2(input: string): string {
   // store pattern string here
   const set = new Set<string>();

   function bigstuff(grid: string[][]) {
      for (let y = 0; y < grid.length; y++) {
         for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'O') {
               for (let z = y - 1; z >= 0; z--) {
                  if (grid[z][x] !== '.') break;
                  grid[z][x] = 'O';
                  grid[z + 1][x] = '.';
               }
            }
         }
      }

      for (let y = 0; y < grid.length; y++) {
         for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'O') {
               for (let z = x - 1; z >= 0; z--) {
                  if (grid[y][z] !== '.') break;
                  grid[y][z] = 'O';
                  grid[y][z + 1] = '.';
               }
            }
         }
      }

      for (let y = grid.length - 1; y >= 0; y--) {
         for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === 'O') {
               for (let z = y + 1; z < grid.length; z++) {
                  if (grid[z][x] !== '.') break;
                  grid[z][x] = 'O';
                  grid[z - 1][x] = '.';
               }
            }
         }
      }

      for (let y = 0; y < grid.length; y++) {
         for (let x = grid[y].length - 1; x >= 0; x--) {
            if (grid[y][x] === 'O') {
               for (let z = x + 1; z < grid[y].length; z++) {
                  if (grid[y][z] !== '.') break;
                  grid[y][z] = 'O';
                  grid[y][z - 1] = '.';
               }
            }
         }
      }

      return grid.map((str) => str.join('')).join('\n');
   }

   let grid = input.split('\n').map((str) => str.split(''));
   const CYCLES = 1_000_000_000;
   for (let c = 0; c < CYCLES; c++) {
      const temp = bigstuff(grid);
      // if we got to any prev pattern, then it's loop from here
      if (set.has(temp)) {
         const ary = [...set.keys()];
         const foundIdx = ary.indexOf(temp);
         // skip to the loop idx, get idx from target cycle - current cycle - this cycle
         input = ary[foundIdx + ((CYCLES - c - 1) % (ary.length - foundIdx))];
         break;
      }
      set.add(temp);
   }

   grid = input.split('\n').map((str) => str.split(''));
   let res = 0;
   for (let i = 0; i < grid.length; i++)
      for (const k of grid[i]) if (k === 'O') res += grid.length - i;

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
