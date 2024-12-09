import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function solve(input: string, p2: boolean): string {
   const l: number[] = [];
   const r: number[] = [];
   const hashmap: { [key: number]: number } = {};
   input.split('\n').forEach((line) => {
      const pair = line.split('   ');
      const k = +pair[0];
      const v = +pair[1];
      l.push(k);
      r.push(v);
      hashmap[k] ||= 0;
      hashmap[v] ||= 0;
      hashmap[v]++;
   });
   l.sort((a, b) => a - b);
   r.sort((a, b) => a - b);

   let sum = 0;
   if (p2) {
      for (const e of l) {
         sum += e * hashmap[e];
      }
   } else {
      for (let i = 0; i < l.length; i++) {
         sum += Math.abs(l[i] - r[i]);
      }
   }

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
