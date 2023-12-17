import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function sendhelp(grid: number[][], minTurn: number, maxStep: number): number {
   const maxY = grid.length;
   const maxX = grid[0].length;

   const directions = [
      [0, -1, 'U'],
      [0, 1, 'D'],
      [-1, 0, 'L'],
      [1, 0, 'R'],
   ] as const;

   const skippo = {
      U: 'D',
      D: 'U',
      L: 'R',
      R: 'L',
   } as const;

   const seen = new Set();
   const heatAry: [x: number, y: number, s: number, d: 'U' | 'D' | 'L' | 'R'][][] = [
      [
         [0, 0, 0, 'D'],
         [0, 0, 0, 'R'],
      ],
   ];
   let cH = 0;
   xdd: while (true) {
      for (const h of heatAry[cH] ?? []) {
         if (h[0] === maxX - 1 && h[1] === maxY - 1) break xdd;
         for (const d of directions) {
            if (skippo[h[3]!] === d[2]) continue;
            const nX = h[0] + d[0];
            const nY = h[1] + d[1];
            const nS = h[3] === d[2] ? h[2] + 1 : 1;

            if (h[3] !== d[2] && h[2] < minTurn) continue;
            if (nS > maxStep || nX < 0 || nX >= maxX || nY < 0 || nY >= maxY) continue;

            const key = nX.toString() + d[2] + nY.toString() + nS.toString();
            if (seen.has(key)) continue;
            seen.add(key);

            const nH = cH + grid[nY][nX];
            heatAry[nH] ??= [];
            heatAry[nH].push([nX, nY, nS, d[2]]);
         }
      }
      cH++;
      // if (cH > 100000) break; // because while loop sucks
   }

   return cH;
}

export function part1(input: string): string {
   const grid = input.split('\n').map((str) => str.split('').map(Number));
   return sendhelp(grid, 0, 3).toString();
}

export function part2(input: string): string {
   const grid = input.split('\n').map((str) => str.split('').map(Number));
   return sendhelp(grid, 4, 10).toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
