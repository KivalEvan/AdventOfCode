import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

export const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const direction = [
   [1, 0],
   [-1, 0],
   [0, 1],
   [0, -1],
];

export function part1(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((str) => str.split(''));
   const startPos: [number, number] = [0, 0];
   main: for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
         if (grid[y][x] === 'S') {
            startPos[0] = x;
            startPos[1] = y;
            grid[y][x] = '.';
            break main;
         }
      }
   }

   const MAX_STEP = 64;
   const count_condition = MAX_STEP % 2;
   let count = 0;
   let queue: [number, number][] = [startPos];
   const visited = new Set();
   for (let step = 0; step < MAX_STEP; step++) {
      const newQ: [number, number][] = [];
      while (queue.length) {
         const pos = queue.pop()!;
         for (const dir of direction) {
            const destX = pos[0] + dir[0];
            const destY = pos[1] + dir[1];

            if (
               destX < 0 ||
               destX >= grid[0].length ||
               destY < 0 ||
               destY >= grid.length
            ) {
               continue;
            }

            if (grid[destY][destX] === '.') {
               const key = destX + ',' + destY;
               if (visited.has(key)) continue;
               visited.add(key);

               if (step % 2 !== count_condition) count++;
               newQ.push([destX, destY]);
            }
         }
      }
      queue = newQ;
   }

   return count.toString();
}

function wrapAround(x: number, m: number) {
   return ((x % m) + m) % m;
}

export function part2(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((str) => str.split(''));
   const startPos: [number, number] = [0, 0];
   main: for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
         if (grid[y][x] === 'S') {
            startPos[0] = x;
            startPos[1] = y;
            grid[y][x] = '.';
            break main;
         }
      }
   }

   let evens = 0;
   let odds = 0;
   let prevOdds = new Set<string>();
   let prevEvens = new Set<string>();
   const stack = [startPos];
   let step;
   for (step = 0; step < 26501365; step++) {
      const newSpot = new Set<string>();
      const prevSpot = step % 2 ? prevOdds : prevEvens;

      while (stack.length) {
         const st = stack.pop()!;
         for (const dir of direction) {
            const destX = st[0] + dir[0];
            const destY = st[1] + dir[1];

            if (
               grid[wrapAround(destY, grid.length)][
                  wrapAround(destX, grid[0].length)
               ] === '.'
            ) {
               const pos = destX + ',' + destY;
               if (prevSpot.has(pos)) continue;
               newSpot.add(pos);
            }
         }
      }

      // console.log([...prevSpot]);
      if (step % 2) {
         evens += newSpot.size;
         prevOdds = newSpot;
      } else {
         odds += newSpot.size;
         prevEvens = newSpot;
      }
      for (const s of newSpot.values()) {
         stack.push(s.split(',').map(Number) as [number, number]);
      }
      // console.log(newSpot.size, stack);
   }

   return (step % 2 ? odds : evens).toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
