import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

export const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

export function part1(input: string, _isTest: boolean): string {
   const max = input.split('\n\n').map((s) =>
      s
         .split('\n')
         .map(Number)
         .reduce((pv, v) => pv + v, 0)
   );
   return Math.max(...max).toString();
}

export function part2(input: string, _isTest: boolean): string {
   const max = input.split('\n\n').map((s) =>
      s
         .split('\n')
         .map(Number)
         .reduce((pv, v) => pv + v, 0)
   );
   max.sort((a, b) => b - a);
   return (max[0] + max[1] + max[2]).toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
