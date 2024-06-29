import { fetchArgs } from './args.ts';
import { green, red } from './deps.ts';
import { getLang, LangName, langName } from './lang.ts';

const args = fetchArgs();

const langList: LangName[] = Object.keys(langName).filter(
   (l) => l === getLang(l) || l,
) as LangName[];

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

function obtainTime(s: string): number[] {
   return s
      .split(': ')[1]
      .split(' ')
      .map(Number)
      .filter((n) => !isNaN(n));
}

const itBench = typeof args.b === 'string' ? +args.b : args.b ? 1_000 : 1_000;
console.log('Benchmark iterating', itBench, 'times');
console.log('Measured in average milliseconds');

const baseline = '';

for (let year = yearStart; year <= yearEnd; year++) {
   for (let day = dayStart; day <= dayEnd; day++) {
      const results: Record<string, number[]> = Object.keys(langName).reduce(
         (p, v) => ({ ...p, [langName[v as LangName]]: [] }),
         {},
      );
      console.log('\n', year, '--', day);
      for (const lang of langList) {
         const { code, stdout, stderr } = await new Deno.Command('deno', {
            args: [
               'task',
               'aoc',
               'bench',
               '--lang',
               lang,
               '--year',
               year.toString(),
               '--day',
               day.toString(),
               '--bench',
               itBench.toString(),
            ],
         }).output();

         const output = new TextDecoder().decode(stdout).trim().split('\n');
         const idx = output.findIndex((e) => e.startsWith('Benchmarking '));
         if (idx === -1) {
            delete results[langName[lang]];
            continue;
         }
         const benchmarks = output.slice(idx);
         results[langName[lang]][0] = obtainTime(benchmarks.at(8)!)[2];
         results[langName[lang]][1] = obtainTime(benchmarks.at(-1)!)[2];
         results[langName[lang]][2] = results[langName[lang]][0] + results[langName[lang]][1];
      }

      const min = [
         Math.min(...Object.values(results).map((v) => v[0])),
         Math.min(...Object.values(results).map((v) => v[1])),
         Math.min(...Object.values(results).map((v) => v[2])),
      ];
      const max = [
         Math.max(...Object.values(results).map((v) => v[0])),
         Math.max(...Object.values(results).map((v) => v[1])),
         Math.max(...Object.values(results).map((v) => v[2])),
      ];
      console.log(
         ''.padStart(16, ' '),
         '    Part',
         1,
         '    Part',
         2,
         '     Total',
      );
      for (const lang in results) {
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
               ? ''
               : ((results[lang][2] / min[2]).toFixed(2) + 'x').padStart(8, ' '),
         );
      }
   }
   console.log();
}
