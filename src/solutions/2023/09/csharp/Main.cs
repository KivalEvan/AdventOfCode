
using Core;

namespace Year2023;

public static class Day09
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static long[] Difference(long[] ary, uint sz)
   {
      for (int i = 0; i < sz; i++)
      {
         ary[i] = ary[i + 1] - ary[i];
      }
      return ary;
   }

   static long Extrapolate(long[] ary, uint sz)
   {
      sz--;
      var last = ary[sz];
      if (sz == 0)
         return last;
      return Extrapolate(Difference(ary, sz), sz) + last;
   }

   static string Part1(string input, bool isTest = false)
   {
      return input.Split('\n')
         .Select(x =>
            Extrapolate(x
               .Split(' ')
               .Select(s => long.Parse(s))
               .ToArray(), (uint)x.Split(' ').Length))
         .Sum()
         .ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      return input.Split('\n')
         .Select(x =>
            Extrapolate(
               x
               .Split(' ')
               .Select(s => long.Parse(s))
               .Reverse()
               .ToArray(), (uint)x.Split(' ').Length))
         .Sum()
         .ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
