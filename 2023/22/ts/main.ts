import { run } from 'src/run.ts';

/** If part 2 test input has completely different input, set this to `true`. */
export const HAS_ALTERNATE = false;

type Vector3 = { x: number; y: number; z: number };
type Brick = {
   label: number;
   pos: [Vector3, Vector3];
   isOn: Brick[];
   supporting: Brick[];
};

function isAreaIntersect(v1: [Vector3, Vector3], v2: [Vector3, Vector3]) {
   const [r1, r2] = [v1, v2].map((v) => {
      return {
         x: [v[0].x, v[1].x].sort((a, b) => a - b),
         y: [v[0].y, v[1].y].sort((a, b) => a - b),
      };
   });

   return !(
      r2.x[0] > r1.x[1] ||
      r2.x[1] < r1.x[0] ||
      r2.y[0] > r1.y[1] ||
      r2.y[1] < r1.y[0]
   );
}

function constructGraph(input: string) {
   const bricks = input
      .split('\n')
      .map((str, i) => {
         return {
            label: i,
            pos: str
               .split('~')
               .map((m) => {
                  const temp = m.split(',').map(Number);
                  return { x: temp[0], y: temp[1], z: temp[2] };
               })
               .sort((a, b) => a.z - b.z) as [Vector3, Vector3],
            isOn: [] as Brick[],
            supporting: [] as Brick[],
         };
      })
      .reduce((obj, v) => {
         obj[v.label] = { ...v };
         return obj;
      }, {} as Record<number, Brick>);

   const bAry = Object.values(bricks);
   bAry.sort((a, b) => a.pos[0].z - b.pos[0].z);
   for (const currBrick of bAry) {
      const bBelow = bAry
         .filter(
            (b) =>
               isAreaIntersect(b.pos, currBrick.pos) &&
               b.pos[1].z < currBrick.pos[0].z,
         )
         .sort((a, b) => b.pos[1].z - a.pos[1].z)[0];
      if (bBelow) {
         const zDiff = currBrick.pos[0].z - bBelow.pos[1].z - 1;
         currBrick.pos[0].z -= zDiff;
         currBrick.pos[1].z -= zDiff;
      } else {
         const zDiff = currBrick.pos[0].z - 1;
         currBrick.pos[0].z -= zDiff;
         currBrick.pos[1].z -= zDiff;
      }
   }

   for (const currBrick of bAry) {
      const bricksBelow = bAry.filter(
         (b) =>
            isAreaIntersect(b.pos, currBrick.pos) &&
            currBrick.pos[0].z - b.pos[1].z === 1,
      );
      for (const belowBrick of bricksBelow) {
         belowBrick.supporting.push(bricks[currBrick.label]);
         currBrick.isOn.push(bricks[belowBrick.label]);
      }
   }

   return bricks;
}

export function part1(input: string, _isTest: boolean): string {
   const bricks = constructGraph(input);

   let safe = Object.keys(bricks).length;
   for (const _l in bricks) {
      const label = Number(_l);
      for (const brickAbove of bricks[label].supporting) {
         if (brickAbove.isOn.filter((e) => e.label !== label).length === 0) {
            safe--;
            break;
         }
      }
   }

   return safe.toString();
}

export function part2(input: string, _isTest: boolean): string {
   const bricks = constructGraph(input);

   let total = 0;
   for (const _l in bricks) {
      const label = Number(_l);
      for (const brickAbove of bricks[label].supporting) {
         if (brickAbove.isOn.filter((e) => e.label !== label).length === 0) {
            let sum = 0;
            const yeet = new Set([label]);
            let q = [...bricks[label].supporting];
            while (q.length) {
               const newQ: Brick[] = [];
               while (q.length) {
                  const b = q.pop()!;
                  if (yeet.has(b.label)) continue;
                  if (b.isOn.filter((e) => !yeet.has(e.label)).length > 0) {
                     continue;
                  }
                  yeet.add(b.label);
                  newQ.push(...b.supporting);
                  sum++;
               }
               q = newQ;
            }
            total += sum;
            break;
         }
      }
   }

   return total.toString();
}

if (import.meta.main) {
   run(import.meta.url, part1, part2, HAS_ALTERNATE);
}
