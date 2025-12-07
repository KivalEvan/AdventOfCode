
using Core;

namespace Year2025;

public static class Day07
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private string Solve(string input, bool isTest, bool p2)
   {
      var splitters = input
         .Split('\n')
         .Select(s => s
            .Select((c, i) => c == '^' ? i : -1)
            .Where(i => i != -1)
            .ToArray())
         .Where(s => s.Length > 0)
         .ToArray();

      Dictionary<(int, int), long> visited = new(2047);
      long Depth(int column, int row)
      {
         if (row >= splitters.Length)
         {
            return 1L;
         }
         if (visited.ContainsKey((column, row))) return visited[(column, row)];

         long res;
         if (splitters[row].Contains(column))
         {
            res = Depth(column - 1, row + 1) + Depth(column + 1, row + 1);
            visited[(column, row)] = res;
         }
         else
         {
            res = Depth(column, row + 1);
         }

         return res;
      }

      var timelines = Depth(input.IndexOf('S'), 0).ToString();
      return p2 ? timelines.ToString() : visited.Count.ToString();
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
