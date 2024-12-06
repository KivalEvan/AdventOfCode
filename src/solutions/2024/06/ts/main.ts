import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function findStart(grid: number[][]): { x: number; y: number } {
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === 2) {
            return { x, y };
         }
      }
   }
   throw new Error('Start not found');
}

function part1(input: string, _isTest: boolean): string {
   const grid: number[][] = [];
   grid.push(
      ...input.split('\n').map((str) =>
         [3].concat(
            str.split('').map((x) => (x === '#' ? 1 : x === '^' ? 2 : 0)),
            [3],
         )
      ),
   );
   grid.unshift(new Array(grid[0].length).fill(3));
   grid.push(new Array(grid[0].length).fill(3));
   const visited = grid.map(() => new Array(grid[0].length).fill(false));

   const location = findStart(grid);
   const direction = { x: 0, y: -1 };

   while (true) {
      visited[location.y][location.x] = true;
      const xNext = location.x + direction.x;
      const yNext = location.y + direction.y;

      if (grid[yNext][xNext] === 3) {
         break;
      }

      if (grid[yNext][xNext] === 1) {
         if (direction.y === -1) {
            direction.x = 1;
            direction.y = 0;
         } else if (direction.x === 1) {
            direction.x = 0;
            direction.y = 1;
         } else if (direction.y === 1) {
            direction.x = -1;
            direction.y = 0;
         } else if (direction.x === -1) {
            direction.x = 0;
            direction.y = -1;
         }
      } else {
         location.x = xNext;
         location.y = yNext;
      }
   }
   return visited
      .flat()
      .filter((v) => v)
      .length.toString();
}

function part2(input: string, _isTest: boolean): string {
   const grid: number[][] = [];
   grid.push(
      ...input.split('\n').map((str) =>
         [3].concat(
            str.split('').map((x) => (x === '#' ? 1 : x === '^' ? 2 : 0)),
            [3],
         )
      ),
   );
   grid.unshift(new Array(grid[0].length).fill(3));
   grid.push(new Array(grid[0].length).fill(3));

   const visited = grid.map(() => new Array(grid[0].length).fill(false));
   const location = findStart(grid);
   const direction = { x: 0, y: -1 };

   const toVisit = [];
   while (true) {
      if (!visited[location.y][location.x]) {
         toVisit.push([location.x, location.y]);
      }
      visited[location.y][location.x] = true;
      const xNext = location.x + direction.x;
      const yNext = location.y + direction.y;

      if (grid[yNext][xNext] === 3) {
         break;
      }

      if (grid[yNext][xNext] === 1) {
         if (direction.y === -1) {
            direction.x = 1;
            direction.y = 0;
         } else if (direction.x === 1) {
            direction.x = 0;
            direction.y = 1;
         } else if (direction.y === 1) {
            direction.x = -1;
            direction.y = 0;
         } else if (direction.x === -1) {
            direction.x = 0;
            direction.y = -1;
         }
      } else {
         location.x = xNext;
         location.y = yNext;
      }
   }
   const maxVisit = toVisit.length * 2;

   const locationOg = findStart(grid);
   let count = 0;
   for (const v of toVisit) {
      const [x, y] = v;
      if (!visited[y][x] || grid[y][x] === 1 || grid[y][x] === 2) {
         continue;
      }

      grid[y][x] = 1;
      const location = { ...locationOg };
      const direction = { x: 0, y: -1 };
      let maxIteration = maxVisit;
      while (maxIteration) {
         const xNext = location.x + direction.x;
         const yNext = location.y + direction.y;

         if (grid[yNext][xNext] === 3) {
            break;
         }

         if (grid[yNext][xNext] === 1) {
            if (direction.y === -1) {
               direction.x = 1;
               direction.y = 0;
            } else if (direction.x === 1) {
               direction.x = 0;
               direction.y = 1;
            } else if (direction.y === 1) {
               direction.x = -1;
               direction.y = 0;
            } else if (direction.x === -1) {
               direction.x = 0;
               direction.y = -1;
            }
         } else {
            location.x = xNext;
            location.y = yNext;
         }
         maxIteration--;
      }
      if (maxIteration === 0) {
         count++;
      }
      grid[y][x] = 0;
   }
   return count.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
