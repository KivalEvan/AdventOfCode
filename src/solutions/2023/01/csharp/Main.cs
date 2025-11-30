using Core;

namespace Year2023;

public static class Day01
{
   static SolutionOptions OPTIONS = new(
   )
   {
      HasAlternate = true,
      HasIO = false,
   };

   private static char GetNum(string str)
   {

      if (str.StartsWith("zero"))
         return '0';
      if (str.StartsWith("one"))
         return '1';
      if (str.StartsWith("two"))
         return '2';
      if (str.StartsWith("three"))
         return '3';
      if (str.StartsWith("four"))
         return '4';
      if (str.StartsWith("five"))
         return '5';
      if (str.StartsWith("six"))
         return '6';
      if (str.StartsWith("seven"))
         return '7';
      if (str.StartsWith("eight"))
         return '8';
      if (str.StartsWith("nine"))
         return '9';
      return ' ';
   }

   static string Part1(string input, bool isTest = false)
   {
      string[] lines = input.Split("\n");
      long result = 0;

      for (int i = 0; i < lines.Length; i++)
      {
         char first = ' ';
         char last = ' ';

         for (int j = 0; j < lines[i].Length; j++)
         {
            if (char.IsNumber(lines[i][j]))
            {
               first = lines[i][j];
               break;
            }
         }
         for (int j = lines[i].Length - 1; j >= 0; j--)
         {
            if (char.IsNumber(lines[i][j]))
            {
               last = lines[i][j];
               break;
            }
         }
         string res = (first.ToString() + last.ToString()).Trim();
         result += res.Length > 0 ? int.Parse(res) : 0;
      }

      return result.ToString();
   }

   static string Part2(string input, bool isTest = false)
   {
      string[] lines = input.Split("\n");
      long result = 0;

      for (int i = 0; i < lines.Length; i++)
      {
         char first = ' ';
         char last = ' ';
         char c;

         for (int j = 0; j < lines[i].Length; j++)
         {
            if (char.IsNumber(lines[i][j]))
            {
               first = lines[i][j];
               break;
            }
            c = GetNum(lines[i].Substring(j));
            if (c != ' ')
            {
               first = c;
               break;
            }
         }
         for (int j = lines[i].Length - 1; j >= 0; j--)
         {
            if (char.IsNumber(lines[i][j]))
            {
               last = lines[i][j];
               break;
            }
            c = GetNum(lines[i].Substring(j));
            if (c != ' ')
            {
               last = c;
               break;
            }
         }
         string res = (first.ToString() + last.ToString()).Trim();
         result += res.Length > 0 ? int.Parse(res) : 0;
      }

      return result.ToString();
   }

   static void Main(string[] args)
   {
      Runner.Run(args, Part1, Part2, OPTIONS);
   }
}
