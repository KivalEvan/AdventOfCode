import { resolve } from '../src/ts/deps.ts';

export default async function ts(y: number, d: number, benchmark: number) {
   const path = resolve(`./${y}/${d.toString().padStart(2, '0')}`);

   console.log('Running...');
   const { code, stdout, stderr } = await new Deno.Command('make', {
      args: [
         'ts',
         'AOC_PATH=' + path,
         'BENCH=' + benchmark,
      ],
   }).output();

   console.assert(code === 0);
   console.log(new TextDecoder().decode(stderr));
   console.log(new TextDecoder().decode(stdout).trim());
}
