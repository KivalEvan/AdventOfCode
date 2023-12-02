import { run } from 'utils/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function getSequences(game: string): { red: number; green: number; blue: number }[] {
   return game
      .slice(game.indexOf(':') + 1)
      .split(';')
      .map((str) =>
         str
            .split(',')
            .map((s) => s.trim())
            .reduce((shown, value) => {
               const v = value.split(' ');
               shown[v[1] as 'red'] = Number(v[0]);
               return shown;
            }, {} as { red: number; green: number; blue: number })
      );
}

export function part1(input: string): string {
   return input
      .split('\n')
      .reduce((result, game, idx) => {
         const sequences = getSequences(game);
         for (const seq of sequences) {
            if (seq.red > 12 || seq.green > 13 || seq.blue > 14) {
               return result;
            }
         }
         return result + idx + 1;
      }, 0)
      .toString();
}

export function part2(input: string): string {
   return input
      .split('\n')
      .reduce((result, game, _) => {
         const sequences = getSequences(game);
         let red = 0;
         let green = 0;
         let blue = 0;
         for (const seq of sequences) {
            if (seq.red) red = Math.max(red, seq.red);
            if (seq.green) green = Math.max(green, seq.green);
            if (seq.blue) blue = Math.max(blue, seq.blue);
         }
         return result + red * green * blue;
      }, 0)
      .toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
