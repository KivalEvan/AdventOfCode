
using Core;

namespace Year;
public static class Day
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private string Solve(string input, bool p2) { return ""; }

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
