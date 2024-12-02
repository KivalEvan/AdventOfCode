
using Core;

namespace Year2023;
public static class Day10
{
   static SolutionOptions OPTIONS = new()
   {
      HasAlternate = true,
      HasIO = false,
   };

   private static (int x, int y) FindStart(string[] grid)
   {
      for (int y = 0; y < grid.Length; y++)
      {
         for (int x = 0; x < grid[y].Length; x++)
         {
            if (grid[y][x] == 'S')
            {
               return (x, y);
            }
         }
      }
      return (0, 0);
   }

   private static bool GoUp(
      string[] grid,
      int x,
      int y
   )
   {
      string criteria = "S7F|";
      return y > 0 && criteria.Contains(grid[y - 1][x]);
   }

   private static bool GoDown(
      string[] grid,
      int x,
      int y
   )
   {
      string criteria = "SLJ|";
      return y < grid.Length - 1 && criteria.Contains(grid[y + 1][x]);
   }

   private static bool GoLeft(
      string[] grid,
      int x,
      int y
   )
   {
      string criteria = "SLF-";
      return x > 0 && criteria.Contains(grid[y][x - 1]);
   }

   private static bool GoRight(
      string[] grid,
      int x,
      int y
   )
   {
      string criteria = "S7J-";
      return x < grid[y].Length - 1 && criteria.Contains(grid[y][x + 1]);
   }

   private static List<(int x, int y)> LookUp(
      string[] grid,
      int x,
      int y
   )
   {
      char c = grid[y][x];
      var res = new List<(int x, int y)>();
      if (c == '|')
      {
         if (GoUp(grid, x, y))
            res.Add((x, y - 1));
         if (GoDown(grid, x, y))
            res.Add((x, y + 1));
      }
      if (c == '-')
      {
         if (GoLeft(grid, x, y))
            res.Add((x - 1, y));
         if (GoRight(grid, x, y))
            res.Add((x + 1, y));
      }
      if (c == 'L')
      {
         if (GoUp(grid, x, y))
            res.Add((x, y - 1));
         if (GoRight(grid, x, y))
            res.Add((x + 1, y));
      }
      if (c == 'J')
      {
         if (GoUp(grid, x, y))
            res.Add((x, y - 1));
         if (GoLeft(grid, x, y))
            res.Add((x - 1, y));
      }
      if (c == '7')
      {
         if (GoDown(grid, x, y))
            res.Add((x, y + 1));
         if (GoLeft(grid, x, y))
            res.Add((x - 1, y));
      }
      if (c == 'F')
      {
         if (GoDown(grid, x, y))
            res.Add((x, y + 1));
         if (GoRight(grid, x, y))
            res.Add((x + 1, y));
      }
      if (c == 'S')
      {
         if (GoUp(grid, x, y))
            res.Add((x, y - 1));
         if (GoDown(grid, x, y))
            res.Add((x, y + 1));
         if (GoLeft(grid, x, y))
            res.Add((x - 1, y));
         if (GoRight(grid, x, y))
            res.Add((x + 1, y));
      }
      return res;
   }

   static string Part1(string input, bool isTest = false)
   {
      var grid = input.Split('\n');
      bool[][] visited = new bool[grid.Length][];
      for (int i = 0; i < grid.Length; i++)
      {
         visited[i] = new bool[grid[i].Length];
      }

      int res = 0;
      Queue<(int x, int y)> queue = new();
      queue.Enqueue(FindStart(grid));
      while (queue.Count > 0)
      {
         var (x, y) = queue.Dequeue();
         var found = LookUp(grid, x, y);
         foreach (var f in found)
         {
            if (visited[f.y][f.x])
               continue;
            visited[f.y][f.x] = true;
            queue.Enqueue(f);
            res++;
         }
      }

      return (res / 2).ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      var grid = input.Split('\n');
      bool[][] visited = new bool[grid.Length * 3][];
      for (int i = 0; i < visited.Length; i++)
      {
         visited[i] = new bool[grid[0].Length * 3];
      }

      Queue<(int x, int y)> queue = new();
      queue.Enqueue(FindStart(grid));
      while (queue.Count > 0)
      {
         var (x, y) = queue.Dequeue();
         var found = LookUp(grid, x, y);
         foreach (var f in found)
         {
            visited[f.y * 3 + 1 + y - f.y][
               f.x * 3 + 1 + x - f.x
            ] = true;
            if (visited[f.y * 3 + 1][f.x * 3 + 1]) continue;
            visited[f.y * 3 + 1][f.x * 3 + 1] = true;
            queue.Enqueue(f);
         }
      }

      queue.Enqueue((0, 0));
      while (queue.Count > 0)
      {
         var (x, y) = queue.Dequeue();
         if (visited[y][x]) continue;
         visited[y][x] = true;
         for (int ud = -1; ud <= 1; ud++)
         {
            for (int lr = -1; lr <= 1; lr++)
            {
               if (y + ud < 0 || y + ud >= visited.Length)
               {
                  continue;
               }
               if (x + lr < 0 || x + lr >= visited[0].Length)
               {
                  continue;
               }
               if (visited[y + ud][x + lr]) continue;
               queue.Enqueue((x + lr, y + ud));
            }
         }
      }

      int res = 0;
      for (int y = 0; y < grid.Length; y++)
      {
         for (int x = 0; x < grid[0].Length; x++)
         {
            if (!visited[1 + y * 3][1 + x * 3]) res++;
         }
      }

      return res.ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
