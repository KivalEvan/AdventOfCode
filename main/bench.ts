import { promisify } from "node:util";
import { fetchArgs } from "./args.ts";
import { getLang, LangName, langName } from "./lang.ts";
import { exec } from "node:child_process";

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
      regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
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
      .split(": ")[1]
      .split(" ")
      .map(Number)
      .filter((n) => !isNaN(n));
}

const iteration = typeof args.bench === "string" ? +args.bench : args.bench ? 1_000 : 1_000;
console.log("Benchmark iterating", iteration, "times");
console.log("Measured in average milliseconds");

const baseline = "";
const overallTimes: Record<string, number> = Object.keys(langName).reduce(
   (p, v) => ({ ...p, [langName[v as LangName]]: 0 }),
   {},
);

for (let year = yearStart; year <= yearEnd; year++) {
   for (let day = dayStart; day <= dayEnd; day++) {
      const timers: Record<string, number[]> = Object.keys(langName).reduce(
         (p, v) => ({ ...p, [langName[v as LangName]]: [] }),
         {},
      );
      const memories: Record<string, number[]> = Object.keys(langName).reduce(
         (p, v) => ({ ...p, [langName[v as LangName]]: [] }),
         {},
      );
      for (const lang of langList) {
         const cmd = await promisify(exec)(
            "deno "
               + [
                  "task",
                  "aoc",
                  "--lang",
                  lang,
                  "--year",
                  year.toString(),
                  "--day",
                  day.toString(),
                  "--bench",
                  iteration.toString(),
               ].join(" "),
         );

         const output = cmd.stdout.trim().split("\n");
         if (
            output.some((e) => e.startsWith("make: ***"))
            || !output.some((e) => e.startsWith("Memory used"))
         ) {
            delete timers[langName[lang]];
            continue;
         }
         const idx = output.findIndex((e) => e.startsWith("Benchmarking..."));
         const benchmarks = output
            .slice(idx)
            .filter((e) => e.startsWith("Overall:"));
         const mems = output
            .slice(idx)
            .filter((e) => e.startsWith("Memory used"));
         const elapsed = output
            .slice(idx)
            .filter((e) => e.startsWith("Elapsed"));
         timers[langName[lang]][0] = obtainTime(benchmarks.at(1)!)[2];
         timers[langName[lang]][1] = obtainTime(benchmarks.at(3)!)[2];
         timers[langName[lang]][2] = timers[langName[lang]][0] + timers[langName[lang]][1];
         timers[langName[lang]][3] = +elapsed[0].split(" ").at(-1)!;
         memories[langName[lang]][0] = +mems[0].split(" ").at(-1)! / 1024;
         overallTimes[langName[lang]] += timers[langName[lang]][2];
      }

      const minTime = [
         Math.min(...Object.values(timers).map((v) => v[0])),
         Math.min(...Object.values(timers).map((v) => v[1])),
         Math.min(...Object.values(timers).map((v) => v[2])),
         Math.min(
            ...Object.values(overallTimes)
               .filter((x) => x)
               .map((v) => v),
         ),
         Math.min(...Object.values(timers).map((v) => v[3])),
      ];
      const maxTime = [
         Math.max(...Object.values(timers).map((v) => v[0])),
         Math.max(...Object.values(timers).map((v) => v[1])),
         Math.max(...Object.values(timers).map((v) => v[2])),
         Math.max(
            ...Object.values(overallTimes)
               .filter((x) => x)
               .map((v) => v),
         ),
         Math.max(...Object.values(timers).map((v) => v[3])),
      ];

      const minPeak = Math.min(
         ...Object.values(memories)
            .filter((x) => x[0] > 0)
            .map((v) => v[0]),
      );
      const maxPeak = Math.max(...Object.values(memories).map((v) => v[0]));
      console.log("\n", year, "--", day);
      console.log(
         "".padStart(16, " "),
         "    Part",
         1,
         "    Part",
         2,
         "     Total",
         "          Overall",
         "          Elapsed",
         "           Memory",
      );
      for (const lang in timers) {
         const overallTime = overallTimes[lang];
         console.log(
            lang.padStart(16, " "),
            "|",
            timers[lang]
               .slice(0, 3)
               .map((v, i) =>
                  minTime[i] === v
                     ? green(v.toFixed(3).padStart(8, " "))
                     : maxTime[i] === v
                     ? red(v.toFixed(3).padStart(8, " "))
                     : v.toFixed(3).padStart(8, " ")
               )
               .join("   "),
            timers[lang][2] === minTime[2]
               ? "".padStart(8, " ")
               : ((timers[lang][2] / minTime[2]).toFixed(2) + "x").padStart(
                  8,
                  " ",
               ),
            overallTime === minTime[3]
               ? green(overallTime.toFixed(3).padStart(8, " "))
               : maxTime[3] === overallTime
               ? red(overallTime.toFixed(3).padStart(8, " "))
               : overallTime.toFixed(3).padStart(8, " "),
            overallTimes[lang] === minTime[3]
               ? "".padStart(8, " ")
               : ((overallTimes[lang] / minTime[3]).toFixed(2) + "x").padStart(
                  8,
                  " ",
               ),
            minTime[4] === timers[lang][3]
               ? green(timers[lang][3].toFixed(2).padStart(8, " "))
               : maxTime[4] === timers[lang][3]
               ? red(timers[lang][3].toFixed(2).padStart(8, " "))
               : timers[lang][3].toFixed(2).padStart(8, " "),
            timers[lang][3] === minTime[4]
               ? "".padStart(8, " ")
               : ((timers[lang][3] / minTime[4]).toFixed(2) + "x").padStart(
                  8,
                  " ",
               ),
            memories[lang][0] === 0
               ? "".padStart(8, " ")
               : minPeak === memories[lang][0]
               ? green(memories[lang][0].toFixed(2).padStart(8, " "))
               : maxPeak === memories[lang][0]
               ? red(memories[lang][0].toFixed(2).padStart(8, " "))
               : memories[lang][0].toFixed(2).padStart(8, " "),
            memories[lang][0] === 0
               ? "".padStart(8, " ")
               : minPeak === memories[lang][0]
               ? "".padStart(8, " ")
               : (
                  (memories[lang][0] / (minPeak || 1)).toFixed(2) + "x"
               ).padStart(8, " "),
         );
      }
   }
   console.log();
}
