#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_IO = 0;
static const int32_t HAS_ALTERNATE = 0;

static size_t issymbol(char c) {
   return (c == '*' || c == '$' || c == '=' || c == '#' || c == '%' ||
           c == '/' || c == '&' || c == '+' || c == '-' || c == '@');
}

static char *yeetthenumber(char **restrict grid, const size_t x, const size_t y,
                           const size_t sz) {
   char *tmp, *add, *res;

   res = malloc(2 * sizeof(*res));
   res[0] = 0;
   if (isdigit(grid[y][x])) {
      res[0] = grid[y][x];
      res[1] = 0;
      grid[y][x] = '.';

      if (x > 0) {
         tmp = yeetthenumber(grid, x - 1, y, sz);
         add = malloc((strlen(res) + strlen(tmp) + 1) * sizeof(*add));
         add[0] = 0;

         strcat(add, tmp);
         strcat(add, res);
         free(tmp);
         free(res);

         res = add;
      }
      if (x < sz - 1) {
         tmp = yeetthenumber(grid, x + 1, y, sz);
         add = malloc((strlen(res) + strlen(tmp) + 1) * sizeof(*add));
         add[0] = 0;

         strcat(add, res);
         strcat(add, tmp);
         free(tmp);
         free(res);

         res = add;
      }
   }
   return res;
}

static int32_t atolandfree(char *str) {
   int32_t res = atol(str);
   free(str);
   return res;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t sz, y, x;
   int64_t res = 0;
   char **grid = str_splitc(input, '\n', &sz);

   for (y = 0; y < sz; y++) {
      for (x = 0; x < sz; x++) {
         if (issymbol(grid[y][x])) {
            if (x > 0) {
               if (y < sz - 1)
                  res += atolandfree(yeetthenumber(grid, x - 1, y + 1, sz));
               if (y > 0)
                  res += atolandfree(yeetthenumber(grid, x - 1, y - 1, sz));
               res += atolandfree(yeetthenumber(grid, x - 1, y, sz));
            }
            if (x < sz - 1) {
               if (y < sz - 1)
                  res += atolandfree(yeetthenumber(grid, x + 1, y + 1, sz));
               if (y > 0)
                  res += atolandfree(yeetthenumber(grid, x + 1, y - 1, sz));
               res += atolandfree(yeetthenumber(grid, x + 1, y, sz));
            }
            if (y > 0)
               res += atolandfree(yeetthenumber(grid, x, y - 1, sz));
            if (y < sz - 1)
               res += atolandfree(yeetthenumber(grid, x, y + 1, sz));
         }
      }
   }
   for (size_t i = 0; i < sz; i++)
      free(grid[i]);
   free(grid);

   return num_tostr(res);
}

static void checkandadd(int32_t *ary, size_t *i, size_t res) {
   if (res != 0 && *i < 2)
      ary[(*i)++] = res;
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t sz, y, x, i;
   int32_t *ary, res = 0;
   char **grid = str_splitc(input, '\n', &sz);

   for (y = 0; y < sz; y++) {
      for (x = 0; x < sz; x++) {
         if (grid[y][x] == '*') {
            ary = malloc(2 * sizeof(*ary));
            i = 0;
            if (x > 0) {
               if (y < sz - 1)
                  checkandadd(
                      ary, &i,
                      atolandfree(yeetthenumber(grid, x - 1, y + 1, sz)));
               if (y > 0)
                  checkandadd(
                      ary, &i,
                      atolandfree(yeetthenumber(grid, x - 1, y - 1, sz)));
               checkandadd(ary, &i,
                           atolandfree(yeetthenumber(grid, x - 1, y, sz)));
            }
            if (x < sz - 1) {
               if (y < sz - 1)
                  checkandadd(
                      ary, &i,
                      atolandfree(yeetthenumber(grid, x + 1, y + 1, sz)));
               if (y > 0)
                  checkandadd(
                      ary, &i,
                      atolandfree(yeetthenumber(grid, x + 1, y - 1, sz)));
               checkandadd(ary, &i,
                           atolandfree(yeetthenumber(grid, x + 1, y, sz)));
            }
            if (y > 0)
               checkandadd(ary, &i,
                           atolandfree(yeetthenumber(grid, x, y - 1, sz)));
            if (y < sz - 1)
               checkandadd(ary, &i,
                           atolandfree(yeetthenumber(grid, x, y + 1, sz)));
            if (i == 2)
               res += ary[0] * ary[1];
            free(ary);
         }
      }
   }
   for (i = 0; i < sz; i++)
      free(grid[i]);
   free(grid);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE, HAS_IO);
}
