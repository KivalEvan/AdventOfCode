
using Core;

namespace Year2023
{
   public class Day02
   {
      static SolutionOptions OPTIONS = new(
      )
      {
         HasAlternate = false,
         HasIO = false,
      };

      private static (int, IEnumerable<(int, string)>) GetSequences(string game, int idx)
      {
         return (idx, game.Substring(game.IndexOf(':') + 1).Split([',', ';']).Select(x =>
         {
            string[] val = x.Trim().Split(' ');
            return (int.Parse(val[0]), val[1]);
         }));
      }

      private static readonly int[] RGB = [12, 13, 14];
      static string Part1(string input, bool isTest = false)
      {
         return input.Split('\n').Select(GetSequences).Sum(cubes =>
         {
            foreach (var cube in cubes.Item2)
            {
               if (cube.Item1 > RGB[cube.Item2[0] % 3]) return 0;
            }
            return cubes.Item1 + 1;
         }).ToString();
      }

      static string Part2(string input, bool isTest = false)
      {
         return input.Split('\n').Select(GetSequences).Sum(cubes =>
         {
            int[] rgb = [0, 0, 0];
            foreach (var cube in cubes.Item2)
            {
               int idx = cube.Item2[0] % 3;
               if (cube.Item1 > rgb[idx]) rgb[idx] = cube.Item1;
            }
            return rgb[0] * rgb[1] * rgb[2];
         }).ToString();
      }

      static void Main(string[] args)
      {
         Run.Execute(args, Part1, Part2, OPTIONS);
      }
   }
}