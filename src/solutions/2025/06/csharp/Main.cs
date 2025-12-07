
using Core;

namespace Year2025;

public static class Day06
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static private string Solve(string input, bool isTest, bool p2)
   {
      if (p2)
      {
         var lineLen = input.IndexOf('\n');
         var lineCount = input.Count('\n');

         var charBuffer = new char[lineCount];
         var longBuffer = new long[lineCount];

         var total = 0L;
         var longIndex = 0;
         for (var i = lineLen; i >= 0; i--)
         {
            for (var j = 0; j < lineCount; j++)
               charBuffer[j] = input[lineLen * j + i + j];
            if (long.TryParse(charBuffer, out var n)) longBuffer[longIndex++] = n;

            if (i == lineLen) continue; // endline got trimmed :(
            if (input[lineLen * lineCount + i + lineCount] == '*')
            {
               total += longBuffer.Take(longIndex).Aggregate(1L, (x, y) => x * y);
               longIndex = 0;
            }
            else if (input[lineLen * lineCount + i + lineCount] == '+')
            {
               total += longBuffer.Take(longIndex).Sum();
               longIndex = 0;
            }
         }

         return total.ToString();
      }

      var lines = input.Split('\n');
      var nums = lines[..^1]
         .Select(x => x
            .Split(' ')
            .Where(x => x != "")
            .Select(long.Parse)
            .ToArray())
         .ToArray();
      return lines[^1]
         .Replace(" ", "")
         .Select((op, i) => nums
            .Select(x => x[i])
            .Aggregate(op == '*' ? 1L : 0L, (x, y) => op == '*' ? x * y : x + y))
         .Sum()
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
