import { parseArgs } from 'https://deno.land/std@0.208.0/cli/mod.ts';
import { resolve } from 'utils/deps.ts';
import { getAnswers, getInput } from 'utils/input.ts';

console.log('https://adventofcode.com/');

const args = parseArgs(Deno.args, {
   string: ['d', 'y', 'l'],
   boolean: ['a', 't', 'j'],
   alias: { d: 'day', a: 'all', y: 'year', t: 'test', j: 'jump', l: 'lang' },
});

const langTranslate: Record<string, string> = {
   typescript: 'ts',
   rs: 'rust',
   csharp: 'c#',
};
const lang = langTranslate[args.l || ''] || args.l || 'ts';

let yearStart = new Date().getFullYear();
let yearEnd = new Date().getFullYear();
if (args.y) {
   yearStart = parseInt(args.y);
   yearEnd = parseInt(args.y);
}
if (args.a) {
   yearStart = 2015;
   yearEnd = new Date().getFullYear();
}

let dayStart = 1;
let dayEnd = 25;
if (args.d) {
   dayStart = parseInt(args.d);
   if (!args.j) dayEnd = parseInt(args.d);
}

const doTest = args.t;

interface Main {
   hasAlternate: boolean;
   part1: (path: string) => unknown;
   part2: (path: string) => unknown;
}

let result: unknown;
mainLoop: for (let year = yearStart; year <= yearEnd; year++) {
   console.log(`Advent of Code -- year ${year}`);
   for (let day = dayStart; day <= dayEnd; day++) {
      try {
         console.log();
         switch (lang) {
            case 'c':
            case 'c#':
            case 'go':
            case 'java':
            case 'python':
            case 'rust':
            case 'ts':
               await tsRun(year, day);
               break;
            default:
               console.error('Unknown language selected.');
               break mainLoop;
         }
      } catch (e) {
         console.error(e);
         break;
      }
      if (new Date(year, 11, day + 1, 13) > new Date()) {
         console.log(`\nWait for the next day.`);
         break;
      }
      if (day === 25) {
         console.log('\nMerry Christmas.');
      }
   }
   console.log();
}

async function tsRun(y: number, d: number) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}/ts`);
   const answers = getAnswers(resolve(path, '..', 'answers.txt'));
   const main = (await import(resolve(path, 'main.ts'))) as Main;
   if (!main) throw new Error('Main file not found.');

   console.log(`----\\________\n${y} -- day ${d}`);

   if (doTest) {
      console.log('\nPerforming test:');
      perform('Part 1', main.part1, getInput(resolve(path, '..', 'test1.txt')));
      test(result, answers.test1);

      perform(
         'Part 2',
         main.part2,
         getInput(
            main.hasAlternate ? resolve(path, '..', 'test2.txt') : resolve(path, '..', 'test1.txt')
         )
      );
      test(result, answers.test2);

      console.log('\nTest completed.');
   }
   perform('Part 1', main.part1, getInput(resolve(path, '..', 'input.txt')));
   test(result, answers.part1);

   perform('Part 2', main.part2, getInput(resolve(path, '..', 'input.txt')));
   test(result, answers.part2);
}

function test(actual: unknown, expected: unknown) {
   if (expected == null) return;
   console.assert(actual == expected, 'Expected', expected, 'got', actual);
}

function perform(tag: string, func: (path: string) => unknown, path: string) {
   let perfStart = performance.now();
   let perfEnd = performance.now();

   console.log('\n\\', tag);
   perfStart = performance.now();
   result = func(path);
   perfEnd = performance.now();
   console.log(' -- Time taken (ms):', Math.round((perfEnd - perfStart) * 100) / 100);
   console.log('/ Result:', result);
}
