import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

export const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

// a is 1 so we dont need it
// (-b +- sqrt(b**2 + 4 * a * c)) / 2 * a
function ohnomath(b: number, c: number, pepsilon = 0.001) {
   const min = Math.floor((b + Math.sqrt(b * b - 4 * c)) / 2 - pepsilon);
   const max = Math.ceil((b - Math.sqrt(b * b - 4 * c)) / 2 + pepsilon);
   return min - max + 1;
}

export function part1(input: string, _isTest: boolean): string {
   const td = input.split('\n').map((str) => str.split(':')[1].trim().split(/\s+/).map(Number));
   let res = 1;
   for (let i = 0; i < td[0].length; i++) res *= ohnomath(td[0][i], td[1][i]);
   return res.toString();
}

export function part2(input: string, _isTest: boolean): string {
   const td = input
      .split('\n')
      .map((str) => Number(str.split(':')[1].trim().split(/\s+/).join('')));
   return ohnomath(td[0], td[1]).toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
