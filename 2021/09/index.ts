export const part1 = async (path = '') => {
   const fileInput = await Deno.readTextFile(path + 'input.txt');
   const startTime = performance.now();

   const parsed = fileInput
      .trim()
      .split('\n')
      .filter((s) => s !== '')
      .map((n) => n.split('').map((s) => parseInt(s)));

   const maxW = parsed[0].length;
   const maxH = parsed.length;

   let count = 0;
   for (let h = 0; h < maxH; h++) {
      for (let w = 0; w < maxW; w++) {
         if (
            parsed[h][w] < (parsed[h - 1]?.[w] ?? 9) && // dont mind if i do
            parsed[h][w] < (parsed[h + 1]?.[w] ?? 9) &&
            parsed[h][w] < (parsed[h][w - 1] ?? 9) &&
            parsed[h][w] < (parsed[h][w + 1] ?? 9)
         ) {
            count += parsed[h][w] + 1;
         }
      }
   }

   const runTime = performance.now() - startTime;
   return [count, runTime];
};

export const part2 = async (path = '') => {
   const fileInput = await Deno.readTextFile(path + 'input.txt');
   const startTime = performance.now();

   const parsed = fileInput
      .trim()
      .split('\n')
      .filter((s) => s !== '')
      .map((n) => n.split('').map((s) => parseInt(s)));

   const maxW = parsed[0].length;
   const maxH = parsed.length;

   const position: [number, number][] = [];
   for (let h = 0; h < maxH; h++) {
      for (let w = 0; w < maxW; w++) {
         if (
            parsed[h][w] < (parsed[h - 1]?.[w] ?? 9) &&
            parsed[h][w] < (parsed[h + 1]?.[w] ?? 9) &&
            parsed[h][w] < (parsed[h][w - 1] ?? 9) &&
            parsed[h][w] < (parsed[h][w + 1] ?? 9)
         ) {
            position.push([w, h]);
         }
      }
   }

   const traverse = (x: number, y: number, ary: string[]): void => {
      if (9 > (parsed[y - 1]?.[x] ?? 9) && !ary.includes(`${x},${y - 1}`)) {
         ary.push(`${x},${y - 1}`);
         traverse(x, y - 1, ary);
      }
      if (9 > (parsed[y + 1]?.[x] ?? 9) && !ary.includes(`${x},${y + 1}`)) {
         ary.push(`${x},${y + 1}`);
         traverse(x, y + 1, ary);
      }
      if (9 > (parsed[y][x - 1] ?? 9) && !ary.includes(`${x - 1},${y}`)) {
         ary.push(`${x - 1},${y}`);
         traverse(x - 1, y, ary);
      }
      if (9 > (parsed[y][x + 1] ?? 9) && !ary.includes(`${x + 1},${y}`)) {
         ary.push(`${x + 1},${y}`);
         traverse(x + 1, y, ary);
      }
   };

   const search = (x: number, y: number): string[] => {
      const ary: string[] = [];
      traverse(x, y, ary);
      return ary;
   };

   const size = [];
   for (const p of position) {
      const ary = search(...p).map((n) => n.split(',').map((m) => parseInt(m)));
      size.push(ary.length);
   }
   size.sort((a, b) => b - a);
   const total = size[0] * size[1] * size[2];
   const runTime = performance.now() - startTime;
   return [total, runTime];
};
