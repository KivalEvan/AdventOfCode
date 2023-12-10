import { run } from 'utils/run.ts';

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

function goUp(
   grid: string[] | string[][],
   location: [number, number],
   _MAX_X: number,
   _MAX_Y: number,
   criteria = '7F|'
) {
   const [x, y] = location;
   return y > 0 && criteria.includes(grid[y - 1][x]);
}

function goDown(
   grid: string[] | string[][],
   location: [number, number],
   _MAX_X: number,
   MAX_Y: number,
   criteria = 'LJ|'
) {
   const [x, y] = location;
   return y < MAX_Y - 1 && criteria.includes(grid[y + 1][x]);
}

function goLeft(
   grid: string[] | string[][],
   location: [number, number],
   _MAX_X: number,
   _MAX_Y: number,
   criteria = 'LF-'
) {
   const [x, y] = location;
   return x > 0 && criteria.includes(grid[y][x - 1]);
}

function goRight(
   grid: string[] | string[][],
   location: [number, number],
   MAX_X: number,
   _MAX_Y: number,
   criteria = '7J-'
) {
   const [x, y] = location;
   return x < MAX_X - 1 && criteria.includes(grid[y][x + 1]);
}

function lookUp(
   grid: string[] | string[][],
   location: [number, number],
   MAX_X: number,
   MAX_Y: number,
   criteria?: string
): [number, number][] {
   const [x, y] = location;
   const char = grid[y][x];
   const res: [number, number][] = [];
   switch (char) {
      case '|':
         if (goUp(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y - 1]);
         if (goDown(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y + 1]);
         break;
      case '-':
         if (goLeft(grid, location, MAX_X, MAX_Y, criteria)) res.push([x - 1, y]);
         if (goRight(grid, location, MAX_X, MAX_Y, criteria)) res.push([x + 1, y]);
         break;
      case 'L':
         if (goUp(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y - 1]);
         if (goRight(grid, location, MAX_X, MAX_Y, criteria)) res.push([x + 1, y]);
         break;
      case 'J':
         if (goUp(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y - 1]);
         if (goLeft(grid, location, MAX_X, MAX_Y, criteria)) res.push([x - 1, y]);
         break;
      case '7':
         if (goDown(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y + 1]);
         if (goLeft(grid, location, MAX_X, MAX_Y, criteria)) res.push([x - 1, y]);
         break;
      case 'F':
         if (goDown(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y + 1]);
         if (goRight(grid, location, MAX_X, MAX_Y, criteria)) res.push([x + 1, y]);
         break;
      case 'S':
         if (goUp(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y - 1]);
         if (goDown(grid, location, MAX_X, MAX_Y, criteria)) res.push([x, y + 1]);
         if (goLeft(grid, location, MAX_X, MAX_Y, criteria)) res.push([x - 1, y]);
         if (goRight(grid, location, MAX_X, MAX_Y, criteria)) res.push([x + 1, y]);
         break;
      case '.':
         if (goUp(grid, location, MAX_X, MAX_Y, '.')) res.push([x, y - 1]);
         if (goDown(grid, location, MAX_X, MAX_Y, '.')) res.push([x, y + 1]);
         if (goLeft(grid, location, MAX_X, MAX_Y, '.')) res.push([x - 1, y]);
         if (goRight(grid, location, MAX_X, MAX_Y, '.')) res.push([x + 1, y]);
         break;
      default:
         throw new Error('ayo wtf?');
   }
   return res;
}

export function part1(input: string): string {
   const grid = input.split('\n');
   const MAX_X = grid[0].length;
   const MAX_Y = grid.length;

   const location = findStart(grid);

   let queue = [location];
   const visited = new Set([location.toString()]);

   let i = -1;
   while (queue.length) {
      const newQ = [];
      while (queue.length) {
         const current = queue.pop()!;
         const found = lookUp(grid, current, MAX_X, MAX_Y);
         for (const f of found) {
            const serial = f.toString();
            if (visited.has(serial)) continue;
            visited.add(serial);
            newQ.push(f);
         }
      }
      queue = newQ;
      i++;
   }

   return i.toString();
}

export function part2(input: string): string {
   const grid = input.split('\n').map((str) => str.split(''));
   const MAX_X = grid[0].length;
   const MAX_Y = grid.length;

   const grid3x = new Array(MAX_Y * 3);
   for (let y = 0; y < MAX_Y * 3; y++) grid3x[y] = new Array(MAX_X * 3).fill('.');

   const location = findStart(grid);

   let queue = [location];
   let visited = new Set([location.toString()]);

   // mark the loop
   let i = -1;
   while (queue.length) {
      const newQ = [];
      while (queue.length) {
         const current = queue.pop()!;
         const found = lookUp(grid, current, MAX_X, MAX_Y);
         for (const f of found) {
            const serial = f.toString();
            if (visited.has(serial)) continue;
            visited.add(serial);
            newQ.push(f);
         }
      }
      queue = newQ;
      i++;
   }

   // fuck the not loop and put it in grid3x
   for (let y = 0; y < MAX_Y; y++) {
      for (let x = 0; x < MAX_X; x++) {
         if (!visited.has(`${x},${y}`)) grid[y][x] = '.';
         grid3x[1 + y * 3][1 + x * 3] = grid[y][x];
         if (grid3x[1 + y * 3][1 + x * 3] === '.') continue;
         const found = lookUp(grid3x, [1 + x * 3, 1 + y * 3], MAX_X * 3, MAX_Y * 3, '.');
         for (const f of found) grid3x[f[1]][f[0]] = '#';
      }
   }

   queue = [[0, 0]];
   visited = new Set([[0, 0].toString()]);

   // flood fill that shit with bfs with space
   while (queue.length) {
      const newQ = [];
      while (queue.length) {
         const current = queue.pop()!;
         const found = lookUp(grid3x, current, MAX_X * 3, MAX_Y * 3);
         for (const f of found) {
            const serial = f.toString();
            if (visited.has(serial)) continue;
            visited.add(serial);
            newQ.push(f);
         }
         grid3x[current[1]][current[0]] = ' ';
      }
      queue = newQ;
   }

   // check result
   let res = 0;
   for (let y = 0; y < MAX_Y; y++)
      for (let x = 0; x < MAX_X; x++) if (grid3x[1 + y * 3][1 + x * 3] === '.') res++;

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
