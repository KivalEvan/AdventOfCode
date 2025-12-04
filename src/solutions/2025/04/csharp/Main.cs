
using System.Runtime.CompilerServices;
using Core;

namespace Year2025;

public static class Day04
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static byte CountNeighbour(int x, int y, int max, string grid)
   {
      var adjacent = 0;
      for (var nX = -1; nX <= 1; nX++)
         for (var nY = -1; nY <= 1; nY++)
         {
            var index = max * (y + nY) + x + nX + y + nY;
            if (index < 0 || index >= grid.Length) continue;
            if (grid[index] == '@') adjacent++;
         }

      return (byte)(adjacent - 1);
   }

   static void UpdateNeighbour(int x, int y, int max, byte[] grid, Stack<(int x, int y)> stack)
   {
      for (var nX = -1; nX <= 1; nX++)
         for (var nY = -1; nY <= 1; nY++)
         {
            var index = max * (y + nY) + x + nX + y + nY;
            if (index < 0 || index >= grid.Length) continue;
            grid[index]--;
            if (grid[index] == 3) stack.Push((x + nX, y + nY));
         }
   }

   static private string Solve(string input, bool isTest, bool p2)
   {
      var grid = new byte[input.Length];
      var max = input.IndexOf('\n');

      var candidates = new Stack<(int x, int y)>();
      for (var y = 0; y < max; y++)
         for (var x = 0; x < max; x++)
         {
            var index = max * y + x + y;
            if (input[index] == '@')
            {
               grid[index] = CountNeighbour(x, y, max, input);
               if (grid[index] < 4) candidates.Push((x, y));
            }
         }

      if (!p2) return candidates.Count.ToString();

      var total = 0;
      while (candidates.Count > 0)
      {
         total++;
         var (x, y) = candidates.Pop();
         grid[max * y + x + y] = 0;
         UpdateNeighbour(x, y, max, grid, candidates);
      }
      return total.ToString();
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
