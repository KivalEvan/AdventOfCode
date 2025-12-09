
using System.Diagnostics;
using Core;

namespace Year2025;

public static class Day09
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private string Solve(string input, bool isTest, bool p2)
   {
      var points = input
         .Split('\n')
         .Select(x =>
         {
            var v = x.Split(',').Select(long.Parse).ToArray();
            return (x: v[0], y: v[1]);
         })
         .ToArray();

      var max = 0L;
      if (p2)
      {
         var newPointsX = points.Select(p => p.x).Order().Distinct().Select((p, i) => (i: i * 2, p)).ToDictionary(p => p.p, p => p.i);
         var newPointsY = points.Select(p => p.y).Order().Distinct().Select((p, i) => (i: i * 2, p)).ToDictionary(p => p.p, p => p.i);

         var maxX = newPointsX.Values.Max();
         var maxY = newPointsY.Values.Max();

         var grid = new bool[maxY + 1].Select(x => new bool[maxX + 1]).ToArray();

         for (var i = 0; i < points.Length; i++)
         {
            var point = points[i];
            var nextPoint = points[(i + 1) % points.Length];

            var x = newPointsX[point.x];
            var y = newPointsY[point.y];

            var nextX = newPointsX[nextPoint.x];
            var nextY = newPointsY[nextPoint.y];

            for (var j = Math.Min(y, nextY); j <= Math.Max(y, nextY); j++)
            {
               for (var k = Math.Min(x, nextX); k <= Math.Max(x, nextX); k++)
               {
                  grid[j][k] = true;
               }
            }
         }

         // flood fill
         var queue = new Queue<(long x, long y)>();

         bool SearchInside(long startX, long startY, (long x, long y) dir)
         {
            while (true)
            {
               startX += dir.x;
               startY += dir.y;
               if (startX < 0 || startX > maxX || startY < 0 || startY > maxY) return false;
               if (grid[startY][startX]) return true;
            }
         }

         for (var y = 0; y < grid.Length; y++)
         {
            for (var x = 0; x < grid[y].Length; x++)
            {
               if (grid[y][x]) continue;
               if (SearchInside(x, y, (-1, 0)) && SearchInside(x, y, (1, 0)) && SearchInside(x, y, (0, -1)) && SearchInside(x, y, (0, 1)))
               {
                  queue.Enqueue((x, y));
                  break;
               }
            }
            if (queue.Count > 0) break;
         }

         while (queue.Count > 0)
         {
            var (x, y) = queue.Dequeue();
            if (x < 0 || x > maxX || y < 0 || y > maxY) continue;
            if (grid[y][x]) continue;
            grid[y][x] = true;
            queue.Enqueue((x + 1, y));
            queue.Enqueue((x - 1, y));
            queue.Enqueue((x, y + 1));
            queue.Enqueue((x, y - 1));
         }

         bool Traverse((long x, long y) start, (long x, long y) end)
         {
            for (var j = Math.Min(start.y, end.y); j <= Math.Max(start.y, end.y); j++)
            {
               for (var k = Math.Min(start.x, end.x); k <= Math.Max(start.x, end.x); k++)
               {
                  if (!grid[j][k]) return false;
               }
            }
            return true;
         }

         for (var l = 0; l < points.Length - 1; l++)
         {
            for (var r = l + 1; r < points.Length; r++)
            {
               var pLX = newPointsX[points[l].x];
               var pLY = newPointsY[points[l].y];
               var pRX = newPointsX[points[r].x];
               var pRY = newPointsY[points[r].y];

               if (!grid[pLY][pRX] || !grid[pRY][pLX]) continue;

               var area = (Math.Abs(points[l].x - points[r].x) + 1) * (Math.Abs(points[l].y - points[r].y) + 1);
               if (area < max) continue;

               if (!Traverse((pLX, pLY), (pRX, pLY))) continue;
               if (!Traverse((pRX, pLY), (pRX, pRY))) continue;
               if (!Traverse((pRX, pRY), (pLX, pRY))) continue;
               if (!Traverse((pLX, pRY), (pLX, pLY))) continue;

               max = area;
            }
         }

         // Console.WriteLine(string.Join('\n', grid.Select(row => string.Join("", string.Join("", row.Select(x => x ? "#" : "."))))));
      }
      else
      {
         for (var l = 0; l < points.Length - 1; l++)
         {
            for (var r = l + 1; r < points.Length; r++)
            {
               var area = (Math.Abs(points[l].x - points[r].x) + 1) * (Math.Abs(points[l].y - points[r].y) + 1);
               if (max < area)
               {
                  max = area;
               }
            }
         }
      }

      return max.ToString();
   }

   static string Part1(string input, bool isTest = false)
   {
      return Solve(input, isTest, false);
   }

   static string Part2(string input, bool isTest = false)
   {
      return Solve(input, isTest, true);
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
