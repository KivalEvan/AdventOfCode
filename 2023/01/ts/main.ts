import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const hasAlternate = true;

function isNum(str: string) {
   return (
      str === '0' ||
      str === '1' ||
      str === '2' ||
      str === '3' ||
      str === '4' ||
      str === '5' ||
      str === '6' ||
      str === '7' ||
      str === '8' ||
      str === '9'
   );
}

const strToNum: Record<string, number> = {
   zero: 0,
   one: 1,
   two: 2,
   three: 3,
   four: 4,
   five: 5,
   six: 6,
   seven: 7,
   eight: 8,
   nine: 9,
   '0': 0,
   '1': 1,
   '2': 2,
   '3': 3,
   '4': 4,
   '5': 5,
   '6': 6,
   '7': 7,
   '8': 8,
   '9': 9,
};

// i dont feel like doing single pass
export function part1(input: string): string {
   let res = 0;
   input.split('\n').forEach((s) => {
      let first = '';
      let last = '';
      for (let i = 0; i < s.length; i++) {
         if (isNum(s[i])) {
            first = s[i];
            break;
         }
      }
      for (let i = s.length - 1; i >= 0; i--) {
         if (isNum(s[i])) {
            last = s[i];
            break;
         }
      }
      res += Number(first + last);
   });
   return res.toString();
}

export function part2(input: string): string {
   return input
      .split('\n')
      .reduce((pv, s) => {
         const regexd = [
            ...s.matchAll(/(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g),
         ];
         return pv + strToNum[regexd[0][1]] * 10 + strToNum[regexd[regexd.length - 1][1]];
      }, 0)
      .toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, hasAlternate);
}
