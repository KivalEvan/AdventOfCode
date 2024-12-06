
using Core;

namespace Year2024;
public static class Day06
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private Coordinate FindStart(char[][] grid)
   {
      for (int y = 0; y < grid.Length; y++)
      {
         for (int x = 0; x < grid[0].Length; x++)
         {
            if (grid[y][x] == '^')
            {
               return new Coordinate { x = x, y = y };
            }
         }
      }
      throw new Exception("Start not found");
   }

   struct Coordinate
   {
      public int x;
      public int y;
   }

   static string Part1(string input, bool isTest = false)
   {
      var gridL = input.Split('\n').Select(line =>
      {
         var l = line.ToList();
         l.Insert(0, 'x');
         l.Add('x');
         return l.ToArray();
      }).ToList();
      gridL.Insert(0, Enumerable.Repeat('x', gridL[0].Length).ToArray());
      gridL.Add(Enumerable.Repeat('x', gridL[0].Length).ToArray());
      var grid = gridL.Select(line => line.ToArray()).ToArray();
      var visited = new bool[grid.Length][];
      for (int i = 0; i < grid.Length; i++)
      {
         visited[i] = new bool[grid[0].Length];
      }

      var location = FindStart(grid);
      (int x, int y)[] direction = { (0, -1), (1, 0), (0, 1), (-1, 0) };
      var directionIndex = 0;

      while (true)
      {
         visited[location.y][location.x] = true;
         var xNext = location.x + direction[directionIndex].x;
         var yNext = location.y + direction[directionIndex].y;

         if (grid[yNext][xNext] == 'x') break;

         if (grid[yNext][xNext] == '#')
         {
            directionIndex++;
            directionIndex %= direction.Length;
         }
         else
         {
            location.x = xNext;
            location.y = yNext;
         }
      }

      return visited.SelectMany(v => v).Where(v => v).Count().ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      var gridL = input.Split('\n').Select(line =>
      {
         var l = line.ToList();
         l.Insert(0, 'x');
         l.Add('x');
         return l.ToArray();
      }).ToList();
      gridL.Insert(0, Enumerable.Repeat('x', gridL[0].Length).ToArray());
      gridL.Add(Enumerable.Repeat('x', gridL[0].Length).ToArray());
      var grid = gridL.Select(line => line.ToArray()).ToArray();
      var visited = new bool[grid.Length][];
      for (int i = 0; i < grid.Length; i++)
      {
         visited[i] = new bool[grid[0].Length];
      }

      (int x, int y)[] direction = [(0, -1), (1, 0), (0, 1), (-1, 0)];
      var directionIndex = 0;
      var location = FindStart(grid);
      while (true)
      {
         visited[location.y][location.x] = true;
         var xNext = location.x + direction[directionIndex].x;
         var yNext = location.y + direction[directionIndex].y;

         if (grid[yNext][xNext] == 'x') break;

         if (grid[yNext][xNext] == '#')
         {
            directionIndex++;
            directionIndex %= direction.Length;
         }
         else
         {
            location.x = xNext;
            location.y = yNext;
         }
      }

      var maxVisit = visited.SelectMany(v => v).Where(v => v).Count() * 2;
      var locationOg = FindStart(grid);
      var count = 0;
      for (int y = 1; y < grid.Length - 1; y++)
      {
         for (int x = 1; x < grid[0].Length - 1; x++)
         {
            if (!visited[y][x] || grid[y][x] == '#' || grid[y][x] == '^') continue;

            grid[y][x] = '#';
            location = new Coordinate { x = locationOg.x, y = locationOg.y };
            directionIndex = 0;
            var maxIteration = maxVisit;
            while (maxIteration > 0)
            {
               var xNext = location.x + direction[directionIndex].x;
               var yNext = location.y + direction[directionIndex].y;

               if (grid[yNext][xNext] == 'x') break;

               if (grid[yNext][xNext] == '#')
               {
                  directionIndex++;
                  directionIndex %= direction.Length;
               }
               else
               {
                  location.x = xNext;
                  location.y = yNext;
               }
               maxIteration--;
            }
            if (maxIteration == 0)
            {
               count++;
            }
            grid[y][x] = '.';
         }
      }
      return count.ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
