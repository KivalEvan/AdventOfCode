#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_IO = 0;
static const int32_t HAS_ALTERNATE = 0;

static int64_t **parse_input(const char *restrict input, size_t *sz,
                     size_t **restrict parsedSz, const int32_t reverse) {
   size_t chunksSz, i, j;
   char **lines, **chunks;
   int64_t **ary, *aryParsed;

   lines = str_splitc(input, '\n', sz);
   ary = malloc(*sz * sizeof(*ary));
   *parsedSz = malloc(*sz * sizeof(*parsedSz));
   for (i = 0; i < *sz; i++) {
      chunks = str_splitc(lines[i], ' ', &chunksSz);
      aryParsed = malloc(chunksSz * sizeof(*aryParsed));
      for (j = 0; j < chunksSz; j++) {
         if (reverse)
            aryParsed[chunksSz - 1 - j] = atoll(chunks[j]);
         else
            aryParsed[j] = atoll(chunks[j]);
         free(chunks[j]);
      }
      ary[i] = aryParsed;
      (*parsedSz)[i] = chunksSz;
      free(chunks);
      free(lines[i]);
   }
   free(lines);

   return ary;
}

static int64_t *difference(int64_t *restrict ary, int32_t sz) {
   for (int32_t i = 0; i < sz; i++)
      ary[i] = ary[i + 1] - ary[i];
   return ary;
}

static int64_t extrapolate(int64_t *restrict ary, int32_t sz) {
   sz--;
   int64_t last = ary[sz];
   if (!sz)
      return last;
   return extrapolate(difference(ary, sz), sz) + last;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t sz, i, *parsedSz;
   int64_t **parsed, res;
   parsed = parse_input(input, &sz, &parsedSz, false);

   res = 0;
   for (i = 0; i < sz; i++) {
      res += extrapolate(parsed[i], parsedSz[i]);
      free(parsed[i]);
   }
   free(parsed);
   free(parsedSz);

   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t sz, i, *parsedSz;
   int64_t **parsed, res;
   parsed = parse_input(input, &sz, &parsedSz, true);

   res = 0;
   for (i = 0; i < sz; i++) {
      res += extrapolate(parsed[i], parsedSz[i]);
      free(parsed[i]);
   }
   free(parsed);
   free(parsedSz);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE, HAS_IO);
}
