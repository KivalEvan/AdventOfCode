
using Core;

namespace Year2023
{
   public static class Day08
   {
      static SolutionOptions OPTIONS = new()
      {
         HasIO = false,
         HasAlternate = true,
      };

      static private long gcd(long a, long b)
      {
         return b == 0 ? a : gcd(b, a % b);
      }

      static private long lcm(long a, long b)
      {
         return (a * b) / gcd(a, b);
      }

      static string Part1(string input, bool isTest = false)
      {
         var lines = input.Split("\n");
         var instructions = lines[0].Select(x => x == 'L' ? 0 : 1).ToArray();
         var maps = new Dictionary<string, string[]>();
         for (int i = 2; i < lines.Length; i++)
         {
            var chunks = lines[i].Split(" = ");
            var dest = chunks[0];
            var lr = chunks[1][1..(chunks[1].Length - 1)].Split(", ");
            maps[dest] = lr;
         }

         int idx = 0;
         var nav = "AAA";
         while (true)
         {
            var map = maps[nav];
            nav = map[instructions[idx % instructions.Length]];
            idx++;
            if (nav == "ZZZ") break;
         }
         return idx.ToString();
      }

      static string Part2(string input, bool isTest = false)
      {
         var lines = input.Split("\n");
         var instructions = lines[0].Select(x => x == 'L' ? 0 : 1).ToArray();
         var maps = new Dictionary<string, string[]>();
         var navs = new List<string>();
         for (int i = 2; i < lines.Length; i++)
         {
            var chunks = lines[i].Split(" = ");
            var dest = chunks[0];
            var lr = chunks[1][1..(chunks[1].Length - 1)].Split(", ");
            maps[dest] = lr;
            if (dest[2] == 'A')
            {
               navs.Add(dest);
            }
         }

         var res = 1L;
         for (int i = 0; i < navs.Count; i++)
         {
            var j = 0;
            while (true)
            {
               var m = maps[navs[i]];
               navs[i] = m[instructions[j % instructions.Length]];
               j++;
               if (navs[i][2] == 'Z') break;
            }
            res = lcm(res, j);
         }
         return res.ToString();
      }

      static void Main(string[] args)
      {
         Runner.Run(args, Part1, Part2, OPTIONS);
      }
   }
}
