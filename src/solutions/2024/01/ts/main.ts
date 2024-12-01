import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
   const l: number[] = [];
   const r: number[] = [];
   input.split('\n').forEach((line) => {
      const pair = line.split('   ');
      l.push(+pair[0]);
      r.push(+pair[1]);
   });
   l.sort((a, b) => a - b);
   r.sort((a, b) => a - b);

   let sum = 0;
   for (let i = 0; i < l.length; i++) {
      sum += Math.abs(l[i] - r[i]);
   }

   return sum.toString();
}

function part2(input: string, _isTest: boolean): string {
   const l: number[] = [];
   const hashmap: { [key: number]: number } = {};
   input.split('\n').forEach((line) => {
      const pair = line.split('   ');
      const k = +pair[0];
      const v = +pair[1];
      l.push(k);
      hashmap[k] ||= 0;
      hashmap[v] ||= 0;
      hashmap[v]++;
   });

   let count = 0;
   l.forEach((e) => {
      count += e * hashmap[e];
   });

   return count.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
