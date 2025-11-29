import { argv } from "node:process";
import type { SolutionOptions } from "src/options.ts";
import { run } from "src/run.ts";

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
   const [sections_str, pages_str] = input
      .split("\n\n")
      .map((lines) => lines.split("\n"));
   const sections_map: Record<number, number[]> = {};
   sections_str.forEach((section) => {
      const [k, v] = section.split("|").map(Number);
      sections_map[k] ||= [];
      sections_map[k].push(v);
   });

   let total = 0;
   const pages = pages_str.map((page) => page.split(",").map(Number));
   main: for (const page of pages) {
      for (let i = 0; i < page.length; i++) {
         for (let j = i + 1; j < page.length; j++) {
            if (!sections_map[page[i]]?.includes(page[j])) {
               continue main;
            }
         }
      }
      total += page[Math.floor(page.length / 2)];
   }

   return total.toString();
}

function part2(input: string, _isTest: boolean): string {
   const [sections_str, pages_str] = input
      .split("\n\n")
      .map((lines) => lines.split("\n"));
   const sections_map: Record<number, number[]> = {};
   sections_str.forEach((section) => {
      const [k, v] = section.split("|").map(Number);
      sections_map[k] ||= [];
      sections_map[k].push(v);
   });

   let total = 0;
   const pages = pages_str.map((page) => page.split(",").map(Number));
   main: for (const page of pages) {
      for (let i = 0; i < page.length; i++) {
         for (let j = i + 1; j < page.length; j++) {
            if (!sections_map[page[i]]?.includes(page[j])) {
               total += page.find(
                  (val) =>
                     new Set(sections_map[val]).intersection(new Set(page))
                        .size === Math.floor(page.length / 2),
               )!;
               continue main;
            }
         }
      }
   }

   return total.toString();
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
