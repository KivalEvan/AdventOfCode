package kival.aoc.core;

import static java.lang.StringTemplate.STR;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;
import java.util.Arrays;

public class Run {
   @FunctionalInterface
   public interface ParameterFunction {
      public String apply(String input, boolean isTest);
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

   private static void perform(String tag, ParameterFunction func, String path, boolean hasIO)
         throws Exception {
      System.out.println(STR."\n\\ \{tag}");
      boolean isTest = tag.startsWith("Test");
      long start = 0, end = 0;

      start = System.nanoTime();
      String input = hasIO ? path : Input.getInput(path);
      end = System.nanoTime();
      double elapsed = round((double) (end - start) / 1_000_000, 3);
      System.out.println(STR." -- IO time (ms): \{elapsed}");

      start = System.nanoTime();
      result = func.apply(input, isTest);
      end = System.nanoTime();
      elapsed = round((double) (end - start) / 1_000_000, 3);
      System.out.println(STR." -- Time taken (ms): \{elapsed}");

      System.out.println(STR."/ Result: \{result}");
   }

   private static void bench(String tag, ParameterFunction func, String path, int itBench, boolean hasIO)
         throws Exception {
      boolean isTest = tag.startsWith("Test");
      long start = 0, end = 0;
      double min, max, avg;

      double timesIo[] = new double[itBench];
      double timesPart[] = new double[itBench];
      double timesOverall[] = new double[itBench];

      for (int i = 0; i < itBench; i++) {
         start = System.nanoTime();
         String input = hasIO ? path : Input.getInput(path);
         end = System.nanoTime();
         double elapsed = round((double) (end - start) / 1_000_000, 3);
         timesIo[i] = elapsed;

         start = System.nanoTime();
         result = func.apply(input, isTest);
         end = System.nanoTime();
         elapsed = round((double) (end - start) / 1_000_000, 3);
         timesPart[i] = elapsed;

         timesOverall[i] = timesPart[i] + timesIo[i];
      }

      System.out.println(STR."\nBenchmarking \{tag} (ms) min..max avg");
      min = round(Arrays.stream(timesIo).min().getAsDouble(), 3);
      max = round(Arrays.stream(timesIo).max().getAsDouble(), 3);
      avg = round(Arrays.stream(timesIo).average().getAsDouble(), 3);
      System.out.println(STR."IO: \{min} .. \{max} - \{avg}");
      min = round(Arrays.stream(timesPart).min().getAsDouble(), 3);
      max = round(Arrays.stream(timesPart).max().getAsDouble(), 3);
      avg = round(Arrays.stream(timesPart).average().getAsDouble(), 3);
      System.out.println(STR."Part: \{min} .. \{max} - \{avg}");
      min = round(Arrays.stream(timesOverall).min().getAsDouble(), 3);
      max = round(Arrays.stream(timesOverall).max().getAsDouble(), 3);
      avg = round(Arrays.stream(timesOverall).average().getAsDouble(), 3);
      System.out.println(STR."Overall: \{min} .. \{max} - \{avg}");
   }

   public static void execute(String[] args, ParameterFunction part1, ParameterFunction part2,
         boolean hasAlternate, boolean hasIO) {
      try {
         if (args.length == 0) {
            throw new Error("Usage: <path/to/year/day/java>\n");
         }
         String pathAnswers = args[0] + "/answers.txt";
         String pathInputTest1 = args[0] + "/test1.txt";
         String pathInputTest2 = args[0] + (hasAlternate ? "/test2.txt" : "/test1.txt");
         String pathInputMain = args[0] + "/input.txt";

         int itBench = args.length > 1 ? Integer.parseInt(args[1]) : 0;
         if (itBench > 0) {
            bench("Test 1", part1, pathInputTest1, itBench, hasIO);
            bench("Part 1", part1, pathInputMain, itBench, hasIO);
            bench("Test 2", part2, pathInputTest2, itBench, hasIO);
            bench("Part 2", part2, pathInputMain, itBench, hasIO);
            return;
         }

         Input.Answers answers = Input.getAnswers(pathAnswers);
         perform("Test 1", part1, pathInputTest1, hasIO);
         test(result, answers.test1);
         perform("Part 1", part1, pathInputMain, hasIO);
         test(result, answers.part1);
         perform("Test 2", part2, pathInputTest2, hasIO);
         test(result, answers.test2);
         perform("Part 2", part2, pathInputMain, hasIO);
         test(result, answers.part2);
      } catch (Exception e) {
         e.printStackTrace();
      }
   }
}
