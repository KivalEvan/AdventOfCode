export const part1 = async (path = '') => {
   const fileInput = await Deno.readTextFile(path + 'input.txt');
   const startTime = performance.now();

   const parsed = fileInput
      .trim()
      .split(',')
      .map((n) => parseInt(n));

   const maxH = Math.max(...parsed);

   let min = Number.MAX_SAFE_INTEGER;
   for (let h = maxH; h >= 0; h--) {
      min = Math.min(
         min,
         parsed.reduce((t, c) => t + Math.abs(c - h), 0),
      );
   }
   const runTime = performance.now() - startTime;
   return [min, runTime];
};

export const part2 = async (path = '') => {
   const fileInput = await Deno.readTextFile(path + 'input.txt');
   const startTime = performance.now();

   const parsed = fileInput
      .trim()
      .split(',')
      .map((n) => parseInt(n));

   const maxH = Math.max(...parsed);

   const partialSum = (n: number): number => {
      return (n * (n + 1)) / 2;
   };

   let min = Number.MAX_SAFE_INTEGER;
   for (let h = maxH; h >= 0; h--) {
      min = Math.min(
         min,
         parsed.reduce((t, c) => t + partialSum(Math.abs(c - h)), 0),
      );
   }
   const runTime = performance.now() - startTime;
   return [min, runTime];
};
