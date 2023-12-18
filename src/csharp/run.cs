using System;
using System.Diagnostics;

namespace Utils;
public static class Run
{
   private static string result = "";

   private static void Test(string actual, string expected)
   {
      if (expected == "") return;
      if (expected != actual) Console.WriteLine("what the fuck");
   }

   private static void Perform(string tag, Func<string, string> fn, string input)
   {
      Console.WriteLine($"\n\\ {tag}");

      Stopwatch stopwatch = new Stopwatch();
      stopwatch.Start();
      result = fn(input);
      stopwatch.Stop();

      Console.WriteLine($" -- Time taken (ms): {stopwatch.ElapsedMilliseconds} ms");
      Console.WriteLine($"/ Result: {result}");
   }

   public static void Execute(string[] args, Func<string, string> part1, Func<string, string> part2, int hasAlternate)
   {
      Input.Answers answers = Input.GetAnswers("");

      Perform("Test 1", part1, "");
      Test(result, answers.Test1);
      Perform("Part 1", part1, "");
      Test(result, answers.Part1);
      Perform("Test 2", part2, "");
      Test(result, answers.Test2);
      Perform("Part 2", part2, "");
      Test(result, answers.Part2);
   }
}
