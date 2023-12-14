import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

export function part1(input: string): string {
   const grid = input.split('\n').map((str) => str.split(''));
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === 'O') {
            for (let z = y - 1; z >= 0; z--) {
               if (grid[z][x] === '#' || grid[z][x] === 'O') break;
               if (grid[z][x] === '.') {
                  grid[z][x] = 'O';
                  grid[z + 1][x] = '.';
               }
            }
         }
      }
   }

   let res = 0;
   for (let i = 0; i < grid.length; i++)
      for (const k of grid[i]) if (k === 'O') res += grid.length - i;

   return res.toString();
}

function solve(input: string): number {
   // use Map for smol cache and infrequent read, object for very big cache and very very frequent read
   const cache: Record<string, string> = {};
   function memoize(fn: (grid: string) => string) {
      return (grid: string) => {
         if (grid in cache) {
            return cache[grid];
         } else {
            const result = fn(grid);
            cache[grid] = result;
            return result;
         }
      };
   }

   const bigstuff = memoize((input: string): string => {
      const grid = input.split('\n').map((str) => str.split(''));
      for (let y = 0; y < grid.length; y++) {
         for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'O') {
               for (let z = y - 1; z >= 0; z--) {
                  if (grid[z][x] === '#' || grid[z][x] === 'O') break;
                  if (grid[z][x] === '.') {
                     grid[z][x] = 'O';
                     grid[z + 1][x] = '.';
                  }
               }
            }
         }
      }

      for (let y = 0; y < grid.length; y++) {
         for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'O') {
               for (let z = x - 1; z >= 0; z--) {
                  if (grid[y][z] === '#' || grid[y][z] === 'O') break;
                  if (grid[y][z] === '.') {
                     grid[y][z] = 'O';
                     grid[y][z + 1] = '.';
                  }
               }
            }
         }
      }

      for (let y = grid.length - 1; y >= 0; y--) {
         for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'O') {
               for (let z = y + 1; z < grid.length; z++) {
                  if (grid[z][x] === '#' || grid[z][x] === 'O') break;
                  if (grid[z][x] === '.') {
                     grid[z][x] = 'O';
                     grid[z - 1][x] = '.';
                  }
               }
            }
         }
      }

      for (let y = 0; y < grid.length; y++) {
         for (let x = grid[y].length - 1; x >= 0; x--) {
            if (grid[y][x] === 'O') {
               for (let z = x + 1; z < grid[0].length; z++) {
                  if (grid[y][z] === '#' || grid[y][z] === 'O') break;
                  if (grid[y][z] === '.') {
                     grid[y][z] = 'O';
                     grid[y][z - 1] = '.';
                  }
               }
            }
         }
      }

      return grid.map((str) => str.join('')).join('\n');
   });

   const CYCLES = 1_000_000_000;
   // const CYCLES = 200;
   for (let c = 0; c < CYCLES; c++) input = bigstuff(input)!;

   const grid = input.split('\n').map((str) => str.split(''));
   let res = 0;
   for (let i = 0; i < grid.length; i++)
      for (const k of grid[i]) if (k === 'O') res += grid.length - i;
   return res;
}

export function part2(input: string): string {
   return solve(input).toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
