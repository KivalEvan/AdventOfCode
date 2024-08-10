import { getAnswers, getInput } from './input.ts';
import { resolve } from 'node:path';
import { SolutionOptions } from './options.ts';

type SolutionWrapper = {
   readonly tag: string;
   readonly func: (input: string, isTest: boolean) => string;
   readonly path: string;
   readonly test: string;
   readonly iteration: number;
   readonly options: SolutionOptions;
   result: string;
   elapsed: [number, number];
   bench: [number[], number[], number[]];
};
function getSolutionWrapper(
   tag: string,
   func: (input: string, isTest: boolean) => string,
   path: string,
   test: string,
   iteration: number,
   options: SolutionOptions,
): SolutionWrapper {
   return {
      tag,
      func,
      path,
      test,
      iteration,
      options,
      result: '',
      elapsed: [0, 0],
      bench: [[], [], []],
   };
}

function printResult(solution: SolutionWrapper): SolutionWrapper {
   if (solution.iteration === 1) {
      console.log('\n' + solution.tag + ': (ms) IO > Part > Overall');
      console.log(
         'Timer:',
         round(solution.bench[0][2]),
         '>',
         round(solution.bench[1][2]),
         '>',
         round(solution.bench[2][2]),
      );
   } else {
      console.log('\n' + solution.tag + ': (ms) min..max avg');
      console.log(
         'IO:',
         round(solution.bench[0][0]),
         '..',
         round(solution.bench[0][1]),
         '-',
         round(solution.bench[0][2]),
      );
      console.log(
         'Part:',
         round(solution.bench[1][0]),
         '..',
         round(solution.bench[1][1]),
         '-',
         round(solution.bench[1][2]),
      );
      console.log(
         'Overall:',
         round(solution.bench[2][0]),
         '..',
         round(solution.bench[2][1]),
         '-',
         round(solution.bench[2][2]),
      );
   }
   console.log('Result:', solution.result);

   return solution;
}

function test(actual: unknown, expected: unknown) {
   if (expected == '') return;
   if (actual != expected) {
      throw new Error(`Expected ${expected} got ${actual}`);
   }
}

function timer(fn: () => string): [string, number] {
   const start = performance.now();
   const result = fn();
   const end = performance.now();
   return [result, end - start];
}

function round(num: number, r = 3): number {
   return Math.round(num * Math.pow(10, r)) / Math.pow(10, r);
}

function execute(solution: SolutionWrapper): SolutionWrapper {
   const isTest = solution.tag.startsWith('Test');

   const [input, elapsedIo] = timer(() => {
      return solution.options.hasIo ? solution.path : getInput(solution.path);
   });
   const [result, elapsedPart] = timer(() => {
      return solution.func(input, isTest);
   });

   solution.result = result;
   solution.elapsed = [elapsedIo, elapsedPart];

   return solution;
}

function perform(solution: SolutionWrapper): SolutionWrapper {
   const timesIo = new Array(solution.iteration).fill(0);
   const timesPart = new Array(solution.iteration).fill(0);
   const timesOverall = new Array(solution.iteration).fill(0);

   for (let i = 0; i < (solution.iteration / 2); i++) {
      execute(solution);
   }

   for (let i = 0; i < solution.iteration; i++) {
      execute(solution);
      timesIo[i] = solution.elapsed[0];
      timesPart[i] = solution.elapsed[1];
      timesOverall[i] = timesPart[i] + timesIo[i];
   }
   let min, max, avg;

   min = Math.min(...timesIo);
   max = Math.max(...timesIo);
   avg = timesIo.reduce((pv, v) => pv + v, 0) / timesIo.length;
   const resIo = [min, max, avg];

   min = Math.min(...timesPart);
   max = Math.max(...timesPart);
   avg = timesPart.reduce((pv, v) => pv + v, 0) / timesPart.length;
   const resPart = [min, max, avg];

   min = Math.min(...timesOverall);
   max = Math.max(...timesOverall);
   avg = timesOverall.reduce((pv, v) => pv + v, 0) / timesOverall.length;
   const resOverall = [min, max, avg];

   solution.bench = [resIo, resPart, resOverall];

   return solution;
}

export function run(
   args: string[],
   part1: (input: string, isTest: boolean) => string,
   part2: (input: string, isTest: boolean) => string,
   options: SolutionOptions = {},
) {
   const [path, itStr] = args.slice(2);
   const pathAnswers = resolve(path, 'answers.txt');
   const pathInputTest1 = resolve(path, 'test1.txt');
   const pathInputTest2 = options.hasAlternate
      ? resolve(path, 'test2.txt')
      : resolve(path, 'test1.txt');
   const pathInputMain = resolve(path, 'input.txt');
   const it = +itStr;

   const answers = getAnswers(pathAnswers);
   const solutions = [
      getSolutionWrapper(
         'Test 1',
         part1,
         pathInputTest1,
         answers.test1,
         it,
         options,
      ),
      getSolutionWrapper(
         'Part 1',
         part1,
         pathInputMain,
         answers.part1,
         it,
         options,
      ),
      getSolutionWrapper(
         'Test 2',
         part2,
         pathInputTest2,
         answers.test2,
         it,
         options,
      ),
      getSolutionWrapper(
         'Part 2',
         part2,
         pathInputMain,
         answers.part2,
         it,
         options,
      ),
   ];

   solutions.map(perform).forEach((p) => {
      printResult(p);
      test(p.result, p.test);
   });
}
