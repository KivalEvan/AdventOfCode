import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

const direction = {
   U: [0, -1],
   D: [0, 1],
   L: [-1, 0],
   R: [1, 0],
} as const;

const numToDirection = {
   0: "R",
   1: "D",
   2: "L",
   3: "U",
} as const;

function parseInput(
   input: string,
   hex: boolean,
): ["U" | "D" | "L" | "R", number, number][] {
   return input.split("\n").map((str) => {
      const m = str.split(" ");
      return [
         hex ? numToDirection[m[2].at(-2) as "0"] : (m[0] as "U" | "D" | "L" | "R"),
         Number(m[1]),
         parseInt(m[2].slice(2, 7), 16),
      ];
   });
}

function tiemyshoelace(input: string, useHex: boolean) {
   const instructions = parseInput(input, useHex);
   let perimeter = 0;
   let area = 0;
   let x = 0,
      y = 0;

   for (const instruct of instructions) {
      const dist = useHex ? instruct[2] : instruct[1];
      const dir = direction[instruct[0]].map((e) => e * dist);

      const pX = x,
         pY = y;
      x += dir[0];
      y += dir[1];

      perimeter += dist;
      area += (pY + y) * (pX - x);
   }

   return Math.floor(perimeter / 2) + Math.floor(Math.abs(area / 2)) + 1;
}

function part1(input: string, _isTest: boolean): string {
   return tiemyshoelace(input, false).toString();
}

function part2(input: string, _isTest: boolean): string {
   return tiemyshoelace(input, true).toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
