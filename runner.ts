import { parseArgs } from 'https://deno.land/std@0.208.0/cli/mod.ts';
import { resolve } from 'utils/deps.ts';
import { run } from 'utils/run.ts';

console.log('https://adventofcode.com/');

const args = parseArgs(Deno.args, {
   string: ['d', 'y', 'l'],
   boolean: ['a', 't', 'm'],
   alias: { d: 'day', a: 'all', y: 'year', m: 'm', l: 'lang' },
});

const langTranslate: Record<string, string> = {
   typescript: 'ts',
   rs: 'rust',
   csharp: 'c#',
};
const langFullName: Record<string, string> = {
   c: 'C17',
   'c#': 'C# 12',
   go: 'Go 1.42',
   java: 'Java 21',
   python: 'Python 3.11',
   rust: 'Rust 1.74',
   ts: 'TypeScript 5.2',
};
const lang = langTranslate[args.l?.toLowerCase() || ''] || args.l?.toLowerCase() || 'ts';

let yearStart = new Date().getFullYear();
let yearEnd = new Date().getFullYear();
let dayStart = new Date().getDate();
let dayEnd = new Date().getDate();

if (args.a) {
   yearStart = 2015;
   yearEnd = new Date().getFullYear();
   dayStart = 1;
   dayEnd = 25;
}

if (args.y) {
   yearStart = parseInt(args.y);
   yearEnd = parseInt(args.y);
   if (yearStart !== new Date().getFullYear()) {
      dayStart = 1;
      dayEnd = 25;
   }
}

if (args.d) {
   dayStart = parseInt(args.d);
   dayEnd = parseInt(args.d);
}

if (args.m) {
   dayStart = 1;
   dayEnd = 25;
}

interface Main {
   hasAlternate: boolean;
   part1: (path: string) => string;
   part2: (path: string) => string;
}

mainLoop: for (let year = yearStart; year <= yearEnd; year++) {
   console.log(`Advent of Code -- year ${year}`);
   for (let day = dayStart; day <= dayEnd; day++) {
      console.log(`\n----\\________\n${year} -- day ${day}`);
      console.log('\nLanguage:', langFullName[lang]);
      try {
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
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}/ts/main.ts`);
   const main = (await import(path)) as Main;
   if (!main) throw new Error('Main file not found.');

   run(path, main.part1, main.part2, main.hasAlternate);
}
