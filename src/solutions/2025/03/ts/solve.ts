export function solve(input: string, isTest: boolean, p2: boolean): string {
   return input
      .split("\n")
      .reduce((acc, line) => {
         let res = 0;
         let start = 0;
         const max = p2 ? 12 : 2;
         for (let digit = 0; digit < max; digit++) {
            let marked = 0;
            let n = 0;
            const t = max - 1 - digit;
            const l = line.length - t;
            for (let it = start; it < l; it++) {
               const parsed = parseInt(line[it]);
               if (n < parsed) {
                  marked = it;
                  n = parsed;
               }
            }
            start = marked + 1;
            res += n * Math.pow(10, max - 1 - digit);
         }
         return acc + res;
      }, 0)
      .toString();
}
