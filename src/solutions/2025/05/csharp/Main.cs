
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using Core;

namespace Year2025;

public static class Day05
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private string Solve(string input, bool isTest, bool p2)
   {
      var chunks = input.Split("\n\n");
      var ranges = chunks[0]
         .Split('\n')
         .Select(x =>
         {
            var m = x.Split('-')
               .Select(long.Parse)
               .ToArray();
            return (min: m[0], max: m[1]);
         })
         .ToArray();

      if (p2)
      {
         var highestMin = 0L;
         return ranges
            .OrderBy(r => r.min)
            .Sum(current =>
            {
               var res = Math.Max(current.max + 1 - Math.Max(current.min, highestMin), 0);
               highestMin = Math.Max(highestMin, current.max + 1);
               return res;
            })
            .ToString();
      }
      return chunks[1]
         .Split('\n')
         .Select(long.Parse)
         .Count(x => ranges.Any(r => x >= r.min && x <= r.max))
         .ToString();

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
