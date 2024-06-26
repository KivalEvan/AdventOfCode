import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

export const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function difference(ary: number[], sz: number): number[] {
   for (let i = 0; i < sz; i++) ary[i] = ary[i + 1] - ary[i];
   return ary;
}

function extrapolate(ary: number[], sz: number): number {
   sz--;
   const last = ary[sz];
   if (!sz) return last;
   return extrapolate(difference(ary, sz), sz) + last;
}

function parseInput(input: string): number[][] {
   return input.split('\n').map((str) => str.split(' ').map(Number));
}

export function part1(input: string, _isTest: boolean): string {
   const parsed = parseInput(input);
   let res = 0;
   for (const history of parsed) res += extrapolate(history, history.length);
   return res.toString();
}

export function part2(input: string, _isTest: boolean): string {
   const parsed = parseInput(input);
   let res = 0;
   for (const history of parsed) res += extrapolate(history.reverse(), history.length);
   return res.toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
