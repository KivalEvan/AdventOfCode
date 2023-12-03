package kival.aoc.utils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Input {
   public static class Answers {
      public String test1, test2, part1, part2;
   }

   public static String getInput(String path) throws IOException {
      return new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
   }

   public static Answers getAnswers(String path) throws IOException {
      String input = getInput(path);
      Answers answers = new Answers();
      int idx = 0;
      for (String line : input.split("\n")) {
         switch (idx) {
            case 0:
               answers.test1 = line;
               break;
            case 1:
               answers.part1 = line;
               break;
            case 2:
               answers.test2 = line;
               break;
            case 3:
               answers.part2 = line;
               break;
         }
         idx++;
      }

      return answers;
   }
}
