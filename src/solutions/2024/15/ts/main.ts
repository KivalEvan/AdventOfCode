import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function getStart(grid: string[][]): [number, number] {
   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === "@") {
            return [x, y];
         }
      }
   }
   throw new Error("Start not found");
}

function getDirection(direction: string): [number, number] {
   switch (direction) {
      case "^":
         return [0, -1];
      case ">":
         return [1, 0];
      case "v":
         return [0, 1];
      case "<":
         return [-1, 0];
      default:
         throw new Error("Invalid direction");
   }
}

function solve(input: string, p2: boolean): string {
   const split = input.split("\n\n");
   const directions = split[1].split("\n").join("");

   let total = 0;
   const grid = split[0].split("\n").map((line) =>
      line
         .split("")
         .map((e) => {
            if (p2) {
               if (e === "O") {
                  return "[]";
               }
               if (e === "@") {
                  return "@.";
               }
               return e.repeat(2);
            }
            return e;
         })
         .join("")
         .split("")
   );
   let [startX, startY] = getStart(grid);
   main: for (const d of directions) {
      const [dx, dy] = getDirection(d);
      const [nextX, nextY] = [startX + dx, startY + dy];

      if (grid[nextY][nextX] === ".") {
         grid[startY][startX] = ".";
         grid[nextY][nextX] = "@";
         startX = nextX;
         startY = nextY;
         continue;
      }

      if (grid[nextY][nextX] === "#") {
         continue;
      }

      if (grid[nextY][nextX] === "O") {
         let [oX, oY] = [nextX, nextY];
         while (grid[oY][oX] === "O") {
            oY += dy;
            oX += dx;
         }
         if (grid[oY][oX] === "#") {
            continue;
         }
         grid[startY][startX] = ".";
         grid[nextY][nextX] = "@";
         grid[oY][oX] = "O";
         startX = nextX;
         startY = nextY;
      }

      if (grid[nextY][nextX] === "[" || grid[nextY][nextX] === "]") {
         const toPush: [number, number][] = [];
         const visited = new Set<string>();

         const queue: [number, number][] = [[nextX, nextY]];
         while (queue.length) {
            const [x, y] = queue.pop()!;
            if (grid[y][x] === "#") {
               continue main;
            }
            if (grid[y][x] === "." || visited.has(`${x},${y}`)) {
               continue;
            }
            if (grid[y][x] === "]") {
               queue.push([x + dx, y + dy]);
               queue.push([x - 1, y]);
               visited.add(`${x},${y}`);
            }
            if (grid[y][x] === "[") {
               queue.push([x + dx, y + dy]);
               queue.push([x + 1, y]);
               toPush.push([x, y]);
               visited.add(`${x},${y}`);
            }
         }

         if (d === ">") {
            toPush.sort((a, b) => b[0] - a[0]);
         }
         if (d === "v") {
            toPush.sort((a, b) => b[1] - a[1]);
         }
         if (d === "<") {
            toPush.sort((a, b) => a[0] - b[0]);
         }
         if (d === "^") {
            toPush.sort((a, b) => a[1] - b[1]);
         }
         toPush.forEach(([x, y]) => {
            if (d === "^") {
               grid[y][x + 1] = ".";
            }
            if (d === "v") {
               grid[y][x + 1] = ".";
            }
            grid[y][x] = ".";
            grid[y + dy][x + 1 + dx] = "]";
            grid[y + dy][x + dx] = "[";
         });
         grid[startY][startX] = ".";
         grid[nextY][nextX] = "@";
         startX = nextX;
         startY = nextY;
      }
   }
   // if (p2) console.log(grid.map((line) => line.join('')).join('\n'));

   for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
         if (grid[y][x] === "O" || grid[y][x] === "]") {
            total += y * 100 + (p2 ? x - 1 : x);
         }
      }
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
