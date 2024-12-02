
using Core;

namespace Year2023;
public class Day07
{
   static SolutionOptions OPTIONS = new(
   )
   {
      HasAlternate = false,
      HasIO = false,
   };

   private static Dictionary<char, int> Ranking = new Dictionary<char, int>{
         {'A', 13},
         {'K', 12},
         {'Q', 11},
         {'J', 10},
         {'T', 9},
         {'9', 8},
         {'8', 7},
         {'7', 6},
         {'6', 5},
         {'5', 4},
         {'4', 3},
         {'3', 2},
         {'2', 1},
         {'1', 0},
      };

   enum Type : int
   {
      HIGH_CARD,
      ONE_PAIR,
      TWO_PAIR,
      THREE_OF_A_KIND,
      FULL_HOUSE,
      FOUR_OF_A_KIND,
      FIVE_OF_A_KIND,
   }

   private static int SortCard((string, int) a, (string, int) b)
   {
      for (int i = 0; i < 5; i++)
         if (a.Item1[i] != b.Item1[i]) return Ranking[a.Item1[i]] - Ranking[b.Item1[i]];
      return 0;
   }

   private static int GetType(string str)
   {
      int[] values = new int[14].Select((e) => 0).ToArray();
      foreach (var k in str) values[Ranking[k]]++;
      if (values[0] > 0)
      {
         var temp = values[0];
         values[0] = 0;
         var idx = Array.IndexOf(values, values.Max());
         values[idx] += temp;
      }

      values = values.Where((e) => e > 0).ToArray();
      if (values.Length == 1) return (int)Type.FIVE_OF_A_KIND;
      if (values.Length == 4) return (int)Type.ONE_PAIR;
      if (values.Length == 5) return (int)Type.HIGH_CARD;

      int min = 5;
      int max = 0;
      foreach (var v in values)
      {
         if (min > v) min = v;
         if (max < v) max = v;
      }
      if (min == 1)
      {
         if (max == 2) return (int)Type.TWO_PAIR;
         if (max == 3) return (int)Type.THREE_OF_A_KIND;
         if (max == 4) return (int)Type.FOUR_OF_A_KIND;
      }
      return (int)Type.FULL_HOUSE;
   }

   private static (string, int)[][] ParseInput(string input, bool joker)
   {
      return input
         .Split('\n')
         .Select((str) =>
         {
            string[] temp = str.Split(' ');
            if (joker) temp[0] = temp[0].Replace('J', '1');
            return (temp[0], int.Parse(temp[1]));
         })
         .GroupBy((set) => GetType(set.Item1)).OrderBy((group) => group.Key).Select((group) => group.ToArray()).ToArray();
   }

   private static string Solve(string input, bool joker)
   {
      var groups = ParseInput(input, joker);

      int res = 0;
      int i = 1;
      foreach (var group in groups)
      {
         foreach (var set in group.OrderBy(x => x, Comparer<(string, int)>.Create(SortCard)))
         {
            res += set.Item2 * i++;
         }
      }
      return res.ToString();
   }

   static string Part1(string input, bool isTest = false)
   {
      return Solve(input, false);
   }

   static string Part2(string input, bool isTest = false)
   {
      return Solve(input, true);
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
