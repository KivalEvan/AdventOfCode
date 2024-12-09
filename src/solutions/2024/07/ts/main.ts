import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function recurseOut(
   calculated: number,
   values: number[],
   i: number,
   p2: boolean,
): boolean {
   if (calculated < 0) return false;
   if (!i) {
      return calculated === values[0];
   }

   const stuff = 10 ** (Math.floor(Math.log10(values[i])) + 1);
   return (
      (calculated % values[i] === 0 &&
         recurseOut(calculated / values[i], values, i - 1, p2)) ||
      (p2 &&
         calculated % stuff === values[i] &&
         recurseOut(Math.floor(calculated / stuff), values, i - 1, p2)) ||
      recurseOut(calculated - values[i], values, i - 1, p2)
   );
}

function solve(input: string, p2: boolean) {
   let sum = 0;
   input.split('\n').forEach((line) => {
      const nums = line.split(': ').map((line) => line.split(' ').map(Number));

      if (recurseOut(nums[0][0], nums[1], nums[1].length - 1, p2)) {
         sum += nums[0][0];
      }
   });

   return sum.toString();
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
