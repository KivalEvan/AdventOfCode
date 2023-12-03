import { getAnswers, getInput } from 'utils/input.ts';
import { dirname, fromFileUrl, resolve } from 'utils/deps.ts';

let result: string;

function test(actual: unknown, expected: unknown) {
   if (expected == '') return;
   if (actual != expected) throw new Error(`Expected ${expected} got ${actual}`);
}

function perform(tag: string, func: (path: string) => string, input: string) {
   console.log('\n\\', tag);
   let start = 0,
      end = 0;

   start = performance.now();
   result = func(input);
   end = performance.now();

   console.log(' -- Time taken (ms):', Math.round((end - start) * 1000) / 1000);
   console.log('/ Result:', result);
}

export function run(
   path: string,
   part1: (input: string) => string,
   part2: (input: string) => string,
   hasAlternate: boolean
) {
   let isUrl = false;
   try {
      isUrl = new URL(path).protocol.startsWith('file');
   } catch {
      //
   }
   const dir = dirname(isUrl ? fromFileUrl(path) : path);
   const answers = getAnswers(resolve(dir, '..', 'answers.txt'));

   const inputTest1 = getInput(resolve(dir, '..', 'test1.txt'));
   const inputTest2 = getInput(
      hasAlternate ? resolve(dir, '..', 'test2.txt') : resolve(dir, '..', 'test1.txt')
   );
   const inputMain = getInput(resolve(dir, '..', 'input.txt'));

   perform('Test 1', part1, inputTest1);
   test(result, answers.test1);

   perform('Part 1', part1, inputMain);
   test(result, answers.part1);

   perform('Test 2', part2, inputTest2);
   test(result, answers.test2);

   perform('Part 2', part2, inputMain);
   test(result, answers.part2);
}
