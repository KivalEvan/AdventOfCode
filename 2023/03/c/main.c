#include <ctype.h>
#include <helper.h>
#include <main.h>
#include <math.h>
#include <run.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int HAS_ALTERNATE = 0;

int isSymbol(char c) {
   return (c == '*' || c == '$' || c == '=' || c == '#' || c == '%' ||
           c == '/' || c == '&' || c == '+' || c == '-' || c == '@');
}

char *yeetthenumber(char **restrict grid, const int x, const int y,
                    const int sz) {
   char *res = malloc(2 * sizeof(char));
   res[0] = 0;
   if (isdigit(grid[y][x])) {
      res[0] = grid[y][x];
      res[1] = 0;
      grid[y][x] = '.';

      if (x > 0)
         res = strdupcat(yeetthenumber(grid, x - 1, y, sz), res);
      if (x < sz - 1)
         res = strdupcat(res, yeetthenumber(grid, x + 1, y, sz));
   }
   return res;
}

char *part1(const char *restrict input) {
   int sz, res = 0;
   char **grid = strsplit(input, "\n", &sz);

   for (int y = 0; y < sz; y++) {
      for (int x = 0; x < sz; x++) {
         if (isSymbol(grid[y][x])) {
            if (x > 0) {
               if (y < sz - 1)
                  res += atoi(yeetthenumber(grid, x - 1, y + 1, sz));
               if (y > 0)
                  res += atoi(yeetthenumber(grid, x - 1, y - 1, sz));
               res += atoi(yeetthenumber(grid, x - 1, y, sz));
            }
            if (x < sz - 1) {
               if (y < sz - 1)
                  res += atoi(yeetthenumber(grid, x + 1, y + 1, sz));
               if (y > 0)
                  res += atoi(yeetthenumber(grid, x + 1, y - 1, sz));
               res += atoi(yeetthenumber(grid, x + 1, y, sz));
            }
            if (y > 0)
               res += atoi(yeetthenumber(grid, x, y - 1, sz));
            if (y < sz - 1)
               res += atoi(yeetthenumber(grid, x, y + 1, sz));
         }
      }
   }
   for (int i = 0; i < sz; i++)
      free(grid[i]);
   free(grid);

   return numtostr(res);
}

void checkandadd(int *ary, int *i, int res) {
   if (res != 0 && *i < 2)
      ary[(*i)++] = res;
}

char *part2(const char *restrict input) {
   int sz, res = 0;
   char **grid = strsplit(input, "\n", &sz);

   for (int y = 0; y < sz; y++) {
      for (int x = 0; x < sz; x++) {
         if (grid[y][x] == '*') {
            int *ary = malloc(2 * sizeof(int));
            int i = 0;
            if (x > 0) {
               if (y < sz - 1)
                  checkandadd(ary, &i,
                              atoi(yeetthenumber(grid, x - 1, y + 1, sz)));
               if (y > 0)
                  checkandadd(ary, &i,
                              atoi(yeetthenumber(grid, x - 1, y - 1, sz)));
               checkandadd(ary, &i, atoi(yeetthenumber(grid, x - 1, y, sz)));
            }
            if (x < sz - 1) {
               if (y < sz - 1)
                  checkandadd(ary, &i,
                              atoi(yeetthenumber(grid, x + 1, y + 1, sz)));
               if (y > 0)
                  checkandadd(ary, &i,
                              atoi(yeetthenumber(grid, x + 1, y - 1, sz)));
               checkandadd(ary, &i, atoi(yeetthenumber(grid, x + 1, y, sz)));
            }
            if (y > 0)
               checkandadd(ary, &i, atoi(yeetthenumber(grid, x, y - 1, sz)));
            if (y < sz - 1)
               checkandadd(ary, &i, atoi(yeetthenumber(grid, x, y + 1, sz)));
            if (i == 2)
               res += ary[0] * ary[1];
         }
      }
   }
   for (int i = 0; i < sz; i++)
      free(grid[i]);
   free(grid);

   return numtostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
