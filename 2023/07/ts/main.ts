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
};

const ranking2: Record<string, number> = {
   A: 13,
   K: 12,
   Q: 11,
   T: 10,
   '9': 9,
   '8': 8,
   '7': 7,
   '6': 6,
   '5': 5,
   '4': 4,
   '3': 3,
   '2': 2,
   J: 1,
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
   for (let i = 0; i < 5; i++) {
      const difference = ranking[a[0][i]] - ranking[b[0][i]];
      if (difference < 0) return -1;
      if (difference > 0) return 1;
   }
   return 0;
}

function getType(str: string): number {
   if (str[0].repeat(5) === str) return Type.FIVE_OF_A_KIND;
   const s = new Set(str);
   if (s.size === 5) return Type.HIGH_CARD;
   if (s.size === 4) return Type.ONE_PAIR;

   const labels: Record<string, number> = {};
   for (const k of str) labels[k] = (labels[k] || 0) + 1;
   const values = Object.values(labels);
   const min = Math.min(...values);
   const max = Math.max(...values);

   if (min === 1 && max === 2) return Type.TWO_PAIR;
   if (min === 1 && max === 3) return Type.THREE_OF_A_KIND;
   if (min === 2 && max === 3) return Type.FULL_HOUSE;
   if (min === 1 && max === 4) return Type.FOUR_OF_A_KIND;

   return -1;
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

function sortCard2ElectricBoogaloo(a: [string, number], b: [string, number]): number {
   for (let i = 0; i < 5; i++) {
      const difference = ranking2[a[0][i]] - ranking2[b[0][i]];
      if (difference < 0) return -1;
      if (difference > 0) return 1;
   }
   return 0;
}

function getType2ElectricBoogaloo(str: string): number {
   if (str[0].repeat(5) === str) return Type.FIVE_OF_A_KIND;

   let values = new Array(14).fill(0);
   for (const k of str) values[ranking2[k]]++;
   if (values[1]) {
      const temp = values[1];
      values[1] = 0;
      const idx = values.findIndex((e) => e === Math.max(...values));
      values[idx] += temp;
   }

   values = values.filter((e) => e);
   if (values.length === 1) return Type.FIVE_OF_A_KIND;
   if (values.length === 4) return Type.ONE_PAIR;
   if (values.length === 5) return Type.HIGH_CARD;

   const min = Math.min(...values);
   const max = Math.max(...values);

   if (min === 1 && max === 2) return Type.TWO_PAIR;
   if (min === 1 && max === 3) return Type.THREE_OF_A_KIND;
   if (min === 2 && max === 3) return Type.FULL_HOUSE;
   if (min === 1 && max === 4) return Type.FOUR_OF_A_KIND;

   return -1;
}

export function part2(input: string): string {
   const groups: [string, number][][] = [];
   for (let i = 0; i < 7; i++) groups.push([]);
   input
      .split('\n')
      .map((str) => {
         const temp: unknown[] = str.split(' ');
         temp[1] = Number(temp[1]);
         return temp as [string, number];
      })
      .forEach((set) => groups[getType2ElectricBoogaloo(set[0])].push(set));

   let res = 0;
   let i = 1;
   for (const group of groups) {
      group.sort(sortCard2ElectricBoogaloo);
      for (const set of group) res += set[1] * i++;
   }
   return res.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
