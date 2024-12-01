
using System;
using Core;

namespace Year2024
{
   public static class Day01
   {
      static SolutionOptions OPTIONS = new()
      {
         HasAlternate = false,
         HasIO = false,
      };

      static string Part1(string input, bool isTest = false)
      {
         var l = new List<int>();
         var r = new List<int>();
         foreach (var line in input.Split('\n'))
         {
            var pair = line.Split("   ");
            l.Add(int.Parse(pair[0]));
            r.Add(int.Parse(pair[1]));
         }
         l.Sort();
         r.Sort();

         int sum = 0;
         for (int i = 0; i < l.Count; i++)
         {
            sum += Math.Abs(l[i] - r[i]);
         }

         return sum.ToString();
      }

      static string Part2(string input, bool isTest = false)
      {
         var l = new List<int>();
         var hashmap = new Dictionary<int, int>();
         foreach (var line in input.Split('\n'))
         {
            var pair = line.Split("   ");
            var k = int.Parse(pair[0]);
            var v = int.Parse(pair[1]);
            l.Add(k);
            hashmap.TryAdd(k, 0);
            hashmap.TryAdd(v, 0);
            hashmap[v]++;
         }

         int sum = 0;
         foreach (var e in l)
         {
            sum += e * hashmap[e];
         }

         return sum.ToString();
      }

      static void Main(string[] args)
      {
         Runner.Run(args, Part1, Part2, OPTIONS);
      }
   }
}
