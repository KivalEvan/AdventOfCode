import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

export function part1(input: string): string {
   return input
      .split('\n')
      .map((s) => {
         const [winNum, numIhaveIguess] = s
            .slice(s.indexOf(':') + 1)
            .split('|')
            .map((r) =>
               r
                  .split(' ')
                  .filter((e) => e !== '')
                  .map(Number)
            );
         let i = -1;
         for (const num of winNum) if (numIhaveIguess.includes(num)) i++;
         return i != -1 ? 2 ** i : 0;
      })
      .reduce((pv, v) => pv + v, 0)
      .toString();
}

export function part2(input: string): string {
   const lines = input.split('\n');
   const instances = new Array(lines.length).fill(1);
   return lines
      .map((s, idx) => {
         const [winNum, numIhaveIguess] = s
            .slice(s.indexOf(':') + 1)
            .split('|')
            .map((r) =>
               r
                  .split(' ')
                  .filter((e) => e !== '')
                  .map(Number)
            );
         let i = 0;
         for (const num of winNum) if (numIhaveIguess.includes(num)) i++;
         while (i) {
            instances[idx + i] += instances[idx];
            i--;
         }
         return;
      })
      .reduce((pv, _, i) => pv + instances[i], 0)
      .toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
