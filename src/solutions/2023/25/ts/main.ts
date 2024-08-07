import { argv } from 'node:process';
import type { SolutionOptions } from 'src/options.ts';
import { run } from 'src/run.ts';
import { mincut } from 'npm:@graph-algorithm/minimum-cut';

const options: SolutionOptions = {
   hasAlternate: false,
   hasIo: false,
};

function parseInput(input: string) {
   const edges: [string, string][] = [];
   const graph: Record<string, string[]> = {};

   input.split('\n').forEach((line) => {
      const [component, strAry] = line.split(': ');
      const connectedTo = strAry.split(' ');

      graph[component] ||= [];
      graph[component].push(...connectedTo);

      for (const otherComponent of connectedTo) {
         edges.push([component, otherComponent]);
         graph[otherComponent] ||= [];
         const alreadyConnected = graph[otherComponent];
         alreadyConnected.push(component);
      }
   });

   return [edges, graph] as const;
}

function cutConnection(
   graph: Record<string, string[]>,
   a: string,
   b: string,
): Record<string, string[]> {
   const nodesA = graph[a];
   const nodesB = graph[b];

   graph[a] = nodesA.filter((c) => c !== b);
   graph[b] = nodesB.filter((c) => c !== a);

   return graph;
}

function getGroups(graph: Record<string, string[]>) {
   const groups: string[][] = [];
   const visited = new Set<string>();

   for (const key in graph) {
      if (visited.has(key)) continue;

      const group: string[] = [];
      const queue = [key];

      while (queue.length > 0) {
         const connectedComponent = queue.pop()!;

         if (visited.has(connectedComponent)) continue;
         visited.add(connectedComponent);

         group.push(connectedComponent);
         queue.push(...graph[connectedComponent]);
      }

      groups.push(group);
   }

   return groups;
}

function part1(input: string, _isTest: boolean): string {
   const [edges, graph] = parseInput(input);

   for (const [a, b] of mincut(edges)) {
      cutConnection(graph, a, b);
   }

   const groups = getGroups(graph);
   return (groups[0].length * groups[1].length).toString();
}

function part2(input: string, _isTest: boolean): string {
   return '';
}

if (import.meta.main) {
   run(argv, part1, part2, options);
}
