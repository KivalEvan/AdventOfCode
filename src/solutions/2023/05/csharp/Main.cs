
using Core;

namespace Year2023
{
   public class Day05
   {
      static SolutionOptions OPTIONS = new(
      )
      {
         HasAlternate = false,
         HasIO = false,
      };

      private static (List<long[]>, IEnumerable<IEnumerable<((long, long), (long, long))>>) ParseInput(string input, bool single)
      {
         string[] parsed = input.Split("\n\n");
         long[] header = parsed[0]
            .Split(':')[1]
            .Split(' ')
            .Where((str) => str != "")
            .Select(long.Parse).ToArray();
         List<long[]> seedRanges;
         if (single)
            seedRanges = header.Select(v => new long[] { v, v }).ToList();
         else
            seedRanges = new long[header.Length / 2]
               .Select((_, idx) => new long[] { header[idx * 2], header[idx * 2] + header[idx * 2 + 1] })
               .ToList();

         IEnumerable<IEnumerable<((long, long), (long, long))>> srcToDestRanges = parsed[1..].Select(
            (p) =>
               p
                  .Split('\n')[1..]
                  .Select((str) => str.Split(' ').Select(long.Parse).ToArray())
                  .Select((v) => ((v[1], v[1] + v[2] - 1), (v[0], v[0] + v[2] - 1)))
         );

         return (seedRanges, srcToDestRanges);
      }

      static string Solve(string input, bool single)
      {
         var (seedRanges, srcToDestRanges) = ParseInput(input, single);

         foreach (var groups in srcToDestRanges)
         {
            foreach (var g in groups)
            {
               List<long[]> newSeeds = new List<long[]>();
               foreach (var r in seedRanges)
               {
                  if (r[0] < g.Item1.Item1 && g.Item1.Item1 < r[1])
                  {
                     newSeeds.Add([r[0], g.Item1.Item1 - 1]);
                     r[0] = g.Item1.Item1;
                  }
                  if (r[0] < g.Item1.Item2 && g.Item1.Item2 < r[1])
                  {
                     newSeeds.Add([g.Item1.Item2 + 1, r[1]]);
                     r[1] = g.Item1.Item2;
                  }
               }
               seedRanges.AddRange(newSeeds);
            }
            foreach (var r in seedRanges)
            {
               ((long, long), (long, long))? found = null;
               try
               {
                  found = groups.First(
                  (g) =>
                     g.Item1.Item1 <= r[0] &&
                     r[0] <= g.Item1.Item2 &&
                     r[1] >= g.Item1.Item1 &&
                     g.Item1.Item2 >= r[1]
               );
               }
               catch { }
               if (found != null)
               {
                  var diff = found.Value.Item2.Item1 - found.Value.Item1.Item1;
                  r[0] += diff;
                  r[1] += diff;
               }
            }
         }

         return seedRanges.Select(x => x[0]).Min().ToString();
      }

      static string Part1(string input, bool isTest = false)
      {
         return Solve(input, true);
      }

      static string Part2(string input, bool isTest = false)
      {
         return Solve(input, false);
      }

      static void Main(string[] args)
      {
         Runner.Run(args, Part1, Part2, OPTIONS);
      }
   }
}
