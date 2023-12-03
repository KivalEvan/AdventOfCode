package kival.aoc;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import kival.aoc.utils.*;

public class Main {
   public final boolean HAS_ALTERNATE = false;

   private class PogCube {
      public String type;
      public int amount;
   }

   private PogCube[] getCubes(String game) {
      return Stream.of(game.substring(game.indexOf(':') + 1).split(",|;")).map(str -> {
         String[] val = str.trim().split(" ");
         PogCube cube = new PogCube();
         cube.type = val[1];
         cube.amount = Integer.parseInt(val[0]);
         return cube;
      }).toArray(PogCube[]::new);
   }

   public String part1(String input) {
      var wrapper = new Object() {
         int idx = 0;
      };
      return Stream.of(input.split("\n")).map(this::getCubes).reduce(0, (pv, cubes) -> {
         wrapper.idx++;
         for (PogCube cube : cubes) {
            if (cube.type.compareTo("red") == 0 && cube.amount > 12)
               return pv;
            if (cube.type.compareTo("green") == 0 && cube.amount > 13)
               return pv;
            if (cube.type.compareTo("blue") == 0 && cube.amount > 14)
               return pv;
         }
         return pv + wrapper.idx;
      }, Integer::sum).toString();
   }

   public String part2(String input) {
      return Stream.of(input.split("\n")).map(this::getCubes).reduce(0, (pv, cubes) -> {
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
         return pv + red * green * blue;
      }, Integer::sum).toString();
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE);
   }
}