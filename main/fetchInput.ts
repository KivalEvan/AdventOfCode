import { env } from "node:process";
import { fetchArgs } from "./args.ts";
import { writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";

const args = fetchArgs();

const currDate = new Date();
let yearStart = currDate.getFullYear();
let yearEnd = currDate.getFullYear();
let dayStart = currDate.getDate();
let dayEnd = currDate.getDate();

if (args.all) {
   yearStart = 2015;
   yearEnd = currDate.getFullYear();
   dayStart = 1;
   dayEnd = 25;
}

if (args.year) {
   yearStart = parseInt(args.year);
   yearEnd = parseInt(args.year);
}

if (args.day) {
   dayStart = parseInt(args.day);
   dayEnd = parseInt(args.day);
}

if (dayStart > 25 || dayEnd > 25) throw new Error("no");

for (let year = yearStart; year <= yearEnd; year++) {
   for (let day = dayStart; day <= dayEnd; day++) {
      console.log(`Fetching input for year ${year} day ${day}`);
      const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
         headers: [
            ["Cookie", `session=${env.AOC_COOKIE || ""}`],
            ["User-Agent", "github.com/KivalEvan/AdventOfCode/fetchInput.ts"],
         ],
      });
      if (response.body && response.status === 200) {
         console.log(`Writing input to input.txt`);
         writeFile(
            `./${year}/${day.toString().padStart(2, "0")}/input.txt`,
            Buffer.from(await response.arrayBuffer()),
         );
      }
      else {
         console.error(response.status, response.statusText);
      }
      // i did this because im lazy when i was fetching all, you can comment below if u feel devious
      console.log("Sleeping for a minute");
      await new Promise((resolve) => setTimeout(resolve, 60000));
   }
}
