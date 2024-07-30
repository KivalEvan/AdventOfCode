import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function part1(input: string, _isTest: boolean): string {
   return '';
}

function part2(input: string, _isTest: boolean): string {
   return '';
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
