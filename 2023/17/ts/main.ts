import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const enum Direction {
   UP,
   DOWN,
   LEFT,
   RIGHT,
}

function sendhelp(grid: number[][], minTurn: number, maxStep: number): number {
   const maxY = grid.length;
   const maxX = grid[0].length;

   const directions = [
      [0, -1, Direction.UP],
      [0, 1, Direction.DOWN],
      [-1, 0, Direction.LEFT],
      [1, 0, Direction.RIGHT],
   ] as const;

   const skippo = {
      [Direction.UP]: Direction.DOWN,
      [Direction.DOWN]: Direction.UP,
      [Direction.LEFT]: Direction.RIGHT,
      [Direction.RIGHT]: Direction.LEFT,
   } as const;

   const seen = new Set();
   const heatAry: [x: number, y: number, s: number, d: Direction][][] = Array.from(
      new Array(1000),
      () => [],
   );
   heatAry[0] = [
      [0, 0, 0, Direction.DOWN],
      [0, 0, 0, Direction.RIGHT],
   ];
   let cH = 0;
   xdd: while (true) {
      for (const h of heatAry[cH] ?? []) {
         if (h[0] === maxX - 1 && h[1] === maxY - 1) break xdd;
         for (const d of directions) {
            if (skippo[h[3]] === d[2]) continue;
            const nX = h[0] + d[0];
            const nY = h[1] + d[1];
            const nS = h[3] === d[2] ? h[2] + 1 : 1;

            if (h[3] !== d[2] && h[2] < minTurn) continue;
            if (nS > maxStep || nX < 0 || nX >= maxX || nY < 0 || nY >= maxY) continue;

            const key = nX.toString() + ',' + nY.toString() + nS.toString() + d[2].toString();
            if (seen.has(key)) continue;
            seen.add(key);

            const nH = cH + grid[nY][nX];
            heatAry[nH] ||= [];
            heatAry[nH].push([nX, nY, nS, d[2]]);
         }
      }
      cH++;
      // if (cH > 100000) break; // because while loop sucks
   }

   return cH;
}

function part1(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((str) => str.split('').map(Number));
   return sendhelp(grid, 0, 3).toString();
}

function part2(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((str) => str.split('').map(Number));
   return sendhelp(grid, 4, 10).toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
