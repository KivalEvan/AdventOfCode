import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

export const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

export function part1(input: string, _isTest: boolean): string {
   return '';
}

export function part2(input: string, _isTest: boolean): string {
   return '';
}

if (import.meta.main) {
   run(Deno.args, part1, part2, options);
}
