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

const strToNum: Record<string, string> = {
   zero: '0',
   one: '1',
   two: '2',
   three: '3',
   four: '4',
   five: '5',
   six: '6',
   seven: '7',
   eight: '8',
   nine: '9',
};

// i dont feel like doing single pass
export function part1(input: string): unknown {
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
   return res;
}

export function part2(input: string): unknown {
   let res = 0;
   const toSearch = Object.keys(strToNum);
   input.split('\n').forEach((s) => {
      let first = '';
      let last = '';
      let search: string | string[] = '';
      first: for (let i = 0; i < s.length; i++) {
         if (isNum(s[i])) {
            first = s[i];
            break;
         }
         search += s[i];
         for (const lookFor of toSearch) {
            if (search.includes(lookFor)) {
               first = strToNum[lookFor];
               break first;
            }
         }
      }
      search = [];
      last: for (let i = s.length - 1; i >= 0; i--) {
         if (isNum(s[i])) {
            last = s[i];
            break;
         }
         search.push(s[i]);
         const joined = search.toReversed().join('');
         for (const lookFor of toSearch) {
            if (joined.includes(lookFor)) {
               last = strToNum[lookFor];
               break last;
            }
         }
      }
      res += Number(first + last);
   });
   return res;
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, hasAlternate);
}
