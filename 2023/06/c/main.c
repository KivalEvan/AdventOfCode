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

int ohnomath(const long b, const long c) {
  double min = floor((-b - sqrt(b * b - 4 * c)) / -2 - 0.001);
  double max = ceil((-b + sqrt(b * b - 4 * c)) / -2 + 0.001);
  return (int)(min - max + 1);
}

int *getNum(const char *restrict str, int *count) {
  int *ary;
  char **chonk = strsplit(str, " ", count);

  ary = malloc(*count * sizeof(int));
  for (int i = 0; i < *count; i++) {
    ary[i] = atoi(chonk[i]);
    free(chonk[i]);
  }
  free(chonk);

  return ary;
}

long getNumJoin(const char *restrict str) {
  int count;
  long res = 0;
  char **chonk = strsplit(str, " ", &count);

  for (int i = 0; i < count; i++) {
    if (i)
      res *= pow(10, (long)strlen(chonk[i]));
    res += atol(chonk[i]);
    free(chonk[i]);
  }
  free(chonk);

  return res;
}

char *part1(const char *restrict input) {
  int sz, c_sz, t_sz, d_sz, i;
  char **chunk;
  char **splitted = strsplit(input, "\n", &sz);

  chunk = strsplit(splitted[0], ":", &c_sz);
  int *times = getNum(chunk[1], &t_sz);
  free(chunk[0]);
  free(chunk[1]);
  free(chunk);

  chunk = strsplit(splitted[1], ":", &c_sz);
  int *distances = getNum(chunk[1], &d_sz);
  free(chunk[0]);
  free(chunk[1]);
  free(chunk);

  free(splitted[0]);
  free(splitted[1]);
  free(splitted);

  int res = 1;
  for (int i = 0; i < t_sz; i++)
    res *= ohnomath(times[i], distances[i]);

  free(times);
  free(distances);

  return numtostr(res);
}

char *part2(const char *restrict input) {
  int sz, c_sz, t_sz, d_sz, i;
  char **chunk;
  char **splitted = strsplit(input, "\n", &sz);

  chunk = strsplit(splitted[0], ":", &c_sz);
  long time = getNumJoin(chunk[1]);
  free(chunk[0]);
  free(chunk[1]);
  free(chunk);

  chunk = strsplit(splitted[1], ":", &c_sz);
  long distance = getNumJoin(chunk[1]);
  free(chunk[0]);
  free(chunk[1]);
  free(chunk);

  free(splitted[0]);
  free(splitted[1]);
  free(splitted);

  return numtostr(ohnomath(time, distance));
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
