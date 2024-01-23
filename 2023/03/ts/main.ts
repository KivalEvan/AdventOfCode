import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function isNum(c: string) {
   return (
      c === '0' ||
      c === '1' ||
      c === '2' ||
      c === '3' ||
      c === '4' ||
      c === '5' ||
      c === '6' ||
      c === '7' ||
      c === '8' ||
      c === '9'
   );
}

function isSymbol(c: string) {
   return (
      c === '*' ||
      c === '$' ||
      c === '=' ||
      c === '#' ||
      c === '%' ||
      c === '/' ||
      c === '&' ||
      c === '+' ||
      c === '-' ||
      c === '@'
   );
}

function yeetTheNumber(grid: string[][], x: number, y: number): string {
   let res = '';
   if (isNum(grid[y][x])) {
      res += grid[y][x];
      grid[y][x] = '.';

      if (x > 0) res = yeetTheNumber(grid, x - 1, y) + res;
      if (x < grid[y].length - 1) res += yeetTheNumber(grid, x + 1, y);
   }
   return res;
}

export function part1(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((s) => s.split(''));
   const SZ = grid.length;

   let res = 0;

   for (let y = 0; y < SZ; y++) {
      for (let x = 0; x < SZ; x++) {
         if (isSymbol(grid[y][x])) {
            if (x > 0) {
               if (y < SZ - 1) res += Number(yeetTheNumber(grid, x - 1, y + 1));
               if (y > 0) res += Number(yeetTheNumber(grid, x - 1, y - 1));
               res += Number(yeetTheNumber(grid, x - 1, y));
            }
            if (x < SZ - 1) {
               if (y < SZ - 1) res += Number(yeetTheNumber(grid, x + 1, y + 1));
               if (y > 0) res += Number(yeetTheNumber(grid, x + 1, y - 1));
               res += Number(yeetTheNumber(grid, x + 1, y));
            }
            if (y > 0) res += Number(yeetTheNumber(grid, x, y - 1));
            if (y < SZ - 1) res += Number(yeetTheNumber(grid, x, y + 1));
         }
      }
   }

   return res.toString();
}

export function part2(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((s) => s.split(''));
   const SZ = grid.length;

   let res = 0;

   for (let y = 0; y < SZ; y++) {
      for (let x = 0; x < SZ; x++) {
         if (grid[y][x] === '*') {
            let ary = [];
            if (x > 0) {
               if (y < SZ - 1) ary.push(Number(yeetTheNumber(grid, x - 1, y + 1)));
               if (y > 0) ary.push(Number(yeetTheNumber(grid, x - 1, y - 1)));
               ary.push(Number(yeetTheNumber(grid, x - 1, y)));
            }
            if (x < SZ - 1) {
               if (y < SZ - 1) ary.push(Number(yeetTheNumber(grid, x + 1, y + 1)));
               if (y > 0) ary.push(Number(yeetTheNumber(grid, x + 1, y - 1)));
               ary.push(Number(yeetTheNumber(grid, x + 1, y)));
            }
            if (y > 0) ary.push(Number(yeetTheNumber(grid, x, y - 1)));
            if (y < SZ - 1) ary.push(Number(yeetTheNumber(grid, x, y + 1)));
            ary = ary.filter((e) => e);
            if (ary.length === 2) res += ary.reduce((pv, v) => pv * v, 1);
         }
      }
   }

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
