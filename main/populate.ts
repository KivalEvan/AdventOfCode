import { ensureFileSync } from 'https://deno.land/std@0.208.0/fs/mod.ts';

for (let year = 2015; year <= new Date().getFullYear(); year++) {
   for (let day = 1; day <= 25; day++) {
      // to get input, use fetchInput.ts script, otherwise manually copy over
      ensureFileSync(`./src/solutions/${year}/${day.toString().padStart(2, '0')}/input.txt`);
      ensureFileSync(`./src/solutions/${year}/${day.toString().padStart(2, '0')}/test1.txt`);
      ensureFileSync(`./src/solutions/${year}/${day.toString().padStart(2, '0')}/test2.txt`);
      ensureFileSync(`./src/solutions/${year}/${day.toString().padStart(2, '0')}/answers.txt`);
   }
}
