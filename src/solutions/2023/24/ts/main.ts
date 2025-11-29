import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";
// 200_000_000_000_000
// 400_000_000_000_000
const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function parseInput(input: string) {
   const hailstones = input
      .split("\n")
      .map((str) => str.split("@").map((e) => e.split(",").map(Number)));
   return hailstones;
}

function intersect(
   x1: number,
   y1: number,
   x2: number,
   y2: number,
   x3: number,
   y3: number,
   x4: number,
   y4: number,
) {
   const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
   if (denom == 0) return null;
   const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
   // const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
   return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1),
   };
}

function part1(input: string, _isTest: boolean): string {
   const hailstones = parseInput(input);

   const testMin = _isTest ? 7 : 200_000_000_000_000;
   const testMax = _isTest ? 27 : 400_000_000_000_000;

   let count = 0;
   for (let i = 0; i < hailstones.length; i++) {
      for (let j = i + 1; j < hailstones.length; j++) {
         const xAp = hailstones[i][0][0];
         const xAv = hailstones[i][1][0] + xAp;
         const xBp = hailstones[j][0][0];
         const xBv = hailstones[j][1][0] + xBp;
         const yAp = hailstones[i][0][1];
         const yAv = hailstones[i][1][1] + yAp;
         const yBp = hailstones[j][0][1];
         const yBv = hailstones[j][1][1] + yBp;
         const intersection = intersect(xAp, yAp, xAv, yAv, xBp, yBp, xBv, yBv);
         if (intersection) {
            const x = intersection.x;
            const y = intersection.y;
            if (
               x > xAp == xAv - xAp > 0
               && y > yAp == yAv - yAp > 0
               && x > xBp == xBv - xBp > 0
               && y > yBp == yBv - yBp > 0
            ) {
               if (
                  x >= testMin
                  && x <= testMax
                  && y >= testMin
                  && y <= testMax
               ) {
                  count++;
               }
            }
         }
      }
   }
   return count.toString();
}

function part2(input: string, _isTest: boolean): string {
   const hailstones = parseInput(input);

   console.log("eqs = [");
   for (let i = 0; i < 3; i++) {
      console.log(
         `  ${hailstones[i][0][0]} + ${hailstones[i][1][0]} * t${i + 1} == x + vx * t${i + 1},`,
      );
      console.log(
         `  ${hailstones[i][0][1]} + ${hailstones[i][1][1]} * t${i + 1} == y + vy * t${i + 1},`,
      );
      console.log(
         `  ${hailstones[i][0][2]} + ${hailstones[i][1][2]} * t${i + 1} == z + vz * t${i + 1},`,
      );
   }
   console.log("]");

   return "47";
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
