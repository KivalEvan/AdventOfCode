// deno-lint-ignore-file no-explicit-any
import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function sum(ary: number[]): number {
   return ary.reduce((pv, v) => pv + v, 0);
}

function memoize(fn: (...args: any[]) => any) {
   const cache: Record<string, any> = {};
   return (...args: any[]) => {
      const key = args.toString();
      if (key in cache) {
         return cache[key];
      } else {
         const result = fn(...args);
         cache[key] = result;
         return result;
      }
   };
}

const wedoabitofrecursion = memoize((field: string, conditions: number[]) => {
   if (!field.length) {
      if (!conditions.length) return 1;
      return 0;
   }
   if (!conditions.length) {
      for (const k of field) if (k === '#') return 0;
      return 1;
   }

   // aint no way this fits with condition
   if (field.length < sum(conditions) + conditions.length - 1) return 0;

   if (field[0] === '.') return wedoabitofrecursion(field.slice(1), conditions);
   if (field[0] === '#') {
      const num = conditions[0];
      for (let i = 0; i < num; i++) if (field[i] === '.') return 0;
      if (field[num] === '#') return 0;
      return wedoabitofrecursion(field.slice(num + 1), conditions.slice(1));
   }

   return (
      wedoabitofrecursion('#' + field.slice(1), conditions) +
      wedoabitofrecursion(field.slice(1), conditions)
   );
});

export function part1(input: string): string {
   const parsed = input.split('\n').map((str) => {
      const temp: any[] = str.split(' ');
      temp[1] = temp[1].split(',').map(Number);
      return temp as [string, number[]];
   });

   let res = 0;
   for (const [field, conditions] of parsed) res += wedoabitofrecursion(field, conditions);

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
      res += wedoabitofrecursion(field + '?' + field + '?' + field + '?' + field + '?' + field, [
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
