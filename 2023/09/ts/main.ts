import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function difference(r: number[], sz: number): number[] {
   for (let i = 0; i < sz; i++) r[i] = r[i + 1] - r[i];
   return r;
}

function extrapolate(r: number[], sz: number): number {
   const last = r[r.length - 1];
   let m = 0;
   for (let i = 0; i < sz; i++) m = m | r[i];
   if (!m) return 0;
   sz--;
   return extrapolate(difference(r, sz), sz) + last;
}

export function part1(input: string): string {
   const parsed = input.split('\n').map((str) => str.split(' ').map(Number));
   let res = 0;
   for (const history of parsed) res += extrapolate(history, history.length);
   return res.toString();
}

export function part2(input: string): string {
   const parsed = input.split('\n').map((str) => str.split(' ').map(Number));
   let res = 0;
   for (const history of parsed) res += extrapolate(history.reverse(), history.length);
   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
