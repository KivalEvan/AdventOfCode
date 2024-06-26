import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

export const options: SolutionOptions = {
   hasAlternate: true,
   hasIo: false,
};

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

function getNum(str: string): string {
   if (str.startsWith('zero')) return '0';
   if (str.startsWith('one')) return '1';
   if (str.startsWith('two')) return '2';
   if (str.startsWith('three')) return '3';
   if (str.startsWith('four')) return '4';
   if (str.startsWith('five')) return '5';
   if (str.startsWith('six')) return '6';
   if (str.startsWith('seven')) return '7';
   if (str.startsWith('eight')) return '8';
   if (str.startsWith('nine')) return '9';
   return '';
}

// i dont feel like doing single pass
export function part1(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .reduce((res, s) => {
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
         return res;
      }, 0)
      .toString();
}

export function part2(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .reduce((res, s) => {
         let first = '';
         let last = '';
         for (let i = 0; i < s.length; i++) {
            if (isNum(s[i])) {
               first = s[i];
               break;
            }
            const c = getNum(s.substring(i));
            if (c) {
               first = c;
               break;
            }
         }
         for (let i = s.length - 1; i >= 0; i--) {
            if (isNum(s[i])) {
               last = s[i];
               break;
            }
            const c = getNum(s.substring(i));
            if (c) {
               last = c;
               break;
            }
         }
         res += Number(first + last);
         return res;
      }, 0)
      .toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
