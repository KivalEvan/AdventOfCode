package kival.aoc.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

public class Run {
   private static double round(double value, int places) {
      if (places < 0)
         throw new IllegalArgumentException();

      BigDecimal bd = new BigDecimal(Double.toString(value));
      bd = bd.setScale(places, RoundingMode.HALF_UP);
      return bd.doubleValue();
   }

   private static String result = "";

   private static void test(String actual, String expected) {
      if (expected.equals("")) return;
      if (!actual.equals(expected)) throw new Error(STR."Expected \{expected} but got \{actual}");
   }

   private static void perform(String tag, Function<String, String> func, String path) {
      System.out.println(STR."\n\\ \{tag}");
      long start = 0, end = 0;
      
      start = System.nanoTime();
      result = func.apply(path);
      end = System.nanoTime();
      double elapsed = round((double)(end - start) / 1_000_000, 3);
      System.out.println(STR." -- IO time (ms): \{elapsed}");

      start = System.nanoTime();
      result = func.apply(path);
      end = System.nanoTime();
      elapsed = round((double)(end - start) / 1_000_000, 3);
      System.out.println(STR." -- Time taken (ms): \{elapsed}");

      System.out.println(STR."/ Result: \{result}");
   }

   public static void execute(String[] args, Function<String, String> part1, Function<String, String> part2,
         boolean hasAlternate) {
      try {
         if (args.length == 0) {
            throw new Error("Usage: <path/to/year/day/java>\n");
         }
         Input.Answers answers = Input.getAnswers(args[0] + "/../answers.txt");

         perform("Test 1", part1, Input.getInput(args[0] + "/../test1.txt"));
         test(result, answers.test1);

         perform("Part 1", part1, Input.getInput(args[0] + "/../input.txt"));
         test(result, answers.part1);

         perform("Test 2", part2, Input.getInput(args[0] + (hasAlternate ? "/../test2.txt" : "/../test1.txt")));
         test(result, answers.test2);

         perform("Part 2", part2, Input.getInput(args[0] + "/../input.txt"));
         test(result, answers.part2);
      } catch (Exception e) {
         e.printStackTrace();
      }
   }
}
