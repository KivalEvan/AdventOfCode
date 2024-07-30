import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
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

function part2(input: string, _isTest: boolean): string {
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
   run(argv, part1, part2, options);
}
