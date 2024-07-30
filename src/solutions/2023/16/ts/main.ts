import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function dothething(
   grid: string[],
   start: [x: number, y: number, direction: 'U' | 'D' | 'L' | 'R'],
) {
   const visited: Set<string>[][] = new Array(grid.length);
   for (let i = 0; i < grid.length; i++) {
      visited[i] = new Array(grid[0].length);
      for (let j = 0; j < grid[0].length; j++) visited[i][j] = new Set<string>();
   }

   const queue: [number, number, 'U' | 'D' | 'L' | 'R'][] = [start];
   while (queue.length) {
      const curr = queue.pop()!;

      const _x = curr[0];
      const _y = curr[1];
      const _dir = curr[2];

      if (_x < 0 || _x === grid[0].length) continue;
      if (_y < 0 || _y === grid.length) continue;

      const key = curr.toString();
      if (visited[_y][_x].has(key)) continue;
      visited[_y][_x].add(key);

      switch (grid[_y][_x]) {
         case '|':
            if (_dir === 'L' || _dir === 'R') queue.push([_x, _y - 1, 'U'], [_x, _y + 1, 'D']);
            if (_dir === 'U') queue.push([_x, _y - 1, _dir]);
            if (_dir === 'D') queue.push([_x, _y + 1, _dir]);
            break;
         case '-':
            if (_dir === 'U' || _dir === 'D') queue.push([_x - 1, _y, 'L'], [_x + 1, _y, 'R']);
            if (_dir === 'L') queue.push([_x - 1, _y, _dir]);
            if (_dir === 'R') queue.push([_x + 1, _y, _dir]);
            break;
         case '/':
            if (_dir === 'U') queue.push([_x + 1, _y, 'R']);
            if (_dir === 'D') queue.push([_x - 1, _y, 'L']);
            if (_dir === 'L') queue.push([_x, _y + 1, 'D']);
            if (_dir === 'R') queue.push([_x, _y - 1, 'U']);
            break;
         case '\\':
            if (_dir === 'U') queue.push([_x - 1, _y, 'L']);
            if (_dir === 'D') queue.push([_x + 1, _y, 'R']);
            if (_dir === 'L') queue.push([_x, _y - 1, 'U']);
            if (_dir === 'R') queue.push([_x, _y + 1, 'D']);
            break;
         default:
            switch (_dir) {
               case 'U':
                  queue.push([_x, _y - 1, _dir]);
                  break;
               case 'D':
                  queue.push([_x, _y + 1, _dir]);
                  break;
               case 'L':
                  queue.push([_x - 1, _y, _dir]);
                  break;
               case 'R':
                  queue.push([_x + 1, _y, _dir]);
                  break;
            }
      }
   }
   return visited.reduce((pv, v) => pv + v.filter((e) => e.size).length, 0);
}

function part1(input: string, _isTest: boolean): string {
   const grid = input.split('\n');
   return dothething(grid, [0, 0, 'R']).toString();
}

function part2(input: string, _isTest: boolean): string {
   const grid = input.split('\n');
   let max = 0;
   for (let y = 0; y < grid.length; y++) {
      max = Math.max(
         dothething(grid, [0, y, 'R']),
         dothething(grid, [grid[y].length - 1, y, 'L']),
         max,
      );
   }
   for (let x = 0; x < grid[0].length; x++) {
      max = Math.max(
         dothething(grid, [x, 0, 'D']),
         dothething(grid, [x, grid.length - 1, 'U']),
         max,
      );
   }

   return max.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
