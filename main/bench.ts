import { promisify } from 'node:util';
import { fetchArgs } from './args.ts';
import { getLang, LangName, langName } from './lang.ts';
import { exec } from 'node:child_process';

const args = fetchArgs();

const langList: LangName[] = Object.keys(langName).filter(
   (l) => l === getLang(l) || l,
) as LangName[];

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
function getCode(open: number, close: number) {
   return {
      open: `\x1b[${open}m`,
      close: `\x1b[${close}m`,
      regexp: new RegExp(`\\x1b\\[${close}m`, 'g'),
   };
}

function run(str: string, code: ReturnType<typeof getCode>): string {
   return `${code.open}${str.replace(code.regexp, code.open)}${code.close}`;
}

function green(str: string): string {
   return run(str, getCode(32, 39));
}

function red(str: string): string {
   return run(str, getCode(31, 39));
}

function obtainTime(s: string): number[] {
   return s
      .split(': ')[1]
      .split(' ')
      .map(Number)
      .filter((n) => !isNaN(n));
}

const iteration = typeof args.bench === 'string' ? +args.bench : args.bench ? 1_000 : 1_000;
console.log('Benchmark iterating', iteration, 'times');
console.log('Measured in average milliseconds');

const baseline = '';
const totalTime: Record<string, number> = Object.keys(langName).reduce(
   (p, v) => ({ ...p, [langName[v as LangName]]: 0 }),
   {},
);

for (let year = yearStart; year <= yearEnd; year++) {
   for (let day = dayStart; day <= dayEnd; day++) {
      const results: Record<string, number[]> = Object.keys(langName).reduce(
         (p, v) => ({ ...p, [langName[v as LangName]]: [] }),
         {},
      );
      const memories: Record<string, number[]> = Object.keys(langName).reduce(
         (p, v) => ({ ...p, [langName[v as LangName]]: [] }),
         {},
      );
      for (const lang of langList) {
         const cmd = await promisify(exec)(
            'deno ' +
               [
                  'task',
                  'aoc',
                  '--lang',
                  lang,
                  '--year',
                  year.toString(),
                  '--day',
                  day.toString(),
                  '--bench',
                  iteration.toString(),
               ].join(' '),
         );

         const output = cmd.stdout.trim().split('\n');
         if (
            output.some((e) => e.startsWith('make: ***')) ||
            !output.some((e) => e.startsWith('Memory used'))
         ) {
            delete results[langName[lang]];
            continue;
         }
         const idx = output.findIndex((e) => e.startsWith('Benchmarking...'));
         const benchmarks = output
            .slice(idx)
            .filter((e) => e.startsWith('Overall:'));
         const mems = output
            .slice(idx)
            .filter((e) => e.startsWith('Memory used'));
         results[langName[lang]][0] = obtainTime(benchmarks.at(1)!)[2];
         results[langName[lang]][1] = obtainTime(benchmarks.at(3)!)[2];
         results[langName[lang]][2] = results[langName[lang]][0] + results[langName[lang]][1];
         memories[langName[lang]][0] = +mems[0].split(' ').at(-1)! / 1024;
         totalTime[langName[lang]] += results[langName[lang]][2];
      }

      const min = [
         Math.min(...Object.values(results).map((v) => v[0])),
         Math.min(...Object.values(results).map((v) => v[1])),
         Math.min(...Object.values(results).map((v) => v[2])),
         Math.min(
            ...Object.values(totalTime)
               .filter((x) => x)
               .map((v) => v),
         ),
      ];
      const max = [
         Math.max(...Object.values(results).map((v) => v[0])),
         Math.max(...Object.values(results).map((v) => v[1])),
         Math.max(...Object.values(results).map((v) => v[2])),
         Math.max(
            ...Object.values(totalTime)
               .filter((x) => x)
               .map((v) => v),
         ),
      ];
      const minPeak = Math.min(
         ...Object.values(memories)
            .filter((x) => x[0] > 0)
            .map((v) => v[0]),
      );
      const maxPeak = Math.max(...Object.values(memories).map((v) => v[0]));
      console.log('\n', year, '--', day);
      console.log(
         ''.padStart(16, ' '),
         '    Part',
         1,
         '    Part',
         2,
         '     Total',
         '          Overall',
         '           Memory',
      );
      for (const lang in results) {
         const total = totalTime[lang];
         console.log(
            lang.padStart(16, ' '),
            '|',
            results[lang]
               .map((v, i) =>
                  min[i] === v
                     ? green(v.toFixed(3).padStart(8, ' '))
                     : max[i] === v
                     ? red(v.toFixed(3).padStart(8, ' '))
                     : v.toFixed(3).padStart(8, ' ')
               )
               .join('   '),
            results[lang][2] === min[2]
               ? ''.padStart(8, ' ')
               : ((results[lang][2] / min[2]).toFixed(2) + 'x').padStart(
                  8,
                  ' ',
               ),
            total === min[3]
               ? green(total.toFixed(3).padStart(8, ' '))
               : max[3] === total
               ? red(total.toFixed(3).padStart(8, ' '))
               : total.toFixed(3).padStart(8, ' '),
            totalTime[lang] === min[3]
               ? ''.padStart(8, ' ')
               : ((totalTime[lang] / min[3]).toFixed(2) + 'x').padStart(8, ' '),
            memories[lang][0] === 0
               ? ''.padStart(8, ' ')
               : minPeak === memories[lang][0]
               ? green(memories[lang][0].toFixed(2).padStart(8, ' '))
               : maxPeak === memories[lang][0]
               ? red(memories[lang][0].toFixed(2).padStart(8, ' '))
               : memories[lang][0].toFixed(2).padStart(8, ' '),
            memories[lang][0] === 0
               ? ''.padStart(8, ' ')
               : minPeak === memories[lang][0]
               ? ''.padStart(8, ' ')
               : (
                  (memories[lang][0] / (minPeak || 1)).toFixed(2) + 'x'
               ).padStart(8, ' '),
         );
      }
   }
   console.log();
}
