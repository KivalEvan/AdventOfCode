
using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Drawing;
using Core;

namespace Year2025;

public static class Day02
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static int GetDigits(long x)
   {
      var digits = 0;
      while (x > 0)
      {
         x /= 10;
         digits++;
      }
      return digits;
   }

   static IEnumerable<long> Candidates(long start, long end)
   {
      var set = new HashSet<double>();
      var digitsMin = GetDigits(start);
      var digitsMax = GetDigits(end);
      for (var digit = 1; digit <= digitsMax / 2; digit++)
      {
         if (digitsMin % digit != 0 && digitsMax % digit != 0) continue;
         var s = Math.Pow(10, digit - 1);
         var e = Math.Pow(10, digit);
         for (var x = s; x < e; x++)
         {
            var n = x;
            while (true)
            {
               n = n * e + x;
               if (n < start) continue;
               if (n > end) break;
               if (set.Contains(n)) break;
               set.Add(n);
               yield return (long)n;
            }
         }
      }
   }

   static private string Solve(string input, bool isTest, bool p2)
   {
      return input
         .Split('\n')
         .SelectMany(line => line.Split(','))
         .Where(line => !string.IsNullOrEmpty(line))
         .AsParallel()
         .Select(pair => pair.Split('-').Select(long.Parse).ToArray())
         .Sum(range =>
            Candidates(range[0], range[1])
               // .AsParallel() // slow
               .Where(x =>
               {
                  if (!p2)
                  {
                     var digits = GetDigits(x);
                     if (digits % 2 != 0) return false;

                     var place = (long)Math.Pow(10, digits / 2);
                     var left = x / place;
                     var right = x % place;

                     return left == right;
                  }
                  return true;
               })
               .Sum()
         )
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
      // Console.WriteLine(Solve("1-4294967296", false, true));
      // Console.WriteLine(Solve("11-42,95-115,998-7012,222220-222224,446443-646449,1698522-1698528,38593856-38593862,824824821-824824827,1188511880-2321212124,202001202277-532532532530", false, true));
      // Console.WriteLine(Solve("11-42,95-115,998-7012,1188511880-2188511890,222220-222224,1698522-1698528,446443-646449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2321212124", false, false));
      // Console.WriteLine(Solve("11-42,95-115,998-7012,1188511880-2188511890,222220-222224,1698522-1698528,446443-646449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2321212124", false, true));
   }
}
