import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function isBetween(val: number, n1: number, n2: number) {
   return (n1 > val && val > n2) || (n2 > val && val > n1);
}

export function part1(input: string, _isTest: boolean): string {
   const grid: string[] = input.split('\n');
   const galaxies = [];
   const xRowAdd = [];
   const yRowAdd = [];
   let sz = 0;
   for (let x = 0; x < grid[0].length; x++) {
      let flag = false;
      for (let y = 0; y < grid.length; y++) {
         if (grid[y][x] === '#') galaxies[sz++] = [x, y];
         flag ||= grid[y][x] === '#';
      }
      if (!flag) xRowAdd.push(x);
   }
   xdd: for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) if (grid[y][x] === '#') continue xdd;
      yRowAdd.push(y);
   }

   let res = 0;
   for (let m = 0; m < sz; m++) {
      for (let n = m + 1; n < sz; n++) {
         const loc1 = galaxies[m];
         const loc2 = galaxies[n];
         const add = xRowAdd.filter((x) => isBetween(x, loc1[0], loc2[0])).length +
            yRowAdd.filter((y) => isBetween(y, loc1[1], loc2[1])).length;
         res += Math.abs(loc1[0] - loc2[0]) + Math.abs(loc1[1] - loc2[1]) + add;
      }
   }

   return res.toString();
}

export function part2(input: string, _isTest: boolean): string {
   const grid: string[] = input.split('\n');
   const galaxies = [];
   const xRowAdd = [];
   const yRowAdd = [];
   let sz = 0;
   for (let x = 0; x < grid[0].length; x++) {
      let flag = false;
      for (let y = 0; y < grid.length; y++) {
         if (grid[y][x] === '#') galaxies[sz++] = [x, y];
         flag ||= grid[y][x] === '#';
      }
      if (!flag) xRowAdd.push(x);
   }
   xdd: for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) if (grid[y][x] === '#') continue xdd;
      yRowAdd.push(y);
   }

   let res = 0;
   for (let m = 0; m < sz; m++) {
      for (let n = m + 1; n < sz; n++) {
         const loc1 = galaxies[m];
         const loc2 = galaxies[n];
         const add = xRowAdd.filter((x) => isBetween(x, loc1[0], loc2[0])).length +
            yRowAdd.filter((y) => isBetween(y, loc1[1], loc2[1])).length;
         res += Math.abs(loc1[0] - loc2[0]) + Math.abs(loc1[1] - loc2[1]) + add * 1_000_000 - add;
      }
   }

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
