package kival.aoc.year.day;

import kival.aoc.core.*;

public class Main {
   public String solve(String input, boolean isTest, boolean p2) {
      return "";
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