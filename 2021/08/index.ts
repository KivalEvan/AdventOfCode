export const part1 = async (path = '') => {
   const fileInput = await Deno.readTextFile(path + 'input.txt');
   const startTime = performance.now();

   const parsed = fileInput
      .trim()
      .split('\n')
      .filter((s) => s !== '')
      .map((n) => n.split('|').map((s) => s.trim().split(' ')));

   let count = 0;
   for (const line of parsed) {
      for (const d of line[1]) {
         if (d.length === 2) {
            count++;
         }
         if (d.length === 3) {
            count++;
         }
         if (d.length === 4) {
            count++;
         }
         if (d.length === 7) {
            count++;
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
      .map((n) => n.split('|').map((s) => s.trim().split(' ')));

   const pattern: { [key: string]: RegExp } = {
      0: /^[abcefg]{6}$/,
      1: /^[cf]{2}$/,
      2: /^[acdeg]{5}$/,
      3: /^[acdfg]{5}$/,
      4: /^[bcdf]{4}$/,
      5: /^[abdfg]{5}$/,
      6: /^[abdefg]{6}$/,
      7: /^[acf]{3}$/,
      8: /^[abcdefg]{7}$/,
      9: /^[abcdfg]{6}$/,
   };

   const difference = (curr: string, toComp: string): string => {
      let result = '';
      for (let i = 0; i < toComp.length; i++) {
         if (!curr.includes(toComp[i])) {
            result += toComp[i];
         }
      }
      return result;
   };
   const include = (curr: string, toComp: string): string => {
      let result = '';
      for (let i = 0; i < toComp.length; i++) {
         if (curr.includes(toComp[i])) {
            result += toComp[i];
         }
      }
      return result;
   };

   let count = 0;
   for (const line of parsed) {
      const mapping: { [key: string]: string } = {};

      const twoThreeFive = line[0].filter((l) => l.length === 5)!;
      const zeroSixNine = line[0].filter((l) => l.length === 6)!;

      const one = line[0].find((l) => l.length === 2)!;
      const four = line[0].find((l) => l.length === 4)!;
      const seven = line[0].find((l) => l.length === 3)!;
      const eight = line[0].find((l) => l.length === 7)!;
      const three = twoThreeFive.map((d) => [d, include(seven, d)]).find((d) =>
         d[1].length === 3
      )![0];
      twoThreeFive.splice(twoThreeFive.indexOf(three), 1);
      const nine =
         zeroSixNine.map((d) => [d, include(three, d)]).find((d) => d[1].length === 5)![0];
      zeroSixNine.splice(zeroSixNine.indexOf(nine), 1);
      const zero = zeroSixNine.map((d) => [d, include(one, d)]).find((d) => d[1].length === 2)![0];
      zeroSixNine.splice(zeroSixNine.indexOf(zero), 1);
      const six = zeroSixNine[0];
      const five = twoThreeFive.map((d) => [d, include(six, d)]).find((d) => d[1].length === 5)![0];
      twoThreeFive.splice(twoThreeFive.indexOf(five), 1);

      mapping.a = difference(one, seven);
      mapping.c = difference(six, eight);
      mapping.f = difference(mapping.a + mapping.c, one);
      mapping.d = difference(zero, eight);
      mapping.e = difference(nine, eight);
      mapping.b = difference(mapping.c + mapping.d + mapping.f, four);
      mapping.g = difference(Object.values(mapping).join('').trim(), eight);

      const digit = parseInt(
         line[1]
            .map((l) => {
               let str = '';
               for (const n of l) {
                  for (const p in mapping) {
                     if (mapping[p] === n) {
                        str += p;
                        break;
                     }
                  }
               }
               for (const p in pattern) {
                  if (str.match(pattern[p])) {
                     str = p.toString();
                     break;
                  }
               }
               return str;
            })
            .join(''),
      );

      count += digit;
   }

   const runTime = performance.now() - startTime;
   return [count, runTime];
};
