import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

function compare(a: bigint[], b: bigint[]): boolean {
   for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
   }
   return true;
}

function compute(
   a: bigint,
   b: bigint,
   c: bigint,
   programs: bigint[],
): bigint[] {
   const output: bigint[] = [];
   for (let ip = 0n; ip < programs.length; ip += 2n) {
      const program = programs[Number(ip)];
      const operand = programs[Number(ip) + 1];
      let val = operand;
      switch (val) {
         case 4n:
            val = a;
            break;
         case 5n:
            val = b;
            break;
         case 6n:
            val = c;
            break;
         default:
            break;
      }
      switch (program) {
         case 0n: // adv
            a = a >> val;
            break;
         case 1n: // bxl
            b ^= operand;
            break;
         case 2n: // bst
            b = val & 7n;
            break;
         case 3n: // jnz
            if (a === 0n) break;
            ip = operand - 2n;
            break;
         case 4n: // bxc
            b ^= c;
            break;
         case 5n: // out
            output.push(val & 7n);
            break;
         case 6n: // bdv
            b = a >> val;
            break;
         case 7n: // cdv
            c = a >> val;
            break;
      }
   }
   return output;
}

function solve(input: string, p2: boolean): string {
   const lines = input.split("\n\n");
   const registers = lines[0].match(/\d+/g)!.map(BigInt) as [
      bigint,
      bigint,
      bigint,
   ];
   const programs = lines[1].match(/\d+/g)!.map(BigInt);

   if (p2) {
      const state: [number, bigint][] = [[1, 0n]];
      while (state.length) {
         const [i, a] = state.shift()!;
         for (let x = a; x < a + 8n; x++) {
            const computed = compute(x, 0n, 0n, programs);
            if (compare(computed, programs.slice(-Number(i)))) {
               if (i === programs.length) {
                  return x.toString();
               }
               state.push([i + 1, x * 8n]);
            }
         }
      }
   }

   return compute(...registers, programs).join(",");
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
