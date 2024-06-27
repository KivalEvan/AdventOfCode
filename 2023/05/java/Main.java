package kival.aoc;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.*;

import kival.aoc.core.*;

public class Main {
   private record Pair<K, V>(K v1, V v2) {
   }

   public final boolean HAS_IO = false;
   public final boolean HAS_ALTERNATE = false;

   private Pair<List<long[]>, long[][][]> parseInput(String input, boolean single)
   {
      String[] parsed = input.split("\n\n");
      long[] header = Stream.of(parsed[0]
            .split(":")[1]
            .split(" "))
         .filter((str) -> str != "")
         .mapToLong(Long::parseLong)
         .toArray();
      List<long[]> seedRanges = new ArrayList<>();
      if (single) {
         for (int i = 0; i < header.length; i++) {
            seedRanges.add(new long[] { header[i], header[i] });
         }
      }
      else {
         for (int i = 0; i < header.length; i += 2) {
            seedRanges.add(new long[] { header[i], header[i] + header[i + 1] });
         }
      }

      long[][][] srcToDestRanges = Stream.of(parsed)
         .skip(1)
         .map(
            (p) -> Stream.of(p
               .split("\n"))
               .skip(1)
               .map((str) -> Stream.of(str.split(" ")).mapToLong(Long::parseLong).toArray())
               .map((v) -> new long[] {v[1], v[1] + v[2] - 1, v[0], v[0] + v[2] - 1})
               .toArray(long[][]::new)
         )
         .toArray(long[][][]::new);

      return new Pair<>(seedRanges, srcToDestRanges);
   }

   private String solve(String input, boolean single) {
      Pair<List<long[]>, long[][][]> parsed = parseInput(input, single);
      List<long[]> seedRanges = parsed.v1;
      long[][][] srcToDestRanges = parsed.v2;

      for (long[][] groups : srcToDestRanges) {
         for (long[] g : groups) {
            List<long[]> newSeeds = new ArrayList<>();
            for (long[] r : seedRanges) {
               if (r[0] < g[0] && g[0] < r[1]) {
                  newSeeds.add(new long[] {r[0], g[0] - 1});
                  r[0] = g[0];
               }
               if (r[0] < g[1] && g[1] < r[1]) {
                  newSeeds.add(new long[] {g[1] + 1, r[1]});
                  r[1] = g[1];
               }
            }
            seedRanges.addAll(newSeeds);
         }
         for (long[] r : seedRanges) {
            long[] found = null;
            for (long[] gr : groups) {
               if (gr[0] <= r[0] && r[0] <= gr[1] && r[1] >= gr[0] && gr[1] >= r[1]) {
                  found = gr;
                  break;
               }
            }
            if (found != null) {
               long diff = found[2] - found[0];
               r[0] += diff;
               r[1] += diff;
            }
         }
      }

      return String.valueOf(seedRanges.stream().mapToLong(x -> x[0]).min().orElseThrow(NoSuchElementException::new));
   }

   public String part1(String input, boolean isTest) {
      return solve(input, true);
   }

   public String part2(String input, boolean isTest) {
      return solve(input, false);
   }

   public void main(String[] args) {
      Run.execute(args, this::part1, this::part2, HAS_ALTERNATE, HAS_IO);
   }
}