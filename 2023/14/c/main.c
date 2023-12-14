#include "main.h"
#include "helper.h"
#include "run.h"
#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const bool HAS_ALTERNATE = false;

char *part1(const char *restrict input) {
  int sz_y, sz_x, x, y, shift, res = 0;
  char **grid = strsplit(input, "\n", &sz_y);
  sz_x = strlen(grid[0]);

  for (x = 0; x < sz_x; x++) {
    shift = -1;
    for (y = 0; y < sz_y; y++) {
      if (grid[y][x] == '#')
        shift = y;
      if (grid[y][x] == 'O') {
        grid[y][x] = '.';
        grid[++shift][x] = 'O';
      }
    }
  }

  for (y = 0; y < sz_y; y++) {
    for (x = 0; x < sz_x; x++)
      if (grid[y][x] == 'O')
        res += sz_y - y;
    free(grid[y]);
  }
  free(grid);

  return numtostr(res);
}

char *joingrid(char **grid, const int sz_x, const int sz_y) {
  int y;
  char *str = malloc((sz_y * sz_x + sz_y) * sizeof(char));
  str[0] = 0;
  for (y = 0; y < sz_y; y++) {
    strcat(str, grid[y]);
    strcat(str, "\n");
  }
  return str;
}

char *bigstuff(char **grid, const int sz_x, const int sz_y) {
  int x, y, shift;
  for (x = 0; x < sz_x; x++) {
    shift = -1;
    for (y = 0; y < sz_y; y++) {
      if (grid[y][x] == '#')
        shift = y;
      if (grid[y][x] == 'O') {
        grid[y][x] = '.';
        grid[++shift][x] = 'O';
      }
    }
  }
  for (y = 0; y < sz_y; y++) {
    shift = -1;
    for (x = 0; x < sz_x; x++) {
      if (grid[y][x] == '#')
        shift = x;
      if (grid[y][x] == 'O') {
        grid[y][x] = '.';
        grid[y][++shift] = 'O';
      }
    }
  }
  for (x = 0; x < sz_x; x++) {
    shift = sz_y;
    for (y = shift - 1; y >= 0; y--) {
      if (grid[y][x] == '#')
        shift = y;
      if (grid[y][x] == 'O') {
        grid[y][x] = '.';
        grid[--shift][x] = 'O';
      }
    }
  }
  for (y = 0; y < sz_y; y++) {
    shift = sz_x;
    for (x = shift - 1; x >= 0; x--) {
      if (grid[y][x] == '#')
        shift = x;
      if (grid[y][x] == 'O') {
        grid[y][x] = '.';
        grid[y][--shift] = 'O';
      }
    }
  }

  return joingrid(grid, sz_x, sz_y);
}

int aryidxof(char **ary, int ary_s, char *search) {
  for (int i = 0; i < ary_s; i++)
    if (!strcmp(ary[i], search))
      return i;
  return -1;
}

char *part2(const char *restrict input) {
  long long MAX_CYCLE = 1000000000, c;
  int sz_y, sz_x, x, y, sz_s = 0, s, res = 0;
  char **set = malloc(1000 * sizeof(char *)), // i really dont want to check or dynamically allocate
       **grid = strsplit(input, "\n", &sz_y);
  sz_x = strlen(grid[0]);

  for (c = 0; c < MAX_CYCLE; c++) {
    char *temp = bigstuff(grid, sz_x, sz_y);
    int loopIdx = aryidxof(set, sz_s, temp);
    if (loopIdx != -1) {
      free(temp);
      temp = set[loopIdx + ((MAX_CYCLE - c - 1) % (sz_s - loopIdx))];

      for (y = 0; y < sz_y; y++)
        free(grid[y]);
      free(grid);

      grid = strsplit(temp, "\n", &sz_y);
      break;
    }
    set[sz_s++] = temp;
  }

  for (s = 0; s < sz_s; s++)
    free(set[s]);
  free(set);

  for (y = 0; y < sz_y; y++) {
    for (x = 0; x < sz_x; x++)
      if (grid[y][x] == 'O')
        res += sz_y - y;
    free(grid[y]);
  }
  free(grid);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
