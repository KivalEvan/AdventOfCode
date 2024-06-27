
using Core;

namespace Year2023
{
   public class Day06
   {
      static SolutionOptions OPTIONS = new(
      )
      {
         HasAlternate = false,
         HasIO = false,
      };

      static long OhnoMath(long b, long c, double pepsilon = 0.001)
      {
         double min = Math.Floor((b + Math.Sqrt(b * b - 4 * c)) / 2 - pepsilon);
         double max = Math.Ceiling((b - Math.Sqrt(b * b - 4 * c)) / 2 + pepsilon);
         return (long)(min - max + 1);
      }

      static string Part1(string input, bool isTest = false)
      {
         long[][] td = input.Split('\n').Select(x => x.Split(':')[1].Trim().Split(' ').Where(x => x != "").Select(long.Parse).ToArray()).ToArray();
         long res = 1;
         for (int i = 0; i < td[0].Length; i++) res *= OhnoMath(td[0][i], td[1][i]);
         return res.ToString();
      }

      static string Part2(string input, bool isTest = false)
      {
         long[] td = input.Split('\n').Select(x => long.Parse(string.Join("", x.Split(':')[1].Split(' ')))).ToArray();
         return OhnoMath(td[0], td[1]).ToString();
      }

      static void Main(string[] args)
      {
         Run.Execute(args, Part1, Part2, OPTIONS);
      }
   }
}