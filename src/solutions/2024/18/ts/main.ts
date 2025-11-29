import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const direction = [
   [0, -1],
   [0, 1],
   [-1, 0],
   [1, 0],
];

function simulate(obs: string[], byt: number, isTest: boolean) {
   const obstacles = new Set(obs.slice(0, byt));
   const maxX = isTest ? 6 : 70;
   const maxY = isTest ? 6 : 70;

   // path find from 0, 0 to maxX, maxY
   const queue = [[0, 0, 0]];
   while (queue.length > 0) {
      const [x, y, s] = queue.shift()!;
      if (x === maxX && y === maxY) {
         return s.toString();
      }
      const key = `${x},${y}`;
      if (obstacles.has(key)) continue;
      obstacles.add(key);
      for (const d of direction) {
         const nx = x + d[0];
         const ny = y + d[1];
         if (nx < 0 || nx > maxX || ny < 0 || ny > maxY) continue;
         queue.push([nx, ny, s + 1]);
      }
   }

   return "";
}

function solve(input: string, p2: boolean, isTest: boolean): string {
   const obstacles = input.split("\n");
   if (p2) {
      for (let i = isTest ? 12 : 1024; i < obstacles.length; i++) {
         if (simulate(obstacles, i, isTest) === "") {
            return obstacles[i - 1];
         }
      }
   }
   return simulate(obstacles, isTest ? 12 : 1024, isTest);
}

function part1(input: string, isTest: boolean): string {
   return solve(input, false, isTest);
}

function part2(input: string, isTest: boolean): string {
   return solve(input, true, isTest);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
