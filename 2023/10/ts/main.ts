import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = true;

function findStart(grid: string[] | string[][]): [x: number, y: number] {
   let x, y;
   for (y = 0; y < grid.length; y++) {
      x = grid[y].indexOf('S');
      if (x !== -1) return [x, y];
   }
   throw new Error("Couldn't find starting point");
}

function goUp(grid: string[] | string[][], x: number, y: number, criteria = 'S7F|') {
   return y > 0 && criteria.includes(grid[y - 1][x]);
}

function goDown(grid: string[] | string[][], x: number, y: number, criteria = 'SLJ|') {
   return y < grid.length - 1 && criteria.includes(grid[y + 1][x]);
}

function goLeft(grid: string[] | string[][], x: number, y: number, criteria = 'SLF-') {
   return x > 0 && criteria.includes(grid[y][x - 1]);
}

function goRight(grid: string[] | string[][], x: number, y: number, criteria = 'S7J-') {
   return x < grid[y].length - 1 && criteria.includes(grid[y][x + 1]);
}

function lookUp(
   grid: string[] | string[][],
   x: number,
   y: number,
   criteria?: string,
): [number, number][] {
   const char = grid[y][x];
   const res: [number, number][] = [];
   switch (char) {
      case '|':
         if (goUp(grid, x, y, criteria)) res.push([x, y - 1]);
         if (goDown(grid, x, y, criteria)) res.push([x, y + 1]);
         break;
      case '-':
         if (goLeft(grid, x, y, criteria)) res.push([x - 1, y]);
         if (goRight(grid, x, y, criteria)) res.push([x + 1, y]);
         break;
      case 'L':
         if (goUp(grid, x, y, criteria)) res.push([x, y - 1]);
         if (goRight(grid, x, y, criteria)) res.push([x + 1, y]);
         break;
      case 'J':
         if (goUp(grid, x, y, criteria)) res.push([x, y - 1]);
         if (goLeft(grid, x, y, criteria)) res.push([x - 1, y]);
         break;
      case '7':
         if (goDown(grid, x, y, criteria)) res.push([x, y + 1]);
         if (goLeft(grid, x, y, criteria)) res.push([x - 1, y]);
         break;
      case 'F':
         if (goDown(grid, x, y, criteria)) res.push([x, y + 1]);
         if (goRight(grid, x, y, criteria)) res.push([x + 1, y]);
         break;
      case 'S':
         if (goUp(grid, x, y, criteria)) res.push([x, y - 1]);
         if (goDown(grid, x, y, criteria)) res.push([x, y + 1]);
         if (goLeft(grid, x, y, criteria)) res.push([x - 1, y]);
         if (goRight(grid, x, y, criteria)) res.push([x + 1, y]);
         break;
      default:
         throw new Error('ayo wtf?');
   }
   return res;
}

export function part1(input: string, _isTest: boolean): string {
   const grid = input.split('\n');
   const visited = new Array(grid.length).fill(0).map((_) => new Array(grid.length).fill(false));

   const location = findStart(grid);

   let i = 0;
   const queue = [location];
   while (queue.length) {
      const current = queue.shift()!;
      const found = lookUp(grid, current[0], current[1]);
      for (const f of found) {
         if (visited[f[1]][f[0]]) continue;
         visited[f[1]][f[0]] = true;
         queue.push(f);
         i++;
      }
   }

   return (i / 2).toString();
}

export function part2(input: string, _isTest: boolean): string {
   const grid = input.split('\n').map((str) => str.split(''));
   const visited: boolean[][] = new Array(grid.length * 3)
      .fill(0)
      .map((_) => new Array(grid[0].length * 3).fill(false));

   const location = findStart(grid);

   let queue: [number, number][] = [location];
   while (queue.length) {
      const newQ = [];
      while (queue.length) {
         const current = queue.pop()!;
         const found = lookUp(grid, current[0], current[1]);
         for (const f of found) {
            visited[f[1] * 3 + 1 + current[1] - f[1]][f[0] * 3 + 1 + current[0] - f[0]] = true;
            if (visited[f[1] * 3 + 1][f[0] * 3 + 1]) continue;
            visited[f[1] * 3 + 1][f[0] * 3 + 1] = true;
            newQ.push(f);
         }
      }
      queue = newQ;
   }

   queue = [[0, 0]];

   // flood fill that shit with bfs with space
   while (queue.length) {
      const newQ: [number, number][] = [];
      while (queue.length) {
         const current = queue.pop()!;
         if (visited[current[1]][current[0]]) continue;
         visited[current[1]][current[0]] = true;
         for (let ud = -1; ud < 2; ud++) {
            for (let lr = -1; lr < 2; lr++) {
               if (current[1] + ud < 0 || current[1] + ud >= visited.length) continue;
               if (current[0] + lr < 0 || current[0] + lr >= visited[0].length) continue;
               if (visited[current[1] + ud][current[0] + lr]) continue;
               newQ.push([current[0] + lr, current[1] + ud]);
            }
         }
      }
      queue = newQ;
   }

   // check result
   let res = 0;
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) if (!visited[1 + y * 3][1 + x * 3]) res++;
   }

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
