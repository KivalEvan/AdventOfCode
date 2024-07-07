import { run } from '../../../src/ts/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function elfHash(str: string) {
   let val = 0;
   for (const k of str) val = ((val + k.charCodeAt(0)) * 17) % 256;
   return val;
}

function part1(input: string, _isTest: boolean): string {
   const parsed = input.split(',');
   let res = 0;
   for (const h of parsed) res += elfHash(h);
   return res.toString();
}

function part2(input: string, _isTest: boolean): string {
   const parsed = input.split(',');
   const boxes: [string, number][][] = new Array(256);
   for (let i = 0; i < 256; i++) boxes[i] = [];

   for (const h of parsed) {
      if (h.endsWith('-')) {
         const label = h.slice(0, h.indexOf('-'));
         const hash = elfHash(label);
         boxes[hash] = boxes[hash].filter((e) => e[0] !== label);
      } else {
         const [label, len] = h.split('=');
         const hash = elfHash(label);
         const found = boxes[hash].find((e) => e[0] === label);
         if (found) found[1] = Number(len);
         else boxes[hash].push([label, Number(len)]);
      }
   }

   let res = 0;
   for (let i = 0; i < 256; i++) {
      res += boxes[i].reduce((pv, v, j) => pv + (i + 1) * (j + 1) * v[1], 0);
   }
   return res.toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
