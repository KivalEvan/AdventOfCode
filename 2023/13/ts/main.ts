import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function mh(grid: string[], l: number, r: number): number {
   if (l < 0 || r === grid[0].length) return 0;
   let n = 0;
   for (let y = 0; y < grid.length; y++) if (grid[y][l] !== grid[y][r]) n++;
   return n + mh(grid, l - 1, r + 1);
}

function mv(grid: string[], u: number, d: number): number {
   if (u < 0 || d === grid.length) return 0;
   let n = 0;
   for (let x = 0; x < grid[0].length; x++) if (grid[u][x] !== grid[d][x]) n++;
   return n + mv(grid, u - 1, d + 1);
}

function mirrorHorizontal(grid: string[], smudge = 0): number {
   for (let x = 0; x < grid[0].length - 1; x++) if (mh(grid, x, x + 1) === smudge) return x + 1;
   return 0;
}

function mirrorVertical(grid: string[], smudge = 0): number {
   for (let y = 0; y < grid.length - 1; y++) if (mv(grid, y, y + 1) === smudge) return y + 1;
   return 0;
}

export function part1(input: string): string {
   const parsed = input.split('\n\n').map((str) => str.split('\n'));

   let res = 0;
   for (const pattern of parsed) {
      let t = mirrorHorizontal(pattern);
      if (!t) t = mirrorVertical(pattern) * 100;
      res += t;
   }

   return res.toString();
}

export function part2(input: string): string {
   const parsed = input.split('\n\n').map((str) => str.split('\n'));

   let res = 0;
   for (const pattern of parsed) {
      let t = mirrorHorizontal(pattern, 1);
      if (!t) t = mirrorVertical(pattern, 1) * 100;
      res += t;
   }

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
