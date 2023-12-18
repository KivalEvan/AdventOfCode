#include <ctype.h>
#include <helper.h>
#include <main.h>
#include <math.h>
#include <run.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int HAS_ALTERNATE = 0;

void parseInput(const char *restrict input, long long ***locations,
                long long **xRow, long long **yRow, int *l_sz, int *x_sz,
                int *y_sz) {
   int i, j, x, y, max_x, max_y;
   int flag;
   char **parsed = strsplit(input, "\n", &max_y);
   max_x = strlen(parsed[0]);

   *l_sz = 0;
   for (x = 0; x < max_x; x++)
      for (y = 0; y < max_y; y++)
         if (parsed[y][x] == '#')
            (*l_sz)++;

   *locations = malloc(*l_sz * sizeof(long long **));
   *xRow = malloc(*l_sz * sizeof(long long *));
   *yRow = malloc(*l_sz * sizeof(long long *));

   i = j = 0;
   for (x = 0; x < max_x; x++) {
      flag = false;
      for (y = 0; y < max_y; y++) {
         if (parsed[y][x] == '#') {
            flag = true;
            (*locations)[j] = malloc(2 * sizeof(long long));
            (*locations)[j][0] = x;
            (*locations)[j][1] = y;
            j++;
         }
      }
      if (!flag) {
         (*xRow)[i++] = x;
      }
   }
   *x_sz = i;

   i = 0;
   for (y = 0; y < max_y; y++) {
      flag = false;
      for (x = 0; x < max_x; x++) {
         if (parsed[y][x] == '#') {
            flag = true;
            break;
         }
      }
      if (!flag) {
         (*yRow)[i++] = y;
      }
      free(parsed[y]);
   }
   free(parsed);
   *y_sz = i;
}

long long lenBetweenLocations(const long long *restrict row, const int sz,
                              const long long x1, const long long x2) {
   long long count = 0;
   for (int i = 0; i < sz; i++) {
      long long x = row[i];
      if ((x1 > x && x > x2) || (x2 > x && x > x1))
         count++;
   }
   return count;
}

char *part1(const char *restrict input) {
   int l_sz, x_sz, y_sz, m, n;
   long long **locations, *xRow, *yRow, *loc1, *loc2, x1, x2, y1, y2, add,
       res = 0;
   parseInput(input, &locations, &xRow, &yRow, &l_sz, &x_sz, &y_sz);

   for (m = 0; m < l_sz; m++) {
      loc1 = locations[m];
      x1 = loc1[0];
      y1 = loc1[1];
      for (n = m + 1; n < l_sz; n++) {
         loc2 = locations[n];
         x2 = loc2[0];
         y2 = loc2[1];
         add = lenBetweenLocations(xRow, x_sz, x1, x2) +
               lenBetweenLocations(yRow, y_sz, y1, y2);
         res += llabs(x1 - x2) + llabs(y1 - y2) + add;
      }
      free(locations[m]);
   }
   free(locations);

   free(xRow);
   free(yRow);
   return numtostr(res);
}

char *part2(const char *restrict input) {
   int l_sz, x_sz, y_sz, m, n;
   long long **locations, *xRow, *yRow, *loc1, *loc2, x1, x2, y1, y2, add,
       res = 0;
   parseInput(input, &locations, &xRow, &yRow, &l_sz, &x_sz, &y_sz);

   for (m = 0; m < l_sz; m++) {
      loc1 = locations[m];
      x1 = loc1[0];
      y1 = loc1[1];
      for (n = m + 1; n < l_sz; n++) {
         loc2 = locations[n];
         x2 = loc2[0];
         y2 = loc2[1];
         add = lenBetweenLocations(xRow, x_sz, x1, x2) +
               lenBetweenLocations(yRow, y_sz, y1, y2);
         res += llabs(x1 - x2) + llabs(y1 - y2) + add * 1000000 - add;
      }
      free(locations[m]);
   }
   free(locations);

   free(xRow);
   free(yRow);
   return numtostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
