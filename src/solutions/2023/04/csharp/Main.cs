
using Core;

namespace Year2023
{
   public class Day04
   {
      static SolutionOptions OPTIONS = new(
      )
      {
         HasAlternate = false,
         HasIO = false,
      };

      static string Part1(string input, bool isTest = false)
      {
         return input.Split('\n').Select((x, idx) =>
         {
            int[][] nums = x.Substring(x.IndexOf(':') + 1).Split('|').Select(r => r.Split(' ').Where(s => s != "").Select(int.Parse).ToArray()).ToArray();
            int j = -1;
            for (int i = 0; i < nums[0].Length; i++) if (nums[1].Contains(nums[0][i])) j++;
            return j != -1 ? Math.Pow(2, j) : 0;
         }).Sum().ToString();
      }

      static string Part2(string input, bool isTest = false)
      {
         string[] lines = input.Split('\n');
         int[] instances = new int[lines.Length];
         Array.Fill(instances, 1);
         foreach (var (x, idx) in lines.Select((x, idx) => (x, idx)))
         {
            int[][] nums = x.Substring(x.IndexOf(':') + 1).Split('|').Select(r => r.Split(' ').Where(s => s != "").Select(int.Parse).ToArray()).ToArray();
            int j = 0;
            for (int i = 0; i < nums[0].Length; i++) if (nums[1].Contains(nums[0][i])) j++;
            while (j > 0)
            {
               instances[idx + j] += instances[idx];
               j--;
            }
         }
         return instances.Sum().ToString();
      }

      static void Main(string[] args)
      {
         Runner.Run(args, Part1, Part2, OPTIONS);
      }
   }
}
