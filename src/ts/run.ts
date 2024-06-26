import { getAnswers, getInput } from './input.ts';
import { dirname, fromFileUrl, resolve } from './deps.ts';
import { SolutionOptions } from './options.ts';

let result: string;

function test(actual: unknown, expected: unknown) {
   if (expected == '') return;
   if (actual != expected) {
      throw new Error(`Expected ${expected} got ${actual}`);
   }
}

function round(num: number, r = 3): number {
   return Math.round(num * Math.pow(10, r)) / Math.pow(10, r);
}

function perform(
   tag: string,
   func: (path: string, _isTest: boolean) => string,
   path: string,
   hasIo: boolean = false,
) {
   console.log('\n\\', tag);
   const isTest = tag.startsWith('Test');
   let start = 0,
      end = 0,
      elapsedIo = 0,
      elapsedPart = 0;

   start = performance.now();
   const input = hasIo ? path : getInput(path);
   end = performance.now();
   elapsedIo = end - start;

   start = performance.now();
   result = func(input, isTest);
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

function bench(
   tag: string,
   func: (path: string, _isTest: boolean) => string,
   path: string,
   itBench: number,
   hasIo: boolean = false,
) {
   const isTest = tag.startsWith('Test');
   let _ = '';
   let start = 0,
      end = 0,
      elapsed = 0;

   const timesIo = new Array(itBench).fill(0);
   const timesPart = new Array(itBench).fill(0);
   const timesOverall = new Array(itBench).fill(0);

   for (let i = 0; i < itBench; i++) {
      start = performance.now();
      const input = hasIo ? path : getInput(path);
      end = performance.now();
      elapsed = end - start;
      timesIo[i] = elapsed;

      start = performance.now();
      _ = func(input, isTest);
      end = performance.now();
      elapsed = end - start;
      timesPart[i] = elapsed;

      timesOverall[i] = timesPart[i] + timesIo[i];
   }
   let min, max, avg;
   console.log('\nBenchmarking', tag, '(ms) min..max avg');

   min = Math.min(...timesIo);
   max = Math.max(...timesIo);
   avg = timesIo.reduce((pv, v) => pv + v, 0) / timesIo.length;
   console.log('IO:', round(min), '..', round(max), '-', round(avg));

   min = Math.min(...timesPart);
   max = Math.max(...timesPart);
   avg = timesPart.reduce((pv, v) => pv + v, 0) / timesPart.length;
   console.log('Part:', round(min), '..', round(max), '-', round(avg));

   min = Math.min(...timesOverall);
   max = Math.max(...timesOverall);
   avg = timesOverall.reduce((pv, v) => pv + v, 0) / timesOverall.length;
   console.log('Overall:', round(min), '..', round(max), '-', round(avg));
}

export function run(
   args: string[],
   part1: (input: string, _isTest: boolean) => string,
   part2: (input: string, _isTest: boolean) => string,
   options: SolutionOptions = {},
) {
   const [path, itBench] = args;
   const pathAnswers = resolve(path, 'answers.txt');
   const pathInputTest1 = resolve(path, 'test1.txt');
   const pathInputTest2 = options.hasAlternate
      ? resolve(path, 'test2.txt')
      : resolve(path, 'test1.txt');
   const pathInputMain = resolve(path, 'input.txt');

   const it = +itBench;
   if (it > 0) {
      bench('Test 1', part1, pathInputTest1, it, options.hasIo);
      bench('Part 1', part1, pathInputMain, it, options.hasIo);
      bench('Test 2', part2, pathInputTest2, it, options.hasIo);
      bench('Part 2', part2, pathInputMain, it, options.hasIo);
      return;
   }

   const answers = getAnswers(pathAnswers);
   perform('Test 1', part1, pathInputTest1, options.hasIo);
   test(result, answers.test1);
   perform('Part 1', part1, pathInputMain, options.hasIo);
   test(result, answers.part1);
   perform('Test 2', part2, pathInputTest2, options.hasIo);
   test(result, answers.test2);
   perform('Part 2', part2, pathInputMain, options.hasIo);
   test(result, answers.part2);
}
