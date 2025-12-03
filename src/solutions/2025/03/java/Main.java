package kival.aoc.year2025.day03;

import kival.aoc.core.*;

public class Main {
   public String solve(String input, boolean isTest, boolean p2) {
      long res = 0;
      for (String line : input.split("\n")) {
         int start = 0;
         int max = p2 ? 12 : 2;
         for (int digit = 0; digit < max; digit++) {
            int marked = 0;
            long n = 0;
            int t = max - 1 - digit;
            int l = line.length() - t;
            for (int it = start; it < l; it++) {
               long parsed = line.charAt(it) - '0';
               if (n < parsed) {
                  marked = it;
                  n = parsed;
               }
            }
            start = marked + 1;
            res += n * (long) Math.pow(10, t);
         }
      }

      return String.valueOf(res);
   }

   public String part1(String input, boolean isTest) {
      return solve(input, isTest, false);
   }

   public String part2(String input, boolean isTest) {
      return solve(input, isTest, true);
   }

   public void main(String[] args) {
      Options.SolutionOptions options = new Options.SolutionOptions();
      Runner.run(args, this::part1, this::part2, options);
   }
}