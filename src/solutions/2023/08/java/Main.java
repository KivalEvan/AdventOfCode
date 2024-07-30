package kival.aoc.year2023.day08;

import kival.aoc.core.*;

import java.util.stream.*;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

public class Main {
   public final boolean HAS_IO = false;
public final boolean HAS_ALTERNATE = false;

   private long gcd(long a, long b) {
      return b == 0 ? a : gcd(b, a % b);
   }

   private long lcm(long a, long b) {
      return (a * b) / gcd(a, b);
   }

   public String part1(String input, boolean isTest) {
      String[] lines = input.split("\n");
      char[] instructions = lines[0].toCharArray();
      Map<String, String[]> maps = new HashMap<>();
      for (int i = 2; i < lines.length; i++) {
         String[] chunks = lines[i].split(" = ");
         String dest = chunks[0];
         String[] lr = chunks[1].substring(1, chunks[1].length() - 1).split(", ");
         maps.put(dest, lr);
      }
      int idx = 0;
      String nav = "AAA";
      while (true) {
         String[] map = maps.get(nav);
         var c = instructions[idx % instructions.length];
         var m = c == 'L' ? 0 : 1;
         nav = map[m];
         idx++;
         if (nav.equals("ZZZ")) break;
      }
      return String.valueOf(idx);
   }

   public String part2(String input, boolean isTest) {
      String[] lines = input.split("\n");
      char[] instructions = lines[0].toCharArray();
      Map<String, String[]> maps = new HashMap<>();
      List<String> navs = new ArrayList<>();
      for (int i = 2; i < lines.length; i++) {
         String[] chunks = lines[i].split(" = ");
         String dest = chunks[0];
         String[] lr = chunks[1].substring(1, chunks[1].length() - 1).split(", ");
         maps.put(dest, lr);
         if (dest.charAt(2) == 'A') {
            navs.add(dest);
         }
      }

      long res = 1;
      for (int i = 0; i < navs.size(); i++) {
         int j = 0;
         while (true) {
            String[] map = maps.get(navs.get(i));
            var c = instructions[j % instructions.length];
            var m = c == 'L' ? 0 : 1;
            navs.set(i, map[m]);
            j++;
            if (navs.get(i).charAt(2) == 'Z') break;
         }
         res = lcm(res, j);
      }
      return String.valueOf(res);
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}