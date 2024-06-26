package kival.aoc;

import java.util.ArrayList;
import java.util.List;

import kival.aoc.core.*;

public class Main {
   public final boolean HAS_IO = false;
public final boolean HAS_ALTERNATE = false;

   private class PogCube {
      public String type;
      public int amount;
   }

   private PogCube[] getCubes(String game) {
      String[] str = game.substring(game.indexOf(':') + 1).split(",|;");
      PogCube[] cubes = new PogCube[str.length];
      int i = 0;
      for (String chunk : str) {
         String[] val = chunk.trim().split(" ");
         PogCube cube = new PogCube();
         cube.type = val[1];
         cube.amount = Integer.parseInt(val[0]);
         cubes[i++] = cube;
      }
      return cubes;
   }

   public String part1(String input, boolean isTest) {
      int res = 0;
      int idx = 0;
      main: for (String line : input.split("\n")) {
         idx++;
         PogCube[] cubes = getCubes(line);
         for (PogCube cube : cubes) {
            if (cube.type.compareTo("red") == 0 && cube.amount > 12)
               continue main;
            if (cube.type.compareTo("green") == 0 && cube.amount > 13)
               continue main;
            if (cube.type.compareTo("blue") == 0 && cube.amount > 14)
               continue main;
         }
         res += idx;
      }
      return String.valueOf(res);
   }

   public String part2(String input, boolean isTest) {
      int res = 0;
      for (String line : input.split("\n")) {
         PogCube[] cubes = getCubes(line);
         int red = 0;
         int green = 0;
         int blue = 0;
         for (PogCube cube : cubes) {
            if (cube.type.compareTo("red") == 0 && cube.amount > red)
               red = cube.amount;
            if (cube.type.compareTo("green") == 0 && cube.amount > green)
               green = cube.amount;
            if (cube.type.compareTo("blue") == 0 && cube.amount > blue)
               blue = cube.amount;
         }
         res += red * green * blue;
      }
      return String.valueOf(res);
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}