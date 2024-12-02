import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function killme(ary: number[]): boolean {
   let incre = false;
   let decre = false;
   for (let i = 1; i < ary.length; i++) {
      const val = ary[i] - ary[i - 1];
      if (val > 0) incre = true;
      if (val < 0) decre = true;
      const change = Math.abs(val);
      if (change < 1 || change > 3 || incre === decre) {
         return false;
      }
   }
   return true;
}

function part1(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .map((line): number => (killme(line.split(' ').map((e) => +e)) ? 1 : 0))
      .reduce((p, v) => p + v, 0)
      .toString();
}

function part2(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .map((line): number => {
         const num = line.split(' ').map((e) => +e);
         if (killme(num)) return 1;
         for (let i = 0; i < num.length; i++) {
            const ary = [...num];
            ary.splice(i, 1);
            if (killme(ary)) {
               return 1;
            }
         }
         return 0;
      })
      .reduce((p, v) => p + v, 0)
      .toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
