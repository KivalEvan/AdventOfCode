import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

function calculate(n: bigint): bigint {
   n = (n * 64n) ^ n;
   n %= 16777216n;

   n = (n / 32n) ^ n;
   n %= 16777216n;

   n = (n * 2048n) ^ n;
   n %= 16777216n;

   return n;
}

function getDeltas(n: bigint): [bigint, bigint][] {
   const deltas: [bigint, bigint][] = [];
   for (let i = 0; i < 2000; i++) {
      const m = calculate(n);

      const b = n % 10n;
      const nb = m % 10n;

      deltas.push([nb - b, nb]);

      n = m;
   }
   return deltas;
}

function solve(input: string, p2: boolean): string {
   const secrets = input.split("\n").map(BigInt);

   if (p2) {
      const patterns: Record<string, bigint> = {};
      for (const d of secrets) {
         const deltas = getDeltas(d);
         const added = new Set();
         for (let i = 0; i < deltas.length - 4; i++) {
            const pat = deltas.slice(i, i + 4).map((d) => d[0]);
            const key = pat.join(",");
            if (!added.has(key)) {
               patterns[key] ||= 0n;
               patterns[key] += deltas[i + 3][1];
               added.add(key);
            }
         }
      }
      return Math.max(...Object.values(patterns).map(Number)).toString();
   }

   for (let x = 0; x < secrets.length; x++) {
      for (let i = 0; i < 2000; i++) {
         secrets[x] = calculate(secrets[x]);
      }
   }
   return secrets.reduce((acc, val) => acc + val, 0n).toString();
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
