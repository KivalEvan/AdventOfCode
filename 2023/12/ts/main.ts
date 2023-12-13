// deno-lint-ignore-file no-explicit-any
import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function solve(field: string, conditions: number[]): number {
   const cache: Record<string, any> = {};
   function memoize(fn: (x: number, y: number) => any) {
      return (x: number, y: number) => {
         const key = x.toString() + y.toString();
         if (key in cache) {
            return cache[key];
         } else {
            const result = fn(x, y);
            cache[key] = result;
            return result;
         }
      };
   }

   function lookahead(fIdx: number, cIdx: number): number {
      if (cIdx === conditions.length) return 0;
      if (field.length - fIdx < conditions[cIdx]) return 0;
      for (let k = fIdx; k < fIdx + conditions[cIdx]; k++) if (field[k] === '.') return 0;
      if (field.length - 1 === conditions[cIdx]) return wedoabitofrecursion(field.length, cIdx + 1);
      if (field[fIdx + conditions[cIdx]] !== '#')
         return wedoabitofrecursion(fIdx + conditions[cIdx] + 1, cIdx + 1);
      return 0;
   }

   const wedoabitofrecursion = memoize((fIdx: number, cIdx: number): number => {
      if (fIdx >= field.length) return cIdx === conditions.length ? 1 : 0;
      if (field[fIdx] === '.') return wedoabitofrecursion(fIdx + 1, cIdx);
      if (field[fIdx] === '#') return lookahead(fIdx, cIdx);
      return wedoabitofrecursion(fIdx + 1, cIdx) + lookahead(fIdx, cIdx);
   });

   return wedoabitofrecursion(0, 0);
}

export function part1(input: string): string {
   const parsed = input.split('\n').map((str) => {
      const temp: any[] = str.split(' ');
      temp[1] = temp[1].split(',').map(Number);
      return temp as [string, number[]];
   });

   let res = 0;
   for (const [field, conditions] of parsed) res += solve(field, conditions);

   return res.toString();
}

export function part2(input: string): string {
   const parsed = input.split('\n').map((str) => {
      const temp: any[] = str.split(' ');
      temp[1] = temp[1].split(',').map(Number);
      return temp as [string, number[]];
   });

   let res = 0;
   for (const [field, conditions] of parsed)
      res += solve(field + '?' + field + '?' + field + '?' + field + '?' + field, [
         ...conditions,
         ...conditions,
         ...conditions,
         ...conditions,
         ...conditions,
      ]);

   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
