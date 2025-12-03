#include "main.h"
#include "run.h"
#include "utils_math.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *solve(const char *restrict input, const int32_t isTest,
                   const int32_t p2) {
   size_t size;
   char **lines = str_splitc(input, '\n', &size);

   int32_t dial = 50;
   int32_t zero = 0;
   for (size_t i = 0; i < size; i++) {
      char *line = lines[i];
      char moveStr[3] = {0};
      str_slice(line, moveStr, 1, strlen(line));
      int32_t newDial = dial + atoi(moveStr) * (line[0] == 'R' ? 1 : -1);

      if (p2) {
         zero += abs(newDial) / 100 + (dial != 0 && newDial <= 0 ? 1 : 0);
         dial = math_i32mod(newDial, 100);
      } else {
         dial = newDial;
         if (dial % 100 == 0) {
            zero++;
         }
      }

      free(line);
   }

   free(lines);
   return num_tostr(zero);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   return solve(input, isTest, 0);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   return solve(input, isTest, 1);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
   return run(argc, argv, part1, part2, options);
}
