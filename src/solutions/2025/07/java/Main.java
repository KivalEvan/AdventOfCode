package kival.aoc.year2025.day07;

import kival.aoc.core.*;

public class Main {
   public String solve(String input, boolean isTest, boolean p2) {
      long total = 0;
      int len = input.indexOf('\n');
      long[] buffer = new long[141];
      for (int i = 0; i < 141; i++) {
         buffer[i] = 0;
      }
      buffer[input.indexOf('S')] = 1;

      for (int i = 0; i < input.length(); i++) {
         char c = input.charAt(i);
         if (c == '^') {
            int x = i % (len + 1);
            if (buffer[x] > 0) {
               total++;
            }
            buffer[x - 1] = buffer[x - 1] + buffer[x];
            buffer[x + 1] = buffer[x + 1] + buffer[x];
            buffer[x] = 0;
         }
      }

      if (p2) {
         total = 0;
         for (int i = 0; i < len; i++) {
            total += buffer[i];
         }
      }

      return String.valueOf(total);
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