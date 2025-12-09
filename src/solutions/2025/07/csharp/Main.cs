
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
      var total = 0L;
      var len = input.IndexOf('\n');
      var buffer = new long[141];
      buffer[input.IndexOf('S')] = 1;
      for (var i = 0; i < input.Length; i++)
      {
         var x = i % (len + 1);
         if (input[i] != '^') continue;
         if (buffer[x] > 0) total++;
         buffer[x - 1] += buffer[x];
         buffer[x + 1] += buffer[x];
         buffer[x] = 0;
      }

      return p2 ? buffer.Sum().ToString() : total.ToString();
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
