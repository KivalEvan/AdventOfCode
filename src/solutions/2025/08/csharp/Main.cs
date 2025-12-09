
using Core;

namespace Year2025;

public static class Day08
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   static long Distance((long x, long y, long z) boxA, (long x, long y, long z) boxB)
   {
      return
         (long)(Math.Pow(boxA.x - boxB.x, 2)
         + Math.Pow(boxA.y - boxB.y, 2)
         + Math.Pow(boxA.z - boxB.z, 2));
   }

   static IEnumerable<((long x, long y, long z) A, (long x, long y, long z) B)> Combinations(IEnumerable<(long x, long y, long z)> boxes)
   {
      return boxes
         .SelectMany(x =>
            boxes.Where(y => y.CompareTo(x) > 0),
            (x, y) => (x, y));
   }

   static private string Solve(string input, bool isTest, bool p2)
   {
      var circuits = input
         .Split('\n')
         .Select(x => { var v = x.Split(',').Select(long.Parse).ToArray(); return (v[0], v[1], v[2]); })
         .ToDictionary(x => x, x => new List<(long x, long y, long z)>() { x });
      var connections = Combinations(circuits.Keys).OrderBy(x => Distance(x.A, x.B));

      // get origin circuit where box A and B are
      //
      // example
      // 123 and 888
      //
      // the origin circuit guarantees contains own box
      // 123 -> 123  --  origin 123
      // 888 -> 888  --  origin 888
      // merge 888 into 123
      // 123 -> 123, 888
      //
      // then
      // 143 and 888
      // 143 -> 143  --  origin 143
      // 123 -> 123, 888  --  origin 123
      // merge 123 into 143
      // 143 -> 143, 123, 888
      //
      // but
      // 143 and 123
      // 143 -> 143, 123, 888  --  both origin 143
      // therefore no merge happen
      var zero = (0L, 0L, 0L);
      foreach (var (A, B) in connections.Take(!p2 ? isTest ? 10 : 1000 : int.MaxValue))
      {
         var originA = zero;
         var originB = zero;

         foreach (var circuit in circuits.Keys)
         {
            if (circuits[circuit].Contains(A)) originA = circuit;
            if (circuits[circuit].Contains(B)) originB = circuit;
            if (originA != zero && originB != zero) break;
         }

         if (originA != originB)
         {
            circuits[originA].AddRange(circuits[originB]);
            circuits.Remove(originB);
         }

         // last connection in p2
         if (circuits.Count == 1)
         {
            return (A.x * B.x).ToString();
         }
      }

      return circuits.Values
         .Select(x => x.Count)
         .OrderByDescending(x => x)
         .Take(3)
         .Aggregate(1L, (x, y) => x * y)
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
