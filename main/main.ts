import { getLang, langName } from './lang.ts';
import { fetchArgs } from './args.ts';
import { runner } from './runner.ts';

console.log('https://adventofcode.com/');

const args = fetchArgs();

const lang = getLang(args.l || 'ts');

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

const itBench = typeof args.b === 'string' ? +args.b : args.b ? 1_000 : 0;

for (let year = yearStart; year <= yearEnd; year++) {
   console.log(`Advent of Code -- year ${year}`);
   console.log('Language:', langName[lang]);
   for (let day = dayStart; day <= dayEnd; day++) {
      console.log(`\n----\\________\n${year} -- day ${day}`);
      try {
         await runner(lang, year, day, itBench);
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
