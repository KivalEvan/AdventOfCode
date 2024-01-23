#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <math.h>
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_ALTERNATE = 0;

static int64_t ohnomath(const int64_t b, const int64_t c) {
   double min = floor((-b - sqrt(b * b - 4 * c)) / -2 - 0.001);
   double max = ceil((-b + sqrt(b * b - 4 * c)) / -2 + 0.001);
   return min - max + 1;
}

static int64_t *getnum(const char *restrict str, size_t *count) {
   size_t chonkSz, i, j;
   int64_t *ary;
   char **chonk;

   *count = 0;
   chonk = str_splitc(str, ' ', &chonkSz);
   for (i = 0; i < chonkSz; i++)
      if (strlen(chonk[i]))
         (*count)++;

   ary = malloc(*count * sizeof(*ary));
   for (i = 0, j = 0; i < chonkSz; i++) {
      if (strlen(chonk[i]))
         ary[j++] = atoll(chonk[i]);
      free(chonk[i]);
   }
   free(chonk);

   return ary;
}

static int64_t getnumjoin(const char *restrict str) {
   size_t chonkSz, i;
   int64_t res;
   char **chonk;

   chonk = str_splitc(str, ' ', &chonkSz);
   res = 0;
   for (i = 0; i < chonkSz; i++) {
      if (i)
         res *= pow(10, (int64_t)strlen(chonk[i]));
      res += atoll(chonk[i]);
      free(chonk[i]);
   }
   free(chonk);

   return res;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t chunksSz, linesSz, timesSz, distancesSz, i;
   int64_t *times, *distances, res;
   char **chunks, **lines;

   lines = str_splitc(input, '\n', &linesSz);
   chunks = str_splitc(lines[0], ':', &chunksSz);
   times = getnum(chunks[1], &timesSz);
   free(chunks[0]);
   free(chunks[1]);
   free(chunks);

   chunks = str_splitc(lines[1], ':', &chunksSz);
   distances = getnum(chunks[1], &distancesSz);
   free(chunks[0]);
   free(chunks[1]);
   free(chunks);

   free(lines[0]);
   free(lines[1]);
   free(lines);

   res = 1;
   for (i = 0; i < timesSz; i++)
      res *= ohnomath(times[i], distances[i]);

   free(times);
   free(distances);

   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t chunksSz, linesSz;
   int64_t time, distance;
   char **chunks, **lines;

   lines = str_splitc(input, '\n', &linesSz);
   chunks = str_splitc(lines[0], ':', &chunksSz);
   time = getnumjoin(chunks[1]);
   free(chunks[0]);
   free(chunks[1]);
   free(chunks);

   chunks = str_splitc(lines[1], ':', &chunksSz);
   distance = getnumjoin(chunks[1]);
   free(chunks[0]);
   free(chunks[1]);
   free(chunks);

   free(lines[0]);
   free(lines[1]);
   free(lines);

   return num_tostr(ohnomath(time, distance));
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
