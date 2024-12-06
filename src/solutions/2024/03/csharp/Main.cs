
using System.Reflection.Metadata;
using System.Text.RegularExpressions;
using Core;

namespace Year2024;
public static class Day03
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = true,
      HasIO = false,
   };

   static string Part1(string input, bool isTest = false)
   {
      return new Regex("mul\\(\\d{1,3},\\d{1,3}\\)")
         .Matches(input)
         .Select(m =>
         {
            var val = new Regex("\\d{1,3}")
            .Matches(m.Value);
            return int.Parse(val[0].Value) * int.Parse(val[1].Value);
         })
         .Sum()
         .ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      var instructed = true;
      return new Regex("(mul\\(\\d{1,3},\\d{1,3}\\)|do\\(\\)|don't\\(\\))")
         .Matches(input)
         .Select(m =>
         {
            if (m.Value == "do()") { instructed = true; return 0; }
            if (m.Value == "don't()") { instructed = false; return 0; }
            if (!instructed) { return 0; }
            var val = new Regex("\\d{1,3}").Matches(m.Value);
            return int.Parse(val[0].Value) * int.Parse(val[1].Value);
         })
         .Sum()
         .ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
