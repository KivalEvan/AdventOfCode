#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <math.h>
#include <stdint.h>
#include <string.h>

static char *solve(const char *restrict input, const int32_t isTest,
                   const int32_t p2) {
   size_t sz;
   char **lines = str_splitc(input, '\n', &sz);
   int64_t res = 0;

   for (size_t i = 0; i < sz; i++) {
      char *line = lines[i];
      size_t len = strlen(line);
      size_t start = 0;
      size_t max = p2 ? 12 : 2;

      for (size_t digit = 0; digit < max; digit++) {
         size_t marked = 0;
         int64_t n = 0;
         size_t t = max - 1 - digit;
         size_t l = len - t;
         for (size_t it = start; it < l; it++) {
            int64_t parsed = line[it] - '0';
            if (n < parsed) {
               marked = it;
               n = parsed;
            }
         }

         start = marked + 1;
         res += n * (int64_t)pow(10, t);
      }

      free(line);
   }

   free(lines);
   return num_tostr(res);
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
