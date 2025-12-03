
using System.Diagnostics;
using Core;

namespace Year2025;

public static class Day01
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private int modulo(int x, int y)
   {
      var r = x % y;
      return r < 0 ? r + y : r;
   }

   static private string Solve(string input, bool p2)
   {
      var dial = 50;
      return input
         .Split('\n')
         .Select(n =>
         {
            var newDial = dial + int.Parse(n[1..]) * (n[0] == 'R' ? 1 : -1);

            if (p2)
            {
               var zero = Math.Abs(newDial) / 100 + (dial != 0 && newDial <= 0 ? 1 : 0);
               dial = modulo(newDial, 100);
               return zero;
            }
            else
            {
               dial = newDial;
               if (dial % 100 == 0) return 1;
            }

            return 0;
         })
         .Sum()
         .ToString();
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
