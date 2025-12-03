package kival.aoc.year2025.day01;

import kival.aoc.core.*;

public class Main {
   public String solve(String input, boolean isTest, boolean p2) {
      int dial = 50;
      int zero = 0;
      for (String line : input.split("\n")) {
         int newDial = dial + Integer.parseInt(line.substring(1)) * (line.charAt(0) == 'R' ? 1 : -1);

         if (p2) {
            zero += Math.abs(newDial) / 100 + (dial != 0 && newDial <= 0 ? 1 : 0);
            dial = Math.floorMod(newDial, 100);
         } else {
            dial = newDial;
            if (dial % 100 == 0)
               zero++;
         }
      }

      return Integer.toString(zero);
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