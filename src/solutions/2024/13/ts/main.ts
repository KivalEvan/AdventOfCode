import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function cramer(machine: [x: bigint, y: bigint][]): bigint {
   const [aX, aY] = machine[0];
   const [bX, bY] = machine[1];
   const [pX, pY] = machine[2];

   const d = aX * bY - aY * bX;
   const dx = bY * pX - bX * pY;
   const dy = aX * pY - aY * pX;

   if (d === 0n || dx % d !== 0n || dy % d !== 0n) {
      return 0n;
   }

   return 3n * (dx / d) + dy / d;
}

function solve(input: string, p2: boolean): string {
   const machines: [x: bigint, y: bigint][][] = input
      .split("\n\n")
      .map((line) => {
         const [btnAX, btnAY, btnBX, btnBY, prizeX, prizeY] = line
            .match(/\d+/g)!
            .map(BigInt);
         return [
            [btnAX, btnAY],
            [btnBX, btnBY],
            [prizeX, prizeY],
         ];
      });
   if (p2) {
      machines.forEach((prize) => {
         prize[2][0] += 10000000000000n;
         prize[2][1] += 10000000000000n;
      });
   }

   let total = 0n;
   for (const machine of machines) {
      total += cramer(machine);
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
