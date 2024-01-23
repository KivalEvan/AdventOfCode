import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function getSequences(game: string): [number, 'red' | 'green' | 'blue'][] {
   return game
      .slice(game.indexOf(':') + 1)
      .split(/,|;/g)
      .map((str) => {
         const val = str.trim().split(' ');
         return [Number(val[0]), val[1] as 'red'];
      });
}

export function part1(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .map(getSequences)
      .reduce((result, cubes, idx) => {
         for (const cube of cubes) {
            if (cube[1] === 'red' && cube[0] > 12) return result;
            if (cube[1] === 'green' && cube[0] > 13) return result;
            if (cube[1] === 'blue' && cube[0] > 14) return result;
         }
         return result + idx + 1;
      }, 0)
      .toString();
}

export function part2(input: string, _isTest: boolean): string {
   return input
      .split('\n')
      .map(getSequences)
      .reduce((result, cubes) => {
         let red = 0;
         let green = 0;
         let blue = 0;
         for (const cube of cubes) {
            if (cube[1] === 'red' && cube[0] > red) red = cube[0];
            if (cube[1] === 'green' && cube[0] > green) green = cube[0];
            if (cube[1] === 'blue' && cube[0] > blue) blue = cube[0];
         }
         return result + red * green * blue;
      }, 0)
      .toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
