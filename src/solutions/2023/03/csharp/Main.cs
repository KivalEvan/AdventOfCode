
using Core;

namespace Year2023;

public class Day03
{
   static SolutionOptions OPTIONS = new(
   )
   {
      HasAlternate = false,
      HasIO = false,
   };

   private static bool IsSymbol(char c)
   {
      return (
         c == '*' ||
         c == '$' ||
         c == '=' ||
         c == '#' ||
         c == '%' ||
         c == '/' ||
         c == '&' ||
         c == '+' ||
         c == '-' ||
         c == '@'
      );
   }

   private static int TryOrDefault(string s)
   {
      return int.TryParse(s, out int res) ? res : 0;
   }

   static string YeetTheNumber(string[][] grid, int x, int y)
   {
      string res = "";
      if (char.IsNumber(grid[y][x][0]))
      {
         res += grid[y][x];
         grid[y][x] = ".";

         if (x > 0) res = YeetTheNumber(grid, x - 1, y) + res;
         if (x < grid[y].Length - 1) res += YeetTheNumber(grid, x + 1, y);
      }
      return res;
   }

   static string Part1(string input, bool isTest = false)
   {
      string[][] grid = input.Split('\n').Select(s => s.ToCharArray().Select(x => x.ToString()).ToArray()).ToArray();
      int SZ = grid.Length;

      long res = 0;

      for (int y = 0; y < SZ; y++)
      {
         for (int x = 0; x < SZ; x++)
         {
            if (IsSymbol(grid[y][x][0]))
            {
               if (x > 0)
               {
                  if (y < SZ - 1) res += TryOrDefault(YeetTheNumber(grid, x - 1, y + 1));
                  if (y > 0) res += TryOrDefault(YeetTheNumber(grid, x - 1, y - 1));
                  res += TryOrDefault(YeetTheNumber(grid, x - 1, y));
               }
               if (x < SZ - 1)
               {
                  if (y < SZ - 1) res += TryOrDefault(YeetTheNumber(grid, x + 1, y + 1));
                  if (y > 0) res += TryOrDefault(YeetTheNumber(grid, x + 1, y - 1));
                  res += TryOrDefault(YeetTheNumber(grid, x + 1, y));
               }
               if (y > 0) res += TryOrDefault(YeetTheNumber(grid, x, y - 1));
               if (y < SZ - 1) res += TryOrDefault(YeetTheNumber(grid, x, y + 1));
            }
         }
      }

      return res.ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      string[][] grid = input.Split('\n').Select(s => s.ToCharArray().Select(x => x.ToString()).ToArray()).ToArray();
      int SZ = grid.Length;

      long res = 0;

      for (int y = 0; y < SZ; y++)
      {
         for (int x = 0; x < SZ; x++)
         {
            if (grid[y][x][0] == '*')
            {
               List<int> ary = new List<int>();
               if (x > 0)
               {
                  if (y < SZ - 1) ary.Add(TryOrDefault(YeetTheNumber(grid, x - 1, y + 1)));
                  if (y > 0) ary.Add(TryOrDefault(YeetTheNumber(grid, x - 1, y - 1)));
                  ary.Add(TryOrDefault(YeetTheNumber(grid, x - 1, y)));
               }
               if (x < SZ - 1)
               {
                  if (y < SZ - 1) ary.Add(TryOrDefault(YeetTheNumber(grid, x + 1, y + 1)));
                  if (y > 0) ary.Add(TryOrDefault(YeetTheNumber(grid, x + 1, y - 1)));
                  ary.Add(TryOrDefault(YeetTheNumber(grid, x + 1, y)));
               }
               if (y > 0) ary.Add(TryOrDefault(YeetTheNumber(grid, x, y - 1)));
               if (y < SZ - 1) ary.Add(TryOrDefault(YeetTheNumber(grid, x, y + 1)));
               int[] fi = ary.Where(e => e > 0).ToArray();
               if (fi.Length == 2) res += fi[0] * fi[1];
            }
         }
      }

      return res.ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
