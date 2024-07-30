import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const direction = [
   [0, -1, '^'],
   [0, 1, 'v'],
   [-1, 0, '<'],
   [1, 0, '>'],
] as const;

function parseInput(input: string) {
   const grid = input.split('\n');
   const dest: [number, number, number, boolean, string] = [
      1,
      0,
      0,
      false,
      '1,0',
   ];
   const end = [grid[0].length - 2, grid.length - 1];
   const graph: Record<
      string,
      { edge: Record<string, number>; next: Record<string, number> }
   > = {
      '1,0': { edge: {}, next: {} },
   };

   let queue = [dest];
   const visited = new Set();
   while (queue.length) {
      const newQ: [number, number, number, boolean, string][] = [];
      while (queue.length) {
         const pos = queue.shift()!;
         for (const dir of direction) {
            const x = pos[0] + dir[0];
            const y = pos[1] + dir[1];

            if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
               continue;
            }
            if (grid[y][x] === '#') continue;
            if (pos[3] && grid[y][x] !== dir[2] && grid[y][x] !== '.') continue;

            const key = x.toString() + ',' + y.toString();
            if (
               (grid[pos[1]][pos[0]] === dir[2] && !pos[3]) ||
               (pos[1] === end[1] && pos[0] === end[0])
            ) {
               graph[key] ||= { edge: {}, next: {} };
               graph[pos[4]].next[key] = pos[2];
               graph[pos[4]].edge[key] = pos[2];
               graph[key].edge[pos[4]] = pos[2];
            }

            if (visited.has(key)) continue;
            visited.add(key);

            if (grid[pos[1]][pos[0]] === dir[2]) {
               if (pos[3]) {
                  newQ.push([
                     x,
                     y,
                     pos[3] ? pos[2] + 1 : 0,
                     !pos[3],
                     pos[3] ? pos[4] : key,
                  ]);
               } else newQ.push([x, y, 1, true, key]);
            } else {
               newQ.push([x, y, pos[2] + 1, pos[3], pos[4]]);
            }
         }
      }
      queue = newQ;
   }

   return graph;
}

function part1(input: string, _isTest: boolean): string {
   const graph = parseInput(input);

   function recursiveMax(key: string): number {
      const curr = graph[key];
      let max = 0;
      for (const k in curr.next) {
         max = Math.max(max, curr.next[k] + recursiveMax(k));
      }
      return max;
   }
   const maxDist = recursiveMax('1,0');
   return maxDist.toString();
}

function part2(input: string, _isTest: boolean): string {
   const graph = parseInput(input);

   function recursiveMax(
      key: string,
      visited: Record<string, boolean>,
   ): number {
      const curr = graph[key];
      let max = 0;
      for (const k in curr.edge) {
         if (visited[k]) continue;
         visited[k] = true;
         max = Math.max(max, curr.edge[k] + recursiveMax(k, visited));
         visited[k] = false;
      }
      return max;
   }
   const visit: Record<string, boolean> = {};
   for (const k in graph) visit[k] = false;
   const maxDist = recursiveMax('1,0', visit);
   return maxDist.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
