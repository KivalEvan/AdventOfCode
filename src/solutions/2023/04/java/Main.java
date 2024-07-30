package kival.aoc.year2023.day04;

import java.util.ArrayList;
import java.util.List;

import kival.aoc.core.*;

public class Main {
   public final boolean HAS_IO = false;
   public final boolean HAS_ALTERNATE = false;

   public String part1(String input,boolean isTest) {
      int res = 0;
      for (String line : input.split("\n")) {
         List<List<Integer>> sides = new ArrayList<List<Integer>>();
         for (String scratch : line.substring(line.indexOf(":") + 1).split("\\|")) {
            List<Integer> l = new ArrayList<Integer>();
            for (String num : scratch.split(" ")) {
               if (num == "") continue;
               l.add(Integer.parseInt(num));
            }
            sides.add(l);
         }
         int pow = -1;
         for (Integer n : sides.get(0)) if (sides.get(1).contains(n)) pow++;
         res += pow != -1 ? (int)Math.pow(2, pow) : 0;
      }
      return String.valueOf(res);
   }

   public String part2(String input,boolean isTest) {
      String[] lines = input.split("\n");
      int[] instances = new int[lines.length];
      for (int i = 0; i < instances.length; i++)
         instances[i] = 1;
      
      int idx = 0;
      for (String line : lines) {
         List<List<Integer>> sides = new ArrayList<List<Integer>>();
         for (String scratch : line.substring(line.indexOf(":") + 1).split("\\|")) {
            List<Integer> l = new ArrayList<Integer>();
            for (String num : scratch.split(" ")) {
               if (num == "") continue;
               l.add(Integer.parseInt(num));
            }
            sides.add(l);
         }
         int i = 0;
         for (Integer n : sides.get(0)) if (sides.get(1).contains(n)) i++;
         while (i > 0) {
            instances[idx + i] += instances[idx];
            i--;
         }
         idx++;
      }

      int res = 0;
      for (int i = 0; i < instances.length; i++)
         res += instances[i];
      return String.valueOf(res);
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}