import { run } from 'src/run.ts';

const enum Type {
   BROADCAST,
   FLIP_FLOP,
   CONJUNCTION,
}

interface Module {
   type: Type;
   target: string[];
   input: string[];
}

interface Broadcaster extends Module {
   type: Type.BROADCAST;
}

interface FlipFlop extends Module {
   type: Type.FLIP_FLOP;
   state: boolean;
}

interface Conjunctions extends Module {
   type: Type.CONJUNCTION;
   memory: Record<string, boolean>;
}

type AllModule = Broadcaster | FlipFlop | Conjunctions;

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

function parseInput(input: string) {
   const lines = input.split('\n');
   const modules: Record<string, AllModule> = {};

   for (const line of lines) {
      const part = line.split(' -> ');
      const target = part[1].split(', ');
      const name = part[0].slice(1);
      if (part[0] === 'broadcaster') {
         modules['broadcaster'] = {
            type: Type.BROADCAST,
            target,
            input: [],
         };
      }
      if (part[0].startsWith('%')) {
         modules[name] = {
            type: Type.FLIP_FLOP,
            target,
            input: [],
            state: false,
         };
      }
      if (part[0].startsWith('&')) {
         modules[name] = {
            type: Type.CONJUNCTION,
            target,
            input: [],
            memory: {},
         };
      }
   }

   for (const name in modules) {
      const module = modules[name];
      for (const t of module.target) {
         if (!(t in modules)) {
            modules[t] = {
               type: Type.FLIP_FLOP,
               target: [],
               input: [],
               state: false,
            };
         }
      }
   }

   for (const name in modules) {
      const module = modules[name];
      for (const t of module.target) {
         const target = modules[t];
         if (!target.input.includes(name)) target.input.push(name);
      }
   }

   for (const name in modules) {
      const module = modules[name];
      if (module.type === Type.CONJUNCTION) {
         for (const t of module.input) {
            module.memory[t] = false;
         }
      }
   }

   return modules;
}

export function part1(input: string, _isTest: boolean): string {
   const modules = parseInput(input);
   let low = 0;
   let high = 0;
   const queue: [string, string, boolean][] = [];

   function processSignal(source: string, target: string, signal: boolean) {
      if (signal) high++;
      else low++;

      const mod = modules[target];

      if (mod.type === Type.BROADCAST) {
         mod.target.forEach((out) => {
            queue.push([target, out, signal]);
         });
         return;
      }

      if (mod.type === Type.FLIP_FLOP) {
         if (signal === false) {
            if (mod.state === false) {
               mod.state = true;
               mod.target.forEach((out) => {
                  queue.push([target, out, true]);
               });
            } else {
               mod.state = false;
               mod.target.forEach((out) => {
                  queue.push([target, out, false]);
               });
            }
         }
         return;
      }

      if (mod.type === Type.CONJUNCTION) {
         mod.memory[source] = signal;
         if (Object.values(mod.memory).every((pt) => pt === true)) {
            mod.target.forEach((out) => {
               queue.push([target, out, false]);
            });
         } else {
            mod.target.forEach((out) => {
               queue.push([target, out, true]);
            });
         }
      }
   }

   let i = 0;
   while (i < 1000) {
      queue.push(['button', 'broadcaster', false]);
      while (queue.length) processSignal(...queue.shift()!);
      i++;
   }

   return (low * high).toString();
}

export function part2(input: string, _isTest: boolean): string {
   return '';
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
