
using System.Text;
using Core;

namespace Year2025;

public static class Day03
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private string Solve(string input, bool isTest, bool p2)
   {
      var res = 0.0;
      foreach (var line in input.Split('\n'))
      {
         var start = 0;
         var max = p2 ? 12 : 2;
         for (var digit = 0; digit < max; digit++)
         {
            var marked = 0;
            var n = 0;
            var t = max - 1 - digit;
            var l = line.Length - t;
            for (var it = start; it < l; it++)
            {
               var parsed = line[it] - '0';
               if (n < parsed)
               {
                  marked = it;
                  n = parsed;
               }
            }
            start = marked + 1;
            res += n * Math.Pow(10, t);
         }
      }
      return res.ToString();
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
