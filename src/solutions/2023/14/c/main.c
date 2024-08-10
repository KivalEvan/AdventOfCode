#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t ySz, xSz, x, y, shift, res = 0;
   char **grid;

   grid = str_splitc(input, '\n', &ySz);
   xSz = strlen(grid[0]);

   for (x = 0; x < xSz; x++) {
      shift = -1;
      for (y = 0; y < ySz; y++) {
         if (grid[y][x] == '#')
            shift = y;
         if (grid[y][x] == 'O') {
            grid[y][x] = '.';
            grid[++shift][x] = 'O';
         }
      }
   }

   for (y = 0; y < ySz; y++) {
      for (x = 0; x < xSz; x++)
         if (grid[y][x] == 'O')
            res += ySz - y;
      free(grid[y]);
   }
   free(grid);

   return num_tostr(res);
}

static char *joingrid(char **grid, const size_t xSz, const size_t ySz) {
   size_t y;
   char *str;

   str = malloc((ySz * xSz + ySz) * sizeof(*str));
   str[0] = 0;
   for (y = 0; y < ySz; y++) {
      strcat(str, grid[y]);
      strcat(str, "\n");
   }
   return str;
}

static char *bigstuff(char **grid, const size_t xSz, const size_t ySz) {
   size_t x, y, shift;
   for (x = 0; x < xSz; x++) {
      shift = -1;
      for (y = 0; y < ySz; y++) {
         if (grid[y][x] == '#')
            shift = y;
         if (grid[y][x] == 'O') {
            grid[y][x] = '.';
            grid[++shift][x] = 'O';
         }
      }
   }
   for (y = 0; y < ySz; y++) {
      shift = -1;
      for (x = 0; x < xSz; x++) {
         if (grid[y][x] == '#')
            shift = x;
         if (grid[y][x] == 'O') {
            grid[y][x] = '.';
            grid[y][++shift] = 'O';
         }
      }
   }
   for (x = 0; x < xSz; x++) {
      shift = ySz;
      for (y = shift - 1; y >= 0; y--) {
         if (grid[y][x] == '#')
            shift = y;
         if (grid[y][x] == 'O') {
            grid[y][x] = '.';
            grid[--shift][x] = 'O';
         }
      }
   }
   for (y = 0; y < ySz; y++) {
      shift = xSz;
      for (x = shift - 1; x >= 0; x--) {
         if (grid[y][x] == '#')
            shift = x;
         if (grid[y][x] == 'O') {
            grid[y][x] = '.';
            grid[y][--shift] = 'O';
         }
      }
   }

   return joingrid(grid, xSz, ySz);
}

static int64_t aryidxof(char **ary, size_t arySz, char *search) {
   for (size_t i = 0; i < arySz; i++)
      if (!strcmp(ary[i], search))
         return i;
   return -1;
}

static char *part2(const char *restrict input, const int32_t isTest) {
   int64_t MAX_CYCLE = 1000000000, c;
   size_t ySz, xSz, x, y, sSz = 0, s, res = 0;
   char **set = malloc(1000 * sizeof(char *)), // i really dont want to check
                                               // or dynamically allocate
       **grid = str_splitc(input, '\n', &ySz);

   xSz = strlen(grid[0]);

   for (c = 0; c < MAX_CYCLE; c++) {
      char *temp = bigstuff(grid, xSz, ySz);
      int64_t loopIdx = aryidxof(set, sSz, temp);
      if (loopIdx != -1) {
         free(temp);
         temp = set[loopIdx + ((MAX_CYCLE - c - 1) % (sSz - loopIdx))];

         for (y = 0; y < ySz; y++)
            free(grid[y]);
         free(grid);

         grid = str_splitc(temp, '\n', &ySz);
         break;
      }
      set[sSz++] = temp;
   }

   for (s = 0; s < sSz; s++)
      free(set[s]);
   free(set);

   for (y = 0; y < ySz; y++) {
      for (x = 0; x < xSz; x++)
         if (grid[y][x] == 'O')
            res += ySz - y;
      free(grid[y]);
   }
   free(grid);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
   return run(argc, argv, part1, part2, options);
}
