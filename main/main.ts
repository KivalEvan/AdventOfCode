import { getLang, langName } from './lang.ts';
import { fetchArgs } from './args.ts';
import { runner } from './runner.ts';

console.log('https://adventofcode.com/');

const args = fetchArgs();

const lang = getLang(args.lang || 'ts');

const currentDate = new Date();
let yearStart = currentDate.getFullYear();
let yearEnd = currentDate.getFullYear();
let dayStart = currentDate.getDate();
let dayEnd = currentDate.getDate();

if (args.all) {
   yearStart = 2015;
   yearEnd = currentDate.getFullYear();
   dayStart = 1;
   dayEnd = 25;
}

if (args.year) {
   yearStart = parseInt(args.year);
   yearEnd = parseInt(args.year);
   if (yearStart !== currentDate.getFullYear()) {
      dayStart = 1;
      dayEnd = 25;
   }
}

if (args.day) {
   dayStart = parseInt(args.day);
   dayEnd = parseInt(args.day);
}

if (args.month) {
   dayStart = 1;
   dayEnd = 25;
}

const itBench = typeof args.bench === 'string' ? +args.bench : args.bench ? 1_000 : 1;

for (let year = yearStart; year <= yearEnd; year++) {
   console.log(`Advent of Code -- year ${year}`);
   console.log('Language:', langName[lang]);
   for (let day = dayStart; day <= dayEnd; day++) {
      console.log(`\n----\\________\n${year} -- day ${day}`);
      try {
         await runner(lang, year, day, itBench);
      } catch (e) {
         console.error(e.message);
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
