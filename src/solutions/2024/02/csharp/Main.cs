using Core;

namespace Year2024;

public static class Day02
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static int KillMe(List<int> ary)
   {
      bool incre = false;
      bool decre = false;
      for (int i = 1; i < ary.Count; i++)
      {
         int val = ary[i] - ary[i - 1];
         if (val > 0) incre = true;
         if (val < 0) decre = true;
         if (incre && decre) return 0;
         int change = Math.Abs(val);
         if (change < 1 || change > 3) return 0;
      }
      return 1;
   }

   static int KillMe2(List<int> ary)
   {
      if (KillMe(ary) == 1) return 1;
      for (int i = 0; i < ary.Count; i++)
      {
         var copy = new List<int>(ary);
         copy.RemoveAt(i);
         if (KillMe(copy) == 1) return 1;
      }
      return 0;
   }

   static string Part1(string input, bool isTest = false)
   {
      return input.Split('\n').Select(line => KillMe(line.Split(' ').Select(int.Parse).ToList())).Sum().ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      return input.Split('\n').Select(line => KillMe2(line.Split(' ').Select(int.Parse).ToList())).Sum().ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
