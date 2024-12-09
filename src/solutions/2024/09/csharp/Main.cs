
using System.Drawing;
using Core;

namespace Year2024;
public static class Day09
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = false,
      HasIO = false,
   };

   private struct Disk
   {
      public long size;
      public long free;
      public long[] space;
      public long moved;
   }

   static private string Solve(string input, bool p2)
   {
      Disk[] disks = input
         .ToCharArray()
         .Where((_, i) => i % 2 == 0)
         .Select((c, i) => i * 2 + 1 == input.Length
            ? new Disk
            {
               size = (long)char.GetNumericValue(c),
               free = 0,
               space = [],
               moved = 0
            }
            : new Disk
            {
               size = (long)char.GetNumericValue(c),
               free = (long)char.GetNumericValue(input[i * 2 + 1]),
               space = new long[(long)char.GetNumericValue(input[i * 2 + 1])],
               moved = 0
            })
         .ToArray();

      var left = 0;
      var right = disks.Length - 1;
      if (p2)
      {
         while (left < right)
         {
            if (disks[left].free >= disks[right].size)
            {
               for (var j = 0; j < disks[right].size; j++)
               {
                  disks[left].space[disks[left].space.Length - disks[left].free] = right;
                  disks[left].free--;
                  disks[right].moved++;
               }
               disks[right].size = 0;
               left = 0;
               right--;
            }
            else
            {
               left++;
            }

            if (left == right)
            {
               left = 0;
               right--;
            }
         }
      }
      else
      {
         while (left < right)
         {
            if (disks[left].free > 0 && disks[right].size > 0)
            {
               disks[left].space[disks[left].space.Length - disks[left].free] = right;
               disks[left].free--;
               disks[right].size--;
            }

            if (disks[right].size == 0)
            {
               right--;
            }
            if (disks[left].free == 0)
            {
               left++;
            }
         }
      }

      long total = 0;
      long i = 0;
      for (long k = 0; k < disks.Length; k++)
      {
         i += disks[k].moved;
         for (var s = 0; s < disks[k].size; s++)
         {
            total += i * k;
            i++;
         }
         for (var s = 0; s < disks[k].space.Length - disks[k].free; s++)
         {
            total += i * disks[k].space[s];
            i++;
         }
         i += disks[k].free;
      }

      return total.ToString();
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
