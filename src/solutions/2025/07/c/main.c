#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stdint.h>
#include <string.h>

static char *solve(const char *restrict input, const int32_t isTest,
                   const int32_t p2) {
   int64_t total = 0;
   size_t size = str_idxofc(input, '\n');
   size_t len = strlen(input);

   int64_t buffer[141] = {0};
   buffer[str_idxofc(input, 'S')] = 1;

   for (size_t i = 0; i < len; i++) {
      size_t x = i % (size + 1);
      if (input[i] != '^')
         continue;
      if (buffer[x] > 0)
         total++;
      buffer[x - 1] += buffer[x];
      buffer[x + 1] += buffer[x];
      buffer[x] = 0;
   }

   if (p2) {
      total = 0;
      for (size_t i = 0; i < size; i++) {
         total += buffer[i];
      }
   }

   return num_tostr(total);
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
