package kival.aoc.year2023.day01;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.List;

import kival.aoc.core.*;

public class Main {
   private Map<String, Integer> strToNum = new HashMap<String, Integer>() {
      {
         put("zero", 0);
         put("one", 1);
         put("two", 2);
         put("three", 3);
         put("four", 4);
         put("five", 5);
         put("six", 6);
         put("seven", 7);
         put("eight", 8);
         put("nine", 9);
         put("0", 0);
         put("1", 1);
         put("2", 2);
         put("3", 3);
         put("4", 4);
         put("5", 5);
         put("6", 6);
         put("7", 7);
         put("8", 8);
         put("9", 9);
      }
   };

   private String[] lookFor = new String[] {
         "zero",
         "one",
         "two",
         "three",
         "four",
         "five",
         "six",
         "seven",
         "eight",
         "nine",
         "0",
         "1",
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9"
   };

   public String part1(String input, boolean isTest) {
      Integer res = 0;
      for (String line : input.split("\n")) {
         char first = '\0';
         char last = '\0';
         char current = '\0';
         for (int i = 0; i < line.length(); i++) {
            current = line.charAt(i);
            if (Character.isDigit(current)) {
               first = current;
               break;
            }
         }
         for (int i = line.length() - 1; i >= 0; i--) {
            current = line.charAt(i);
            if (Character.isDigit(current)) {
               last = current;
               break;
            }
         }
         res += Integer.parseInt(new StringBuilder().append(first).append(last).toString());
      }
      return res.toString();
   }

   public String part2(String input, boolean isTest) {
      int res = 0;
      for (String line : input.split("\n")) {
         List<String> allMatches = new ArrayList<String>();
         for (int i = 0; i < line.length(); i++) {
            String m = line.substring(i);
            for (String look : lookFor) {
               if (m.startsWith(look)) {
                  allMatches.add(look);
                  break;
               }
            }
         }
         res += strToNum.get(allMatches.getFirst()) * 10 + strToNum.get(allMatches.getLast());
      }
      return String.valueOf(res);
   }

   public void main(String[] args) {
      Options.SolutionOptions options = new Options.SolutionOptions();
      options.hasAlternate = true;
      Runner.run(args, this::part1, this::part2, options);
   }
}