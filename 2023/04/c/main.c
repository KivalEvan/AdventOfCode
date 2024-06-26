#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <math.h>
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_IO = 0;
static const int32_t HAS_ALTERNATE = 0;

static void parse_input(const char *restrict input, int32_t ****scratchCards,
                        size_t *scratchSz, size_t *winSz, size_t *ownedSz) {
   size_t sz_s, sz_r, sz_l, i, j, k;
   char **lines, *line, **parts, **scratches, **winCh, **ownedCh;

   lines = str_splitc(input, '\n', scratchSz);
   *scratchCards = malloc(*scratchSz * sizeof(***scratchCards));
   for (i = 0; i < *scratchSz; i++) {
      line = lines[i];
      (*scratchCards)[i] = malloc(2 * sizeof(**scratchCards));

      parts = str_splitc(line, ':', &sz_s);
      scratches = str_splitc(parts[1], '|', &sz_s);
      winCh = str_splitc(scratches[0], ' ', &sz_l);
      ownedCh = str_splitc(scratches[1], ' ', &sz_r);
      free(scratches[0]);
      free(scratches[1]);
      free(scratches);
      free(parts[0]);
      free(parts[1]);
      free(parts);

      *winSz = 0;
      for (j = 0; j < sz_l; j++) {
         if (strlen(winCh[j]))
            (*winSz)++;
      }
      (*scratchCards)[i][0] = malloc((*winSz) * sizeof(*scratchCards));
      for (j = 0, k = 0; j < sz_l; j++) {
         if (strlen(winCh[j]))
            (*scratchCards)[i][0][k++] = atoi(winCh[j]);
         free(winCh[j]);
      }
      free(winCh);

      *ownedSz = 0;
      for (j = 0; j < sz_r; j++) {
         if (strlen(ownedCh[j]))
            (*ownedSz)++;
      }
      (*scratchCards)[i][1] = malloc((*ownedSz) * sizeof(*scratchCards));
      for (j = 0, k = 0; j < sz_r; j++) {
         if (strlen(ownedCh[j]))
            (*scratchCards)[i][1][k++] = atoi(ownedCh[j]);
         free(ownedCh[j]);
      }
      free(ownedCh);
      free(lines[i]);
   }
   free(lines);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t scratchSz, winSz, ownedSz, i, x, y;
   int32_t ***scratchCards, factor, res = 0;

   parse_input(input, &scratchCards, &scratchSz, &winSz, &ownedSz);

   for (i = 0; i < scratchSz; i++) {
      factor = -1;
      for (x = 0; x < winSz; x++)
         for (y = 0; y < ownedSz; y++)
            if (scratchCards[i][1][y] == scratchCards[i][0][x])
               factor++;
      free(scratchCards[i][0]);
      free(scratchCards[i][1]);
      free(scratchCards[i]);

      res += factor != -1 ? pow(2, factor) : 0;
   }
   free(scratchCards);

   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t scratchSz, winSz, ownedSz, i, x, y;
   int32_t ***scratchCards, *instances, won, res = 0;

   parse_input(input, &scratchCards, &scratchSz, &winSz, &ownedSz);
   instances = malloc(scratchSz * sizeof(*instances));
   for (i = 0; i < scratchSz; i++)
      instances[i] = 1;

   for (i = 0; i < scratchSz; i++) {
      won = 0;
      for (x = 0; x < winSz; x++)
         for (y = 0; y < ownedSz; y++)
            if (scratchCards[i][1][y] == scratchCards[i][0][x])
               won++;
      free(scratchCards[i][0]);
      free(scratchCards[i][1]);
      free(scratchCards[i]);

      while (won) {
         instances[i + won] += instances[i];
         won--;
      }
   }
   free(scratchCards);

   for (i = 0; i < scratchSz; i++)
      res += instances[i];
   free(instances);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE, HAS_IO);
}
