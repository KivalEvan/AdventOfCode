import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function getSequences(game: string): [number, 'red' | 'green' | 'blue'][] {
   return game
      .slice(game.indexOf(':') + 1)
      .split(/,|;/g)
      .map((str) => {
         const val = str.trim().split(' ');
         return [Number(val[0]), val[1] as 'red'];
      });
}

const RGB = [12, 13, 14];
function part1(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .map(getSequences)
      .reduce((result, cubes, idx) => {
         for (const cube of cubes) {
            const i = cube[1].charCodeAt(0) % 3;
            if (cube[0] > RGB[i]) return result;
         }
         return result + idx + 1;
      }, 0)
      .toString();
}

function part2(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .map(getSequences)
      .reduce((result, cubes) => {
         const rgb = [0, 0, 0];
         for (const cube of cubes) {
            const i = cube[1].charCodeAt(0) % 3;
            if (cube[0] > rgb[i]) rgb[i] = cube[0];
         }
         return result + rgb[0] * rgb[1] * rgb[2];
      }, 0)
      .toString();
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
