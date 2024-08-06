package kival.aoc.core;

import static java.lang.StringTemplate.STR;

import java.util.stream.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.Arrays;

public class Runner {
   @FunctionalInterface
   public interface ParameterFunction {
      public String apply(String input, boolean isTest);
   }

   private static class SolutionWrapper {
      public final String tag;
      public final ParameterFunction func;
      public final String path;
      public final String test;
      public final int iteration;
      public final Options.SolutionOptions options;
      public String result;
      public double[] elapsed;
      public double[][] bench;

      public SolutionWrapper(String tag, ParameterFunction func, String path, String test, int iteration,
            Options.SolutionOptions options) {
         this.tag = tag;
         this.func = func;
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
   }

   private static double round(double value, int places) {
      if (places < 0)
         throw new IllegalArgumentException();

      BigDecimal bd = new BigDecimal(Double.toString(value));
      bd = bd.setScale(places, RoundingMode.HALF_UP);
      return bd.doubleValue();
   }

   private static String result = "";

   private static void test(String actual, String expected) {
      if (expected.equals(""))
         return;
      if (!actual.equals(expected))
         throw new Error(STR."Expected \{expected} but got \{actual}");
   }

   private static SolutionWrapper printResult(SolutionWrapper solution) {
      if (solution.iteration == 1) {
         System.out.println(STR."\n\{solution.tag}: (ms) IO > Part > Overall");
         System.out.println(STR."Timer: \{solution.bench[0][2]} > \{solution.bench[1][2]} > \{solution.bench[2][2]}");
      }
      else {
         System.out.println(STR."\n\{solution.tag}: (ms) min..max avg");
         System.out.println(STR."IO: \{solution.bench[0][0]} .. \{solution.bench[0][1]} - \{solution.bench[0][2]}");
         System.out.println(STR."Part: \{solution.bench[1][0]} .. \{solution.bench[1][1]} - \{solution.bench[1][2]}");
         System.out.println(STR."Overall: \{solution.bench[2][0]} .. \{solution.bench[2][1]} - \{solution.bench[2][2]}");
      }
      System.out.println(STR."Result: \{solution.result}");

      return solution;
   }

   private static SolutionWrapper execute(SolutionWrapper solution)
         throws Exception {
      boolean isTest = solution.tag.startsWith("Test");
      long start = 0, end = 0;

      start = System.nanoTime();
      String input = solution.options.hasIO ? solution.path : Input.getInput(solution.path);
      end = System.nanoTime();
      double elapsed = round((double) (end - start) / 1_000_000, 3);
      solution.elapsed[0] = elapsed;

      start = System.nanoTime();
      result = solution.func.apply(input, isTest);
      end = System.nanoTime();
      elapsed = round((double) (end - start) / 1_000_000, 3);

      solution.result = result;
      solution.elapsed[1] = elapsed;
      
      return solution;
   }

   private static SolutionWrapper perform(SolutionWrapper solution)
         throws Exception {
      double timesIo[] = new double[solution.iteration];
      double timesPart[] = new double[solution.iteration];
      double timesOverall[] = new double[solution.iteration];

      for (int i = 0; i < solution.iteration; i++) {
         execute(solution);
         timesIo[i] = solution.elapsed[0];
         timesPart[i] = solution.elapsed[1];
         timesOverall[i] = timesPart[i] + timesIo[i];
      }

      solution.bench[0][0] = round(Arrays.stream(timesIo).min().getAsDouble(), 3);
      solution.bench[0][1] = round(Arrays.stream(timesIo).max().getAsDouble(), 3);
      solution.bench[0][2] = round(Arrays.stream(timesIo).average().getAsDouble(), 3);
      
      solution.bench[1][0] = round(Arrays.stream(timesPart).min().getAsDouble(), 3);
      solution.bench[1][1] = round(Arrays.stream(timesPart).max().getAsDouble(), 3);
      solution.bench[1][2] = round(Arrays.stream(timesPart).average().getAsDouble(), 3);
      
      solution.bench[2][0] = round(Arrays.stream(timesOverall).min().getAsDouble(), 3);
      solution.bench[2][1] = round(Arrays.stream(timesOverall).max().getAsDouble(), 3);
      solution.bench[2][2] = round(Arrays.stream(timesOverall).average().getAsDouble(), 3);
      
      return solution;
   }

   public static void run(String[] args, ParameterFunction part1, ParameterFunction part2,
         Options.SolutionOptions options) {
      try {
         if (args.length == 0) {
            throw new Error("Usage: <path/to/year/day/java>\n");
         }
         String pathAnswers = args[0] + "/answers.txt";
         String pathInputTest1 = args[0] + "/test1.txt";
         String pathInputTest2 = args[0] + (options.hasAlternate ? "/test2.txt" : "/test1.txt");
         String pathInputMain = args[0] + "/input.txt";
         int iteration = args.length > 1 ? Integer.parseInt(args[1]) : 0;

         Input.Answers answers = Input.getAnswers(pathAnswers);
         SolutionWrapper[] solutions = new SolutionWrapper[4];
         solutions[0] = new SolutionWrapper("Test 1", part1, pathInputTest1, answers.test1, iteration, options);
         solutions[1] = new SolutionWrapper("Part 1", part1, pathInputMain, answers.part1, iteration, options);
         solutions[2] = new SolutionWrapper("Test 2", part2, pathInputTest2, answers.test2, iteration, options);
         solutions[3] = new SolutionWrapper("Part 2", part2, pathInputMain, answers.part2, iteration, options);
         
         for (SolutionWrapper s : solutions) {
            perform(s);
         }

         for (SolutionWrapper s : solutions) {
            printResult(s);
            test(s.result, s.test);
         }

      } catch (Exception e) {
         e.printStackTrace();
      }
   }
}
