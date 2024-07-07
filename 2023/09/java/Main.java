package kival.aoc.year2023.day09;

import kival.aoc.core.*;

import java.util.stream.*;
import java.util.Arrays;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

public class Main {
   public final boolean HAS_IO = false;
   public final boolean HAS_ALTERNATE = false;

   private long[] Difference(long[] ary, int n) {
      for (int i = 0; i < n; i++)
         ary[i] = ary[i + 1] - ary[i];
      return ary;
   }

   private long Extrapolate(long[] ary, int n) {
      n--;
      Long last = ary[n];
      if (n == 0)
         return last;
      return Extrapolate(Difference(ary, n), n) + last;
   }

   public String part1(String input, boolean isTest) {
      return String.valueOf(Stream.of(input.split("\n"))
         .map(x -> Stream.of(x.split(" "))
            .mapToLong(Long::parseLong)
            .toArray())
         .mapToLong(x -> Extrapolate(x, x.length))
         .sum());
   }

   public String part2(String input, boolean isTest) {
      return String.valueOf(Stream.of(input.split("\n"))
         .map(x -> Stream.of(x.split(" "))
            .mapToLong(Long::parseLong)
            .toArray())
         .mapToLong(x -> {
            for(int i = 0; i < x.length / 2; i++) {
               long temp = x[i];
               x[i] = x[x.length - i - 1];
               x[x.length - i - 1] = temp;
            }
            return Extrapolate(x, x.length);
         })
         .sum());
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}