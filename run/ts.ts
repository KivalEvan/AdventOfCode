import { resolve } from 'utils/deps.ts';
import { run } from 'utils/run.ts';

interface Main {
   hasAlternate: boolean;
   part1: (path: string) => string;
   part2: (path: string) => string;
}

export default async function ts(y: number, d: number) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}/ts`);
   const main = (await import(resolve(path, 'main.ts'))) as Main;
   if (!main) throw new Error('Main file not found.');

   console.log('Running...');
   run(path + '/main.ts', main.part1, main.part2, main.hasAlternate);
}
