import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

export function part1(input: string): string {
   const parsed = input.split('\n\n');
   const seeds = parsed[0]
      .split(':')[1]
      .split(' ')
      .filter((str) => str)
      .map(Number);
   const srcToDestRanges = parsed.slice(1).map(
      (p) =>
         p
            .split('\n')
            .slice(1)
            .map((str) => str.split(' ').map(Number)) as [number, number, number][]
   );

   let res = Infinity;
   for (let destination of seeds) {
      for (const groups of srcToDestRanges) {
         for (const triplet of groups) {
            if (triplet[1] <= destination && destination < triplet[1] + triplet[2]) {
               destination += triplet[0] - triplet[1];
               break;
            }
         }
      }
      if (destination < res) res = destination;
   }

   return res.toString();
}

export function part2(input: string): string {
   const parsed = input.split('\n\n');
   const seedRanges = parsed[0]
      .split(':')[1]
      .split(' ')
      .filter((str) => str)
      .map(Number);
   const srcToDestRanges = parsed
      .slice(1)
      .map(
         (p) =>
            p
               .split('\n')
               .slice(1)
               .map((str) => str.split(' ').map(Number)) as [number, number, number][]
      )
      .reverse();

   for (let i = 0; i < Infinity; i++) {
      let destination = i;
      for (const groups of srcToDestRanges) {
         for (const triplet of groups) {
            if (triplet[0] <= destination && destination < triplet[0] + triplet[2]) {
               destination += triplet[1] - triplet[0];
               break;
            }
         }
      }
      for (let j = 0; j < seedRanges.length; j += 2)
         if (seedRanges[j] <= destination && destination < seedRanges[j] + seedRanges[j + 1]) return i.toString();
   }

   return '';
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
