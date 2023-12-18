import { getAnswers, getInput } from './input.ts';
import { dirname, fromFileUrl, resolve } from './deps.ts';

let result: string;
const itBench = 1000;

function test(actual: unknown, expected: unknown) {
   if (expected == '') return;
   if (actual != expected) throw new Error(`Expected ${expected} got ${actual}`);
}

function round(num: number, r = 3): number {
   return Math.round(num * Math.pow(10, r)) / Math.pow(10, r);
}

function perform(tag: string, func: (path: string) => string, path: string) {
   console.log('\n\\', tag);
   let start = 0,
      end = 0,
      elapsedIo,
      elapsedPart;

   start = performance.now();
   const input = getInput(path);
   end = performance.now();
   elapsedIo = end - start;

   start = performance.now();
   result = func(input);
   end = performance.now();
   elapsedPart = end - start;
   console.log(
      ' -- Time Taken (ms):\n | IO > PART > ALL\n |',
      Math.round(elapsedIo * 1000) / 1000,
      '>',
      Math.round(elapsedPart * 1000) / 1000,
      '>',
      Math.round((elapsedIo + elapsedPart) * 1000) / 1000,
   );

   console.log('/ Result:', result);
}

function bench(tag: string, func: (path: string) => string, path: string) {
   let _ = '';
   let start = 0,
      end = 0,
      elapsed = 0;

   const timesIo = new Array(itBench).fill(0);
   const timesPart = new Array(itBench).fill(0);
   const timesOverall = new Array(itBench).fill(0);

   for (let i = 0; i < itBench; i++) {
      start = performance.now();
      const input = getInput(path);
      end = performance.now();
      elapsed = end - start;
      timesIo[i] = elapsed;

      start = performance.now();
      _ = func(input);
      end = performance.now();
      elapsed = end - start;
      timesPart[i] = elapsed;

      timesOverall[i] = timesPart[i] + timesIo[i];
   }
   let min, max, avg;
   console.log('\nBenchmarking', tag, '(ms)');

   min = Math.min(...timesIo);
   max = Math.max(...timesIo);
   avg = timesIo.reduce((pv, v) => pv + v, 0) / timesIo.length;
   console.log('IO (min..max)', round(min), '-', round(max), '(avg)', round(avg));

   min = Math.min(...timesPart);
   max = Math.max(...timesPart);
   avg = timesPart.reduce((pv, v) => pv + v, 0) / timesPart.length;
   console.log('Part (min..max)', round(min), '-', round(max), '(avg)', round(avg));

   min = Math.min(...timesOverall);
   max = Math.max(...timesOverall);
   avg = timesOverall.reduce((pv, v) => pv + v, 0) / timesOverall.length;
   console.log('Overall (min..max)', round(min), '-', round(max), '(avg)', round(avg));
}

export function run(
   path: string,
   part1: (input: string) => string,
   part2: (input: string) => string,
   hasAlternate: boolean,
   benchmark = false,
) {
   let isUrl = false;
   try {
      isUrl = new URL(path).protocol.startsWith('file');
   } catch {
      //
   }
   let dir = dirname(isUrl ? fromFileUrl(path) : path);
   if (dir.endsWith('ts')) dir += '/..';
   const answers = getAnswers(resolve(dir, 'answers.txt'));

   const pathInputTest1 = resolve(dir, 'test1.txt');
   const pathInputTest2 = hasAlternate ? resolve(dir, 'test2.txt') : resolve(dir, 'test1.txt');
   const pathInputMain = resolve(dir, 'input.txt');

   if (benchmark) {
      bench('Test 1', part1, pathInputTest1);
      bench('Part 1', part1, pathInputMain);
      bench('Test 2', part2, pathInputTest2);
      bench('Part 2', part2, pathInputMain);
   } else {
      perform('Test 1', part1, pathInputTest1);
      test(result, answers.test1);
      perform('Part 1', part1, pathInputMain);
      test(result, answers.part1);
      perform('Test 2', part2, pathInputTest2);
      test(result, answers.test2);
      perform('Part 2', part2, pathInputMain);
      test(result, answers.part2);
   }
}
