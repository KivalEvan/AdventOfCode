export function solve(input: string, p2: boolean): string {
   let point = 10050;
   return input
      .split("\n")
      .reduce((acc, n) => {
         const num = parseInt(n.slice(1));
         const direction = n[0] === "R" ? num : -num;

         let zero = 0;
         if (p2) {
            zero += Math.abs(Math.floor((Math.floor(point % 100) + direction) / 100));
            point += direction;
            console.log(zero, point);
         }
         else {
            point += direction;
            if (point % 100 === 0) zero++;
         }

         return acc + zero;
      }, 0)
      .toString();
}
