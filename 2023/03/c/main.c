#include "main.h"
#include "helper.h"
#include "run.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const bool HAS_ALTERNATE = false;

bool isSymbol(char c) {
  return (c == '*' || c == '$' || c == '=' || c == '#' || c == '%' ||
          c == '/' || c == '&' || c == '+' || c == '-' || c == '@');
}

char *yeetthenumber(char **grid, int x, int y, const int SZ) {
  char *res = (char *)malloc(2);
  res[0] = 0;
  if (isnum(grid[y][x])) {
    res[0] = grid[y][x];
    res[1] = 0;
    grid[y][x] = '.';

    if (x > 0)
      res = strdupcat(yeetthenumber(grid, x - 1, y, SZ), res);
    if (x < SZ - 1)
      res = strdupcat(res, yeetthenumber(grid, x + 1, y, SZ));
  }
  return res;
}

char *part1(char *input) {
  int res = 0;
  char **grid = strsplit(input, '\n');
  const int SZ = strlen(grid[0]);

  for (int y = 0; y < SZ; y++) {
    for (int x = 0; x < SZ; x++) {
      if (isSymbol(grid[y][x])) {
        if (x > 0) {
          if (y < SZ - 1)
            res += atoi(yeetthenumber(grid, x - 1, y + 1, SZ));
          if (y > 0)
            res += atoi(yeetthenumber(grid, x - 1, y - 1, SZ));
          res += atoi(yeetthenumber(grid, x - 1, y, SZ));
        }
        if (x < SZ - 1) {
          if (y < SZ - 1)
            res += atoi(yeetthenumber(grid, x + 1, y + 1, SZ));
          if (y > 0)
            res += atoi(yeetthenumber(grid, x + 1, y - 1, SZ));
          res += atoi(yeetthenumber(grid, x + 1, y, SZ));
        }
        if (y > 0)
          res += atoi(yeetthenumber(grid, x, y - 1, SZ));
        if (y < SZ - 1)
          res += atoi(yeetthenumber(grid, x, y + 1, SZ));
      }
    }
  }

  char *str = malloc(MAX_BUFFER_SIZE);
  sprintf(str, "%d", res);
  return str;
}

void checkandadd(int *ary, int *i, int res) {
  if (res != 0 && *i < 2)
    ary[(*i)++] = res;
}

char *part2(char *input) {
  int res = 0;
  char **grid = strsplit(input, '\n');
  const int SZ = strlen(grid[0]);

  for (int y = 0; y < SZ; y++) {
    for (int x = 0; x < SZ; x++) {
      if (grid[y][x] == '*') {
        int *ary = malloc(2);
        int i = 0;
        if (x > 0) {
          if (y < SZ - 1)
            checkandadd(ary, &i, atoi(yeetthenumber(grid, x - 1, y + 1, SZ)));
          if (y > 0)
            checkandadd(ary, &i, atoi(yeetthenumber(grid, x - 1, y - 1, SZ)));
          checkandadd(ary, &i, atoi(yeetthenumber(grid, x - 1, y, SZ)));
        }
        if (x < SZ - 1) {
          if (y < SZ - 1)
            checkandadd(ary, &i, atoi(yeetthenumber(grid, x + 1, y + 1, SZ)));
          if (y > 0)
            checkandadd(ary, &i, atoi(yeetthenumber(grid, x + 1, y - 1, SZ)));
          checkandadd(ary, &i, atoi(yeetthenumber(grid, x + 1, y, SZ)));
        }
        if (y > 0)
          checkandadd(ary, &i, atoi(yeetthenumber(grid, x, y - 1, SZ)));
        if (y < SZ - 1)
          checkandadd(ary, &i, atoi(yeetthenumber(grid, x, y + 1, SZ)));
        if (i == 2)
          res += ary[0] * ary[1];
      }
    }
  }

  char *str = malloc(MAX_BUFFER_SIZE);
  sprintf(str, "%d", res);
  return str;
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
