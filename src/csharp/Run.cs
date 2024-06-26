using System;
using System.Diagnostics;
using System.Linq;

namespace Core
{
   public static class Run
   {
      public delegate string SolutionPart(string input, bool isTest);

      private static string result = "";

      private static void Test(string actual, string expected)
      {
         if (expected == "") return;
         if (expected != actual) Console.WriteLine("Expected " + expected + " but received " + actual);
      }

      private static void Perform(string tag, SolutionPart fn, string path, bool hasIo)
      {
         Console.WriteLine($"\n\\ {tag}");
         bool isTest = tag.StartsWith("Test");
         Stopwatch stopwatch;
         double elapsedIo, elapsedPart;

         stopwatch = Stopwatch.StartNew();
         string input = hasIo ? path : Input.GetInput(path);
         stopwatch.Stop();
         elapsedIo = stopwatch.Elapsed.Microseconds / 1000d;

         stopwatch = Stopwatch.StartNew();
         result = fn(input, isTest);
         stopwatch.Stop();
         elapsedPart = stopwatch.Elapsed.Microseconds / 1000d;

         Console.WriteLine($" -- Time taken (ms):");
         Console.WriteLine($" | IO > PART > ALL");
         Console.WriteLine($" | {elapsedIo} > {elapsedPart} > {elapsedIo + elapsedPart}");
         Console.WriteLine($"/ Result: {result}");
      }

      private static void Bench(string tag, SolutionPart fn, string path, int itBench, bool hasIo)
      {
         bool isTest = tag.StartsWith("Test");
         string _ = "";
         double elapsed;
         Stopwatch stopwatch;

         double[] timesIo = new double[itBench];
         double[] timesPart = new double[itBench];
         double[] timesOverall = new double[itBench];

         for (int i = 0; i < itBench; i++)
         {
            stopwatch = Stopwatch.StartNew();
            string input = hasIo ? path : Input.GetInput(path);
            stopwatch.Stop();
            elapsed = stopwatch.Elapsed.Microseconds / 1000d;
            timesIo[i] = elapsed;

            stopwatch = Stopwatch.StartNew();
            _ = fn(input, isTest);
            stopwatch.Stop();
            elapsed = stopwatch.Elapsed.Microseconds / 1000d;
            timesPart[i] = elapsed;

            timesOverall[i] = timesPart[i] + timesIo[i];
         }
         double min, max, avg;
         Console.WriteLine($"\nBenchmarking {tag} (ms) min..max avg");

         min = timesIo.Min();
         max = timesIo.Max();
         avg = timesIo.Sum() / timesIo.Length;
         Console.WriteLine($"IO: {Math.Round(min, 3)} .. {Math.Round(max, 3)} - {Math.Round(avg, 3)}");

         min = timesPart.Min();
         max = timesPart.Max();
         avg = timesPart.Sum() / timesPart.Length;
         Console.WriteLine($"Part: {Math.Round(min, 3)} .. {Math.Round(max, 3)} - {Math.Round(avg, 3)}");

         min = timesOverall.Min();
         max = timesOverall.Max();
         avg = timesOverall.Sum() / timesOverall.Length;
         Console.WriteLine($"Overall: {Math.Round(min, 3)} .. {Math.Round(max, 3)} - {Math.Round(avg, 3)}");
      }

      public static void Execute(string[] args, SolutionPart part1, SolutionPart part2, SolutionOptions options)
      {
         string pathAnswers = Path.Combine(args[0], "answers.txt");
         string pathTest1 = Path.Combine(args[0], "test1.txt");
         string pathTest2 = Path.Combine(args[0], options.HasAlternate ? "test2.txt" : "test1.txt");
         string pathInput = Path.Combine(args[0], "input.txt");

         int itBench = args.Length > 1 ? int.Parse(args[1]) : 0;
         if (itBench > 0)
         {
            Bench("Test 1", part1, pathTest1, itBench, options.HasIO);
            Bench("Part 1", part1, pathInput, itBench, options.HasIO);
            Bench("Test 2", part2, pathTest2, itBench, options.HasIO);
            Bench("Part 2", part2, pathInput, itBench, options.HasIO);
            return;
         }

         Input.Answers answers = Input.GetAnswers(pathAnswers);
         Perform("Test 1", part1, pathTest1, options.HasIO);
         Test(result, answers.Test1);
         Perform("Part 1", part1, pathInput, options.HasIO);
         Test(result, answers.Part1);
         Perform("Test 2", part2, pathTest2, options.HasIO);
         Test(result, answers.Test2);
         Perform("Part 2", part2, pathInput, options.HasIO);
         Test(result, answers.Part2);
      }
   }
}