import { parseArgs } from 'https://deno.land/std@0.208.0/cli/mod.ts';

const args = parseArgs(Deno.args, {
   string: ['d', 'y'],
   boolean: ['a'],
   alias: { d: 'day', a: 'all', y: 'year' },
});

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
}

if (args.d) {
   dayStart = parseInt(args.d);
   dayEnd = parseInt(args.d);
}

if (dayStart > 25 || dayEnd > 25) throw new Error('no');

for (let year = yearStart; year <= yearEnd; year++) {
   for (let day = dayStart; day <= dayEnd; day++) {
      console.log(`Fetching input for year ${year} day ${day}`);
      const response = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
         headers: [
            ['Cookie', `session=${Deno.env.get('AOC_COOKIE') || ''}`],
            ['User-Agent', 'github.com/KivalEvan/AdventOfCode/fetchInput.ts'],
         ],
      });
      if (response.body && response.status === 200) {
         console.log(`Writing input to input.txt`);
         const file = await Deno.open(`./${year}/${day.toString().padStart(2, '0')}/input.txt`, {
            write: true,
            create: true,
            truncate: true,
         });
         await response.body.pipeTo(file.writable);
      } else {
         console.error(response.status, response.statusText);
      }
      // i did this because im lazy when i was fetching all, you can comment below if u feel devious
      console.log('Sleeping for a minute');
      await new Promise((resolve) => setTimeout(resolve, 60000));
   }
}
