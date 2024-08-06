#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <ctype.h>
#include <math.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

static int64_t ohnomath(const int64_t b, const int64_t c) {
   double min = floor((-b - sqrt(b * b - 4 * c)) / -2 - 0.001);
   double max = ceil((-b + sqrt(b * b - 4 * c)) / -2 + 0.001);
   return min - max + 1;
}

static int64_t *getnum(const char *restrict str, size_t *count) {
   size_t i, j, std = 0, len, onnum;
   int64_t *ary, digits;

   *count = 0;
   len = strlen(str) + 1;
   for (i = len; i >= 0; i--) {
      if (str[i] == ':') {
         std = i + 1;
         break;
      }
      if (isdigit(str[i])) {
         if (!onnum) {
            *count = *count + 1;
            onnum = 1;
         }
      } else {
         onnum = 0;
      }
   }

   ary = malloc(*count * sizeof(*ary));
   for (j = digits = 0, i = std; i < len; i++) {
      if (isdigit(str[i])) {
         digits *= 10;
         digits += str[i] - '0';
      } else if(digits) {
         ary[j++] = digits;
         digits = 0;
      }
      if (str[i] == '\0') break;
   }

   return ary;
}

static int64_t getnumjoin(const char *restrict str) {
   size_t len, i;
   int64_t res;

   len = strlen(str);
   res = 0;
   for (i = 0; i < len; i++) {
      if (isdigit(str[i])) {
         res *= 10;
         res += str[i] - '0';
      }
   }

   return res;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t linesSz, arySz, i;
   int64_t *times, *distances, res;
   char **lines;

   lines = str_splitc(input, '\n', &linesSz);
   times = getnum(lines[0], &arySz);
   distances = getnum(lines[1], &arySz);
   free(lines[0]);
   free(lines[1]);
   free(lines);

   res = 1;
   for (i = 0; i < arySz; i++)
      res *= ohnomath(times[i], distances[i]);

   free(times);
   free(distances);

   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t linesSz;
   int64_t time, distance;
   char **lines;

   lines = str_splitc(input, '\n', &linesSz);
   time = getnumjoin(lines[0]);
   distance = getnumjoin(lines[1]);

   free(lines[0]);
   free(lines[1]);
   free(lines);

   return num_tostr(ohnomath(time, distance));
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
return run(argc, argv, part1, part2, options);
}
