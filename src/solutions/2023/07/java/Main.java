package kival.aoc.year2023.day07;

import java.util.stream.*;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

import kival.aoc.core.*;

public class Main {
   private Map<Character, Integer> Ranking = new HashMap<Character, Integer>() {
      {
         put('A', 13);
         put('K', 12);
         put('Q', 11);
         put('J', 10);
         put('T', 9);
         put('9', 8);
         put('8', 7);
         put('7', 6);
         put('6', 5);
         put('5', 4);
         put('4', 3);
         put('3', 2);
         put('2', 1);
         put('1', 0);
      }
   };

   private enum Type {
      HIGH_CARD,
      ONE_PAIR,
      TWO_PAIR,
      THREE_OF_A_KIND,
      FULL_HOUSE,
      FOUR_OF_A_KIND,
      FIVE_OF_A_KIND;
   }

   private record Pair(String v1, Integer v2) {
   }

   private int sortCard(Pair a, Pair b) {
      for (int i = 0; i < 5; i++)
         if (a.v1.charAt(i) != b.v1.charAt(i))
            return Ranking.get(a.v1.charAt(i)) - Ranking.get(b.v1.charAt(i));
      return 0;
   }

   private static int indexOfIntArray(int[] array, int key) {
      int returnvalue = -1;
      for (int i = 0; i < array.length; ++i) {
          if (key == array[i]) {
              returnvalue = i;
              break;
          }
      }
      return returnvalue;
   }
  
   private int getType(String str) {
      int[] values = new int[14];
      Arrays.fill(values, 0);
      for (int i = 0; i < str.length(); i++) {
         values[Ranking.get(str.charAt(i))]++;
      }
      if (values[0] > 0) {
         var temp = values[0];
         values[0] = 0;
         int max = Arrays.stream(values).max().getAsInt();
         int idx = indexOfIntArray(values, max);
         values[idx] += temp;
      }

      values = Arrays.stream(values).filter((e) -> e > 0).toArray();
      if (values.length == 1)
         return Type.FIVE_OF_A_KIND.ordinal();
      if (values.length == 4)
         return Type.ONE_PAIR.ordinal();
      if (values.length == 5)
         return Type.HIGH_CARD.ordinal();

      int min = 5;
      int max = 0;
      for (var v : values) {
         if (min > v)
            min = v;
         if (max < v)
            max = v;
      }
      if (min == 1) {
         if (max == 2)
            return Type.TWO_PAIR.ordinal();
         if (max == 3)
            return Type.THREE_OF_A_KIND.ordinal();
         if (max == 4)
            return Type.FOUR_OF_A_KIND.ordinal();
      }
      return Type.FULL_HOUSE.ordinal();
   }

   private Pair[][] parseInput(String input, boolean joker) {
      return input
            .lines()
            .map(str -> {
               String[] temp = str.split(" ");
               if (joker)
                  temp[0] = temp[0].replaceAll("J", "1");
               return new Pair(temp[0], Integer.parseInt(temp[1]));
            })
            .collect(Collectors.groupingBy(p -> getType(p.v1())))
            .values()
            .stream()
            .map(p -> p.toArray(Pair[]::new))
            .toArray(Pair[][]::new);
   }

   private String solve(String input, boolean joker) {
      var td = parseInput(input, joker);
      int res = 0;
      int i = 0;
      for (var p : td) {
         for (var q : Stream.of(p).sorted(this::sortCard).toArray(Pair[]::new)) {
            res += (Integer)q.v2 * (i + 1);
            i++;
         }
      }
      return String.valueOf(res);
   }

   public String part1(String input, boolean isTest) {
      return solve(input, false);
   }

   public String part2(String input, boolean isTest) {
      return solve(input, true);
   }

   public void main(String[] args) {
      Options.SolutionOptions options = new Options.SolutionOptions();
      Runner.run(args, this::part1, this::part2, options);
   }
}