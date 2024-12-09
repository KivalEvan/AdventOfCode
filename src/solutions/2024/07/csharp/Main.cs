
using Core;

namespace Year2024;
public static class Day07
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static bool RecurseOut(long calculated, long[] values, int i, bool p2)
   {
      if (calculated < 0) return false;
      if (i == 0)
      {
         return calculated == values[0];
      }

      var stuff = Math.Pow(10, Math.Floor(Math.Log10(values[i])) + 1);
      return (
         (calculated % values[i] == 0 &&
            RecurseOut(calculated / values[i], values, i - 1, p2)) ||
         (p2 &&
            calculated % stuff == values[i] &&
            RecurseOut((long)Math.Floor(calculated / stuff), values, i - 1, p2)) ||
         RecurseOut(calculated - values[i], values, i - 1, p2)
      );
   }

   static string Solve(string input, bool p2)
   {
      long sum = 0;
      input.Split('\n').ToList().ForEach(line =>
      {
         var split = line.Split(": ");
         var toEqual = long.Parse(split[0]);
         var val = split[1].Split(" ").Select(long.Parse).ToArray();
         if (RecurseOut(toEqual, val, val.Length - 1, p2))
         {
            sum += toEqual;
         }
      });

      return sum.ToString();
   }

   static string Part1(string input, bool isTest = false)
   {
      return Solve(input, false);
   }

   static string Part2(string input, bool isTest = false)
   {
      return Solve(input, true);
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
