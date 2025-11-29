import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function rollover(num: number, max: number) {
   return ((num % max) + max) % max;
}

function getQuadrants(
   x: number,
   y: number,
   offsetX: number,
   offsetY: number,
): number {
   if (x >= offsetX && y >= offsetY) return 0;
   if (x < offsetX && y >= offsetY) return 1;
   if (x < offsetX && y < offsetY) return 2;
   if (x >= offsetX && y < offsetY) return 3;
   return 0;
}

function modularMultiplicativeInverse(a: number, modulus: number) {
   const b = a % modulus;

   for (let hipothesis = 1; hipothesis <= modulus; hipothesis++) {
      if ((b * hipothesis) % modulus == 1) return hipothesis;
   }
   return 1;
}

function chineseRemainderTheorem(remainders: number[], modules: number[]) {
   const prod = modules.reduce((acc, val) => acc * val, 1);

   return (
      modules.reduce((sum, mod, index) => {
         const p = prod / mod;
         return (
            sum + remainders[index] * modularMultiplicativeInverse(p, mod) * p
         );
      }, 0) % prod
   );
}

function solve(input: string, p2: boolean, isTest: boolean): string {
   const robots = input.split("\n").map((line) => {
      const [pX, pY, vX, vY] = line.match(/-?\d+/g)!.map(Number);
      return [
         [pX, pY],
         [vX, vY],
      ];
   });

   const maxX = isTest ? 11 : 101;
   const maxY = isTest ? 7 : 103;
   if (p2) {
      let sec = 0;
      let xPattern = 0;
      let yPattern = 0;
      const max = Math.max(maxX, maxY);
      while (sec < max) {
         sec++;
         let totalX = 0;
         let totalY = 0;
         for (const robot of robots) {
            const [pos, vel] = robot;
            pos[0] = rollover(pos[0] + vel[0], maxX);
            pos[1] = rollover(pos[1] + vel[1], maxY);
            totalX += pos[0];
            totalY += pos[1];
         }

         const meanX = totalX / robots.length;
         const meanY = totalY / robots.length;
         let varianceX = 0;
         let varianceY = 0;
         for (const robot of robots) {
            const [pos, _] = robot;
            varianceX += (pos[0] - meanX) ** 2;
            varianceY += (pos[1] - meanY) ** 2;
         }

         if (varianceX < 250000) {
            xPattern = sec;
         }
         if (varianceY < 250000) {
            yPattern = sec;
         }

         if (xPattern > 0 && yPattern > 0) {
            break;
         }
      }

      return chineseRemainderTheorem(
         [xPattern, yPattern],
         [maxX, maxY],
      ).toString();
   }

   const quadrants: number[] = [0, 0, 0, 0];
   for (const robot of robots) {
      const [pos, vel] = robot;
      pos[0] = rollover(pos[0] + vel[0] * 100, maxX);
      pos[1] = rollover(pos[1] + vel[1] * 100, maxY);

      if (pos[0] === Math.floor(maxX / 2) || pos[1] === Math.floor(maxY / 2)) {
         continue;
      }

      quadrants[getQuadrants(pos[0], pos[1], maxX / 2, maxY / 2)]++;
   }

   return quadrants.reduce((p, v) => p * v, 1).toString();
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
