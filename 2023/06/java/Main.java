package kival.aoc;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import kival.aoc.core.*;

public class Main {
   public final boolean HAS_IO = false;
   public final boolean HAS_ALTERNATE = false;

   private long ohnomath(long b, long c) {
      double pepsilon = 0.001;
      double mn = Math.floor((b + Math.sqrt(Math.abs(b * b - 4 * c))) / 2 - pepsilon);
      double mx = Math.ceil((b - Math.sqrt(Math.abs(b * b - 4 * c))) / 2 + pepsilon);
      return (long) (mn - mx + 1);
   }
   
   public String part1(String input,boolean isTest) {
      long res = 1;
      long[][] td = input.lines()
         .map(x -> x.split(":")[1].trim().split(" "))
         .map(x -> Stream.of(x).filter(y -> !y.isEmpty()).mapToLong(Long::parseLong).toArray())
         .toArray(long[][]::new);
      for (int i = 0; i < td[0].length; i++) res *= ohnomath(td[0][i], td[1][i]);
      return String.valueOf(res);
   }

   public String part2(String input,boolean isTest) {
      long[] td = input.lines()
         .map(x -> String.join("", x.split(":")[1].trim().split(" ")))
         .mapToLong(Long::parseLong)
         .toArray();
      return String.valueOf(ohnomath(td[0], td[1]));
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}