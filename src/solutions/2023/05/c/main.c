#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include "utils_vec.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void parse_input(const char *restrict input, struct Vector **seedRanges,
                        int64_t *****srcDestRanges, size_t srcDestRSz[7],
                        const int32_t single) {
   char **chunks, **lines, **parts;
   size_t chunksSz, chunksIdx[7], linesSz, partsSz, i, j, k, idx;
   int64_t *tuple, v[3], num;

   *seedRanges = vec_create(1, NULL);
   *srcDestRanges = malloc(7 * sizeof(****srcDestRanges));

   chunks = str_splitc(input, '\n', &chunksSz);

   parts = str_splitc(chunks[0], ':', &partsSz);
   lines = str_splitc(parts[1], ' ', &linesSz);
   for (i = 0; i < linesSz; i++) {
      if (strlen(lines[i])) {
         num = atol(lines[i]);
         tuple = malloc(2 * sizeof(*tuple));
         if (single) {
            tuple[0] = num;
            tuple[1] = num;
         } else {
            tuple[0] = num;
            free(lines[i]);
            num = atol(lines[++i]);
            tuple[1] = tuple[0] + num - 1;
         }
         vec_push(*seedRanges, tuple);
      }
      free(lines[i]);
   }
   free(lines);
   for (i = 0; i < partsSz; i++)
      free(parts[i]);
   free(parts);

   for (i = 0; i < 7; i++)
      srcDestRSz[i] = -1;
   chunksIdx[0] = 3;
   for (i = 2, j = 0; i < chunksSz; i++) {
      if (strlen(chunks[i]))
         srcDestRSz[j]++;
      else {
         j++;
         chunksIdx[j] = i + 2;
      }
   }
   for (i = 0; i < 7; i++) {
      (*srcDestRanges)[i] = malloc(srcDestRSz[i] * sizeof(***srcDestRanges));
      idx = chunksIdx[i];
      for (j = 0; j < srcDestRSz[i]; j++) {
         parts = str_splitc(chunks[idx + j], ' ', &partsSz);
         for (k = 0; k < partsSz; k++) {
            v[k] = atol(parts[k]);
            free(parts[k]);
         }
         free(parts);
         (*srcDestRanges)[i][j] = malloc(2 * sizeof(**srcDestRanges));
         (*srcDestRanges)[i][j][0] = malloc(2 * sizeof(*srcDestRanges));
         (*srcDestRanges)[i][j][0][0] = v[1];
         (*srcDestRanges)[i][j][0][1] = v[1] + v[2] - 1;
         (*srcDestRanges)[i][j][1] = malloc(2 * sizeof(*srcDestRanges));
         (*srcDestRanges)[i][j][1][0] = v[0];
         (*srcDestRanges)[i][j][1][1] = v[0] + v[2] - 1;
      }
   }

   for (i = 0; i < chunksSz; i++)
      free(chunks[i]);
   free(chunks);
}

static char *solve(const char *restrict input, const int32_t single) {
   struct Vector *seedRanges;
   int64_t ****srcDestRanges, ***groups, *r, *src, *nSeeds, **found, diff, min;
   size_t i, j, k, groupSz, srcDestRSz[7], sz = 7, len;

   parse_input(input, &seedRanges, &srcDestRanges, srcDestRSz, single);

   for (i = 0; i < sz; i++) {
      groups = srcDestRanges[i];
      groupSz = srcDestRSz[i];
      for (j = 0; j < groupSz; j++) {
         src = groups[j][0];
         len = seedRanges->length;
         for (k = 0; k < len; k++) {
            r = vec_get(seedRanges, k);
            if (r[0] < src[0] && src[0] < r[1]) {
               nSeeds = malloc(2 * sizeof(*nSeeds));
               nSeeds[0] = r[0];
               nSeeds[1] = src[0] - 1;
               vec_push(seedRanges, nSeeds);
               r[0] = src[0];
            }
            if (r[0] < src[1] && src[1] < r[1]) {
               nSeeds = malloc(2 * sizeof(*nSeeds));
               nSeeds[0] = src[1] + 1;
               nSeeds[1] = r[1];
               vec_push(seedRanges, nSeeds);
               r[1] = src[1];
            }
         }
      }
      len = seedRanges->length;
      for (k = 0; k < len; k++) {
         r = vec_get(seedRanges, k);
         found = NULL;
         for (j = 0; j < groupSz; j++) {
            if (groups[j][0][0] <= r[0] && r[0] <= groups[j][0][1] &&
                r[1] >= groups[j][0][0] && groups[j][0][1] >= r[1]) {
               found = groups[j];
               break;
            }
         }
         if (found) {
            diff = found[1][0] - found[0][0];
            r[0] += diff;
            r[1] += diff;
         }
      }
   }
   min = INT64_MAX;
   for (i = 0; i < seedRanges->length; i++) {
      r = vec_get(seedRanges, i);
      if (r[0] < min)
         min = r[0];
   }
   vec_destroy(seedRanges);

   for (i = 0; i < sz; i++) {
      for (j = 0; j < srcDestRSz[i]; j++) {
         free(srcDestRanges[i][j][0]);
         free(srcDestRanges[i][j][1]);
         free(srcDestRanges[i][j]);
      }
      free(srcDestRanges[i]);
   }
   free(srcDestRanges);

   return num_tostr(min);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   return solve(input, 1);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   return solve(input, 0);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
   return run(argc, argv, part1, part2, options);
}
