#include "main.h"
#include "run.h"
#include "utils_str.h"
#include "utils_num.h"
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void parse_input(const char *restrict input, int64_t ***locations,
                int64_t **xRow, int64_t **yRow, int32_t *locSz, int32_t *xSz,
                int32_t *ySz) {
   size_t i, j, x, y, maxX, maxY;
   int32_t flag;
   char **parsed = str_splitc(input, '\n', &maxY);
   maxX = strlen(parsed[0]);

   *locSz = 0;
   for (x = 0; x < maxX; x++)
      for (y = 0; y < maxY; y++)
         if (parsed[y][x] == '#')
            (*locSz)++;

   *locations = malloc(*locSz * sizeof(**locations));
   *xRow = malloc(*locSz * sizeof(*xRow));
   *yRow = malloc(*locSz * sizeof(*yRow));

   i = j = 0;
   for (x = 0; x < maxX; x++) {
      flag = 0;
      for (y = 0; y < maxY; y++) {
         if (parsed[y][x] == '#') {
            flag = 1;
            (*locations)[j] = malloc(2 * sizeof(*locations));
            (*locations)[j][0] = x;
            (*locations)[j][1] = y;
            j++;
         }
      }
      if (!flag) {
         (*xRow)[i++] = x;
      }
   }
   *xSz = i;

   i = 0;
   for (y = 0; y < maxY; y++) {
      flag = 0;
      for (x = 0; x < maxX; x++) {
         if (parsed[y][x] == '#') {
            flag = 1;
            break;
         }
      }
      if (!flag) {
         (*yRow)[i++] = y;
      }
      free(parsed[y]);
   }
   free(parsed);
   *ySz = i;
}

static int64_t len_between_locations(const int64_t *restrict row, const int32_t sz,
                            const int64_t x1, const int64_t x2) {
   int64_t count = 0;
   for (int32_t i = 0; i < sz; i++) {
      int64_t x = row[i];
      if ((x1 > x && x > x2) || (x2 > x && x > x1))
         count++;
   }
   return count;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   int32_t locSz, xSz, ySz, m, n;
   int64_t **locations, *xRow, *yRow, *loc1, *loc2, x1, x2, y1, y2, add,
       res = 0;
   parse_input(input, &locations, &xRow, &yRow, &locSz, &xSz, &ySz);

   for (m = 0; m < locSz; m++) {
      loc1 = locations[m];
      x1 = loc1[0];
      y1 = loc1[1];
      for (n = m + 1; n < locSz; n++) {
         loc2 = locations[n];
         x2 = loc2[0];
         y2 = loc2[1];
         add = len_between_locations(xRow, xSz, x1, x2) +
               len_between_locations(yRow, ySz, y1, y2);
         res += llabs(x1 - x2) + llabs(y1 - y2) + add;
      }
      free(locations[m]);
   }
   free(locations);

   free(xRow);
   free(yRow);
   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   int32_t locSz, xSz, ySz, m, n;
   int64_t **locations, *xRow, *yRow, *loc1, *loc2, x1, x2, y1, y2, add,
       res = 0;
   parse_input(input, &locations, &xRow, &yRow, &locSz, &xSz, &ySz);

   for (m = 0; m < locSz; m++) {
      loc1 = locations[m];
      x1 = loc1[0];
      y1 = loc1[1];
      for (n = m + 1; n < locSz; n++) {
         loc2 = locations[n];
         x2 = loc2[0];
         y2 = loc2[1];
         add = len_between_locations(xRow, xSz, x1, x2) +
               len_between_locations(yRow, ySz, y1, y2);
         res += llabs(x1 - x2) + llabs(y1 - y2) + add * 1000000 - add;
      }
      free(locations[m]);
   }
   free(locations);

   free(xRow);
   free(yRow);
   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
return run(argc, argv, part1, part2, options);
}
