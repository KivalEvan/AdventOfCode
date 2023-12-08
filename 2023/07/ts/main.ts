import { run } from 'utils/run.ts';

const ranking: Record<string, number> = {
   A: 13,
   K: 12,
   Q: 11,
   J: 10,
   T: 9,
   '9': 8,
   '8': 7,
   '7': 6,
   '6': 5,
   '5': 4,
   '4': 3,
   '3': 2,
   '2': 1,
   '1': 0,
};

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

const enum Type {
   HIGH_CARD,
   ONE_PAIR,
   TWO_PAIR,
   THREE_OF_A_KIND,
   FULL_HOUSE,
   FOUR_OF_A_KIND,
   FIVE_OF_A_KIND,
}

function sortCard(a: [string, number], b: [string, number]): number {
   for (let i = 0; i < 5; i++) if (a[0][i] !== b[0][i]) return ranking[a[0][i]] - ranking[b[0][i]];
   return 0;
}

function getType(str: string): number {
   let values = new Array(14).fill(0);
   for (const k of str) values[ranking[k]]++;
   if (values[0]) {
      const temp = values[0];
      values[0] = 0;
      const idx = values.findIndex((e) => e === Math.max(...values));
      values[idx] += temp;
   }

   values = values.filter((e) => e);
   if (values.length === 1) return Type.FIVE_OF_A_KIND;
   if (values.length === 4) return Type.ONE_PAIR;
   if (values.length === 5) return Type.HIGH_CARD;

   let min = 5;
   let max = 0;
   for (const v of values) {
      if (min > v) min = v;
      if (max < v) max = v;
   }
   if (min === 1) {
      if (max === 2) return Type.TWO_PAIR;
      if (max === 3) return Type.THREE_OF_A_KIND;
      if (max === 4) return Type.FOUR_OF_A_KIND;
   }
   return Type.FULL_HOUSE;
}

export function part1(input: string): string {
   const groups: [string, number][][] = [];
   for (let i = 0; i < 7; i++) groups.push([]);
   input
      .split('\n')
      .map((str) => {
         const temp: unknown[] = str.split(' ');
         temp[1] = Number(temp[1]);
         return temp as [string, number];
      })
      .forEach((set) => groups[getType(set[0])].push(set));

   let res = 0;
   let i = 1;
   for (const group of groups) {
      group.sort(sortCard);
      for (const set of group) res += set[1] * i++;
   }
   return res.toString();
}

export function part2(input: string): string {
   const groups: [string, number][][] = [];
   for (let i = 0; i < 7; i++) groups.push([]);
   input
      .split('\n')
      .map((str) => {
         const temp: unknown[] = str.split(' ');
         temp[0] = (temp[0] as string).replaceAll('J', '1');
         temp[1] = Number(temp[1]);
         return temp as [string, number];
      })
      .forEach((set) => groups[getType(set[0])].push(set));

   let res = 0;
   let i = 1;
   for (const group of groups) {
      group.sort(sortCard);
      for (const set of group) res += set[1] * i++;
   }
   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
