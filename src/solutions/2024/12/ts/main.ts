import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

const direction = [
   [0, -1],
   [0, 1],
   [-1, 0],
   [1, 0],
];

function solve(input: string, p2: boolean): string {
   const grid = input.split("\n");
   const visited: boolean[][] = grid.map(() => new Array(grid[0].length).fill(false));
   const perimeters = [];
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (visited[y][x]) continue;
         const char = grid[y][x];
         const localVisited: boolean[][] = grid.map(() => new Array(grid[0].length).fill(false));
         const queue = [[x, y]];
         let count = 0;
         let perimeter = 0;
         while (queue.length > 0) {
            const [x, y] = queue.shift()!;
            if (localVisited[y][x]) {
               continue;
            }
            count++;
            perimeter += 4;
            visited[y][x] = true;
            localVisited[y][x] = true;
            for (const [dx, dy] of direction) {
               const newX = x + dx;
               const newY = y + dy;
               if (
                  newX < 0
                  || newX >= grid[0].length
                  || newY < 0
                  || newY >= grid.length
               ) {
                  continue;
               }
               if (grid[newY][newX] === char) {
                  queue.push([newX, newY]);
                  perimeter--;
               }
            }
         }
         let side = 0;
         if (p2) {
            const localVisited2 = new Set();
            for (let ny = 0; ny < localVisited.length; ny++) {
               for (let nx = 0; nx < localVisited[ny].length; nx++) {
                  if (!localVisited[ny][nx]) continue;
                  for (const [dx, dy] of direction) {
                     if (localVisited2.has(`${nx},${ny},${dx},${dy}`)) continue;
                     localVisited2.add(`${nx},${ny},${dx},${dy}`);

                     // we found the side bros
                     if (!localVisited[ny + dy]?.[nx + dx]) {
                        side++;
                        localVisited2.add(`${nx},${ny},${dx},${dy}`);
                        let locX = nx + dy;
                        let locY = ny + dx;
                        let ddx = dy;
                        let ddy = dx;
                        while (
                           localVisited[locY]?.[locX]
                           && !localVisited[locY + dy]?.[locX + dx]
                        ) {
                           localVisited2.add(`${locX},${locY},${dx},${dy}`);
                           locX += ddx;
                           locY += ddy;
                        }
                        locX = nx - dy;
                        locY = ny - dx;
                        ddx = -dy;
                        ddy = -dx;
                        while (
                           localVisited[locY]?.[locX]
                           && !localVisited[locY + dy]?.[locX + dx]
                        ) {
                           localVisited2.add(`${locX},${locY},${dx},${dy}`);
                           locX += ddx;
                           locY += ddy;
                        }
                     }
                  }
               }
            }
         }
         perimeters.push([count, perimeter, side]);
      }
   }

   let total = 0;
   for (const [c, p, s] of perimeters) {
      if (p2) total += c * s;
      else total += c * p;
   }
   return total.toString();
}

function part1(input: string, _isTest: boolean): string {
   return solve(input, false);
}

function part2(input: string, _isTest: boolean): string {
   return solve(input, true);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
