import { parseArgs } from 'https://deno.land/std@0.208.0/cli/mod.ts';
import * as run from './run/mod.ts';

console.log('https://adventofcode.com/');

const args = parseArgs(Deno.args, {
   string: ['d', 'y', 'l'],
   boolean: ['a', 't', 'm'],
   alias: { d: 'day', a: 'all', y: 'year', m: 'm', l: 'lang' },
});

const langParse: Record<string, string> = {
   typescript: 'ts',
   rs: 'rust',
   'c#': 'csharp',
};
const langName: Record<string, string> = {
   c: 'C17',
   csharp: 'C# 12',
   go: 'Go 1.42',
   java: 'Java 21',
   python: 'Python 3.11',
   rust: 'Rust 1.74',
   ts: 'TypeScript 5.2',
};
const lang = langParse[args.l?.toLowerCase() || ''] || args.l?.toLowerCase() || 'ts';

const currentDate = new Date();
let yearStart = currentDate.getFullYear();
let yearEnd = currentDate.getFullYear();
let dayStart = currentDate.getDate();
let dayEnd = currentDate.getDate();

if (args.a) {
   yearStart = 2015;
   yearEnd = currentDate.getFullYear();
   dayStart = 1;
   dayEnd = 25;
}

if (args.y) {
   yearStart = parseInt(args.y);
   yearEnd = parseInt(args.y);
   if (yearStart !== currentDate.getFullYear()) {
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

mainLoop: for (let year = yearStart; year <= yearEnd; year++) {
   console.log(`Advent of Code -- year ${year}`);
   console.log('Language:', langName[lang]);
   for (let day = dayStart; day <= dayEnd; day++) {
      console.log(`\n----\\________\n${year} -- day ${day}`);
      try {
         switch (lang) {
            case 'c':
               await run.c(year, day);
               break;
            case 'csharp':
               await run.csharp(year, day);
               break;
            case 'go':
               await run.go(year, day);
               break;
            case 'java':
               await run.java(year, day);
               break;
            case 'python':
               await run.python(year, day);
               break;
            case 'rust':
               await run.rust(year, day);
               break;
            case 'ts':
               await run.ts(year, day);
               break;
            default:
               console.error('Unknown language selected.');
               break mainLoop;
         }
      } catch (e) {
         console.error(e);
         break;
      }
      if (new Date(year, 11, day + 1, 13) > currentDate) {
         console.log(`\nWait for the next day.`);
         break;
      }
      if (day === 25) {
         console.log('\nMerry Christmas.');
      }
   }
   console.log();
}
