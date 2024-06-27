package kival.aoc.year2023.day03;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import kival.aoc.core.*;

public class Main {
   public final boolean HAS_IO = false;
public final boolean HAS_ALTERNATE = false;

   private boolean isSymbol(char c) {
      return (c == '*' ||
            c == '$' ||
            c == '=' ||
            c == '#' ||
            c == '%' ||
            c == '/' ||
            c == '&' ||
            c == '+' ||
            c == '-' ||
            c == '@');
   }

   private int tryParseInt(String value) {
      try {
         return Integer.parseInt(value);
      } catch (NumberFormatException e) {
         return 0;
      }
   }

   private String yeetTheNumber(char[][] grid, int x, int y) {
      StringBuilder res = new StringBuilder();
      if (Character.isDigit(grid[y][x])) {
         res.append(grid[y][x]);
         grid[y][x] = '.';

         if (x > 0)
            res.insert(0, yeetTheNumber(grid, x - 1, y));
         if (x < grid[y].length - 1)
            res.append(yeetTheNumber(grid, x + 1, y));
      }
      return res.toString();
   }

   public String part1(String input, boolean isTest) {
      char[][] grid = input.lines().map(s -> s.toCharArray()).toArray(char[][]::new);
      int SZ = grid.length;
      int res = 0;

      for (int y = 0; y < SZ; y++) {
         for (int x = 0; x < SZ; x++) {
            if (isSymbol(grid[y][x])) {
               if (x > 0) {
                  if (y < SZ - 1)
                     res += tryParseInt(yeetTheNumber(grid, x - 1, y + 1));
                  if (y > 0)
                     res += tryParseInt(yeetTheNumber(grid, x - 1, y - 1));
                  res += tryParseInt(yeetTheNumber(grid, x - 1, y));
               }
               if (x < SZ - 1) {
                  if (y < SZ - 1)
                     res += tryParseInt(yeetTheNumber(grid, x + 1, y + 1));
                  if (y > 0)
                     res += tryParseInt(yeetTheNumber(grid, x + 1, y - 1));
                  res += tryParseInt(yeetTheNumber(grid, x + 1, y));
               }
               if (y > 0)
                  res += tryParseInt(yeetTheNumber(grid, x, y - 1));
               if (y < SZ - 1)
                  res += tryParseInt(yeetTheNumber(grid, x, y + 1));
            }
         }
      }

      return String.valueOf(res);
   }

   public String part2(String input, boolean isTest) {
      char[][] grid = input.lines().map(s -> s.toCharArray()).toArray(char[][]::new);
      int SZ = grid.length;
      int res = 0;

      for (int y = 0; y < SZ; y++) {
         for (int x = 0; x < SZ; x++) {
            if (grid[y][x] == '*') {
               List<Integer> list = new ArrayList<Integer>();
               if (x > 0) {
                  if (y < SZ - 1)
                     list.add(tryParseInt(yeetTheNumber(grid, x - 1, y + 1)));
                  if (y > 0)
                     list.add(tryParseInt(yeetTheNumber(grid, x - 1, y - 1)));
                  list.add(tryParseInt(yeetTheNumber(grid, x - 1, y)));
               }
               if (x < SZ - 1) {
                  if (y < SZ - 1)
                     list.add(tryParseInt(yeetTheNumber(grid, x + 1, y + 1)));
                  if (y > 0)
                     list.add(tryParseInt(yeetTheNumber(grid, x + 1, y - 1)));
                  list.add(tryParseInt(yeetTheNumber(grid, x + 1, y)));
               }
               if (y > 0)
                  list.add(tryParseInt(yeetTheNumber(grid, x, y - 1)));
               if (y < SZ - 1)
                  list.add(tryParseInt(yeetTheNumber(grid, x, y + 1)));

               list.removeIf(n -> n == 0);
               if (list.size() == 2)
                  res += list.stream().reduce(1, (t, v) -> t * v);
            }
         }
      }

      return String.valueOf(res);
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}