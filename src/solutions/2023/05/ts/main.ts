import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function parseInput(input: string, single: boolean) {
   const parsed = input.split('\n\n');
   const seedRanges = parsed[0]
      .split(':')[1]
      .split(' ')
      .filter((str) => str)
      .map(Number)
      .reduce((p, v, i, ary) => {
         if (single) p.push([v, v]);
         else if (i % 2) {
            p.push([ary[i - 1], ary[i - 1] + v - 1] as [number, number]);
         }
         return p;
      }, [] as [number, number][]);
   const srcToDestRanges = parsed.slice(1).map(
      (p) =>
         p
            .split('\n')
            .slice(1)
            .map((str) => str.split(' ').map(Number))
            .map((v) => {
               return [
                  [v[1], v[1] + v[2] - 1],
                  [v[0], v[0] + v[2] - 1],
               ];
            }) as [src: [number, number], dest: [number, number]][],
   );
   return [seedRanges, srcToDestRanges] as const;
}

function solve(input: string, single: boolean) {
   const [seedRanges, srcToDestRanges] = parseInput(input, single);

   for (const groups of srcToDestRanges) {
      for (const g of groups) {
         for (const r of seedRanges) {
            if (r[0] < g[0][0] && g[0][0] < r[1]) {
               seedRanges.push([r[0], g[0][0] - 1]);
               r[0] = g[0][0];
            }
            if (r[0] < g[0][1] && g[0][1] < r[1]) {
               seedRanges.push([g[0][1] + 1, r[1]]);
               r[1] = g[0][1];
            }
         }
      }
      for (const r of seedRanges) {
         const found = groups.find(
            (g) =>
               g[0][0] <= r[0] &&
               r[0] <= g[0][1] &&
               r[1] >= g[0][0] &&
               g[0][1] >= r[1],
         );
         if (found) {
            const diff = found[1][0] - found[0][0];
            r[0] += diff;
            r[1] += diff;
         }
      }
   }

   return Math.min(...seedRanges.map((v) => v[0])).toString();
}

function part1(input: string, _isTest: boolean): string {
   return solve(input, true);
}

function part2(input: string, _isTest: boolean): string {
   return solve(input, false);
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
