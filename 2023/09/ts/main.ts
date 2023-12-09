import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function difference(r: number[]): number[] {
   const ary = [];
   for (let i = 1; i < r.length; i++) ary[i - 1] = r[i] - r[i - 1];
   return ary;
}

function extrapolate(r: number[]): number {
   if (r.every((x) => x === 0)) return 0;
   return extrapolate(difference(r)) + r[r.length - 1];
}

export function part1(input: string): string {
   const parsed = input.split('\n').map((str) => str.split(' ').map(Number));
   let res = 0;
   for (const history of parsed) res += extrapolate(history);
   return res.toString();
}

export function part2(input: string): string {
   const parsed = input.split('\n').map((str) => str.split(' ').map(Number));
   let res = 0;
   for (const history of parsed) res += extrapolate(history.reverse());
   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
