import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function isBetween(val: number, n1: number, n2: number) {
   return (n1 > val && val > n2) || (n2 > val && val > n1);
}

export function part1(input: string): string {
   const grid: string[] = input.split('\n');
   const galaxies: Record<number, [x: number, y: number]> = {};
   const xRowAdd = [];
   const yRowAdd = [];
   let i = 0;
   for (let x = 0; x < grid[0].length; x++) {
      let flag = false;
      for (let y = 0; y < grid.length; y++) {
         if (grid[y][x] === '#') galaxies[++i] = [x, y];
         flag ||= grid[y][x] === '#';
      }
      if (!flag) xRowAdd.push(x);
   }
   for (let y = 0; y < grid.length; y++) {
      let flag = false;
      for (let x = 0; x < grid[0].length; x++) flag ||= grid[y][x] === '#';
      if (!flag) yRowAdd.push(y);
   }

   let res = 0;
   for (let m = 1; m <= i; m++) {
      for (let n = m + 1; n <= i; n++) {
         const loc1 = galaxies[m];
         const loc2 = galaxies[n];
         const add =
            xRowAdd.filter((x) => isBetween(x, loc1[0], loc2[0])).length +
            yRowAdd.filter((y) => isBetween(y, loc1[1], loc2[1])).length;
         res += Math.abs(loc1[0] - loc2[0]) + Math.abs(loc1[1] - loc2[1]) + add;
      }
   }

   return res.toString();
}

export function part2(input: string): string {
   const grid: string[] = input.split('\n');
   const galaxies: Record<number, [x: number, y: number]> = {};
   const xRowAdd = [];
   const yRowAdd = [];
   let i = 0;
   for (let x = 0; x < grid[0].length; x++) {
      let flag = false;
      for (let y = 0; y < grid.length; y++) {
         if (grid[y][x] === '#') galaxies[++i] = [x, y];
         flag ||= grid[y][x] === '#';
      }
      if (!flag) xRowAdd.push(x);
   }
   for (let y = 0; y < grid.length; y++) {
      let flag = false;
      for (let x = 0; x < grid[0].length; x++) flag ||= grid[y][x] === '#';
      if (!flag) yRowAdd.push(y);
   }

   let res = 0;
   for (let m = 1; m <= i; m++) {
      for (let n = m + 1; n <= i; n++) {
         const loc1 = galaxies[m];
         const loc2 = galaxies[n];
         const addX = xRowAdd.filter((x) => isBetween(x, loc1[0], loc2[0])).length;
         const addY = yRowAdd.filter((y) => isBetween(y, loc1[1], loc2[1])).length;
         res +=
            Math.abs(loc1[0] - loc2[0]) +
            Math.abs(loc1[1] - loc2[1]) +
            (addX + addY) * 1_000_000 -
            addX -
            addY;
      }
   }

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
