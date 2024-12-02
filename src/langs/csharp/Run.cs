using System;
using System.Diagnostics;
using System.Linq;

namespace Core;
public static class Runner
{
   private class SolutionWrapper
   {
      public SolutionWrapper(string tag, SolutionPart func, string path, string test, int iteration, SolutionOptions options)
      {
         this.tag = tag;
         this.fn = func;
         this.path = path;
         this.test = test;
         this.iteration = iteration;
         this.options = options;
         this.result = "";
         this.elapsed = new double[2];
         this.bench = new double[3][];
         this.bench[0] = new double[3];
         this.bench[1] = new double[3];
         this.bench[2] = new double[3];
      }

      public readonly string tag;
      public readonly SolutionPart fn;
      public readonly string path;
      public readonly string test;
      public readonly int iteration;
      public readonly SolutionOptions options;
      public string result;
      public double[] elapsed;
      public double[][] bench;
   }

   public delegate string SolutionPart(string input, bool isTest);

   private static (string output, double elapsed) Timer(Func<string> fn)
   {
      Stopwatch stopwatch = Stopwatch.StartNew();
      string output = fn();
      stopwatch.Stop();
      return (output, stopwatch.Elapsed.Microseconds / 1000d);
   }

   private static void Test(string actual, string expected)
   {
      if (expected == "") return;
      if (expected != actual) { Console.WriteLine("Expected " + expected + " but received " + actual); throw new Exception("Test failed"); }
   }

   private static SolutionWrapper PrintResult(SolutionWrapper solution)
   {
      if (solution.iteration == 1)
      {
         Console.WriteLine($"\n{solution.tag}: (ms) IO > PART > ALL");
         Console.WriteLine($"Timer: {solution.bench[0][2]} > {solution.bench[1][2]} > {solution.bench[2][2]}");
      }
      else
      {
         Console.WriteLine($"\n{solution.tag}: (ms) min..max avg");
         Console.WriteLine($"IO: {Math.Round(solution.bench[0][0], 3)} .. {Math.Round(solution.bench[0][1], 3)} - {Math.Round(solution.bench[0][2], 3)}");
         Console.WriteLine($"Part: {Math.Round(solution.bench[1][0], 3)} .. {Math.Round(solution.bench[1][1], 3)} - {Math.Round(solution.bench[1][2], 3)}");
         Console.WriteLine($"Overall: {Math.Round(solution.bench[2][0], 3)} .. {Math.Round(solution.bench[2][1], 3)} - {Math.Round(solution.bench[2][2], 3)}");
      }
      Console.WriteLine($"Result: {solution.result}");

      return solution;
   }

   private static SolutionWrapper Execute(SolutionWrapper solution)
   {
      bool isTest = solution.tag.StartsWith("Test");

      (string input, double elapsedIo) = Timer(() => { return solution.options.HasIO ? solution.path : Input.GetInput(solution.path); });
      (string output, double elapsedPart) = Timer(() => { return solution.fn(input, isTest); });

      solution.result = output;
      solution.elapsed[0] = elapsedIo;
      solution.elapsed[1] = elapsedPart;

      return solution;
   }

   private static SolutionWrapper Perform(SolutionWrapper solution)
   {
      double[] timesIo = new double[solution.iteration];
      double[] timesPart = new double[solution.iteration];
      double[] timesOverall = new double[solution.iteration];

      for (int i = 0; i < solution.iteration / 2; i++)
      {
         Execute(solution);
      }

      for (int i = 0; i < solution.iteration; i++)
      {
         Execute(solution);
         timesIo[i] = solution.elapsed[0];
         timesPart[i] = solution.elapsed[1];
         timesOverall[i] = timesPart[i] + timesIo[i];
      }

      solution.bench[0][0] = timesIo.Min();
      solution.bench[0][1] = timesIo.Max();
      solution.bench[0][2] = timesIo.Sum() / timesIo.Length;

      solution.bench[1][0] = timesPart.Min();
      solution.bench[1][1] = timesPart.Max();
      solution.bench[1][2] = timesPart.Sum() / timesPart.Length;

      solution.bench[2][0] = timesOverall.Min();
      solution.bench[2][1] = timesOverall.Max();
      solution.bench[2][2] = timesOverall.Sum() / timesOverall.Length;

      return solution;
   }

   public static void Run(string[] args, SolutionPart part1, SolutionPart part2, SolutionOptions options)
   {
      string pathAnswers = Path.Combine(args[0], "answers.txt");
      string pathTest1 = Path.Combine(args[0], "test1.txt");
      string pathTest2 = Path.Combine(args[0], options.HasAlternate ? "test2.txt" : "test1.txt");
      string pathInput = Path.Combine(args[0], "input.txt");
      int iteration = args.Length > 1 ? int.Parse(args[1]) : 0;

      Input.Answers answers = Input.GetAnswers(pathAnswers);
      IEnumerable<SolutionWrapper> solutions = new List<SolutionWrapper> {
            new SolutionWrapper("Test 1", part1, pathTest1, answers.Test1, iteration, options),
            new SolutionWrapper("Part 1", part1, pathInput, answers.Part1, iteration, options),
            new SolutionWrapper("Test 2", part2, pathTest2, answers.Test2, iteration, options),
            new SolutionWrapper("Part 2", part2, pathInput, answers.Part2, iteration, options)
         };

      solutions.Select(Perform).ToList().ForEach(solution =>
      {
         PrintResult(solution);
         Test(solution.result, solution.test);
      });
   }
}
