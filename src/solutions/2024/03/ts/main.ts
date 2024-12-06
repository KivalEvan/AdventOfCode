import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
   let mul = 0;
   for (const m of input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)) {
      const [_, a, b] = m[0].match(/(\d{1,3}),(\d{1,3})/)!;
      mul += parseInt(a) * parseInt(b);
   }
   return mul.toString();
}

function part2(input: string, _isTest: boolean): string {
   let doit = true;
   let mul = 0;
   for (const m of input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g)!) {
      if (m === 'do()') {
         doit = true;
         continue;
      }
      if (m === "don't()") {
         doit = false;
         continue;
      }
      if (!doit) continue;
      const [_, a, b] = m.match(/(\d{1,3}),(\d{1,3})/)!;
      mul += parseInt(a) * parseInt(b);
   }
   return mul.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
