import { resolve } from '../src/ts/deps.ts';
import { run } from '../src/ts/run.ts';

interface Main {
   HAS_ALTERNATE: boolean;
   part1: (path: string) => string;
   part2: (path: string) => string;
}

export default async function ts(y: number, d: number, benchmark = false) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}`);
   const main = (await import(resolve(path, 'ts', 'main.ts'))) as Main;
   if (!main) throw new Error('Main file not found.');

   console.log('Running...');
   run(resolve(path, 'main.ts'), main.part1, main.part2, main.HAS_ALTERNATE, benchmark);
}
