import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

export function part1(input: string): string {
   const max = input.split('\n\n').map((s) =>
      s
         .split('\n')
         .map(Number)
         .reduce((pv, v) => pv + v, 0)
   );
   return Math.max(...max).toString();
}

export function part2(input: string): string {
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
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
