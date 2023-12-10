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

long long **parseInput(const char *restrict input, int *sz, int **restrict p_size, const bool reverse) {
  int sz_c, i, j;
  char **splt = strsplit(input, "\n", sz);
  long long **ary = malloc(*sz * sizeof(long long *));
  *p_size = malloc(*sz * sizeof(int*));

  for (i = 0; i < *sz; i++) {
    char **chunks = strsplit(splt[i], " ", &sz_c);
    long long *ary_ll = malloc(sz_c * sizeof(long long));
    for (j = 0; j < sz_c; j++) {
      if (reverse)
        ary_ll[sz_c - 1 - j] = atoll(chunks[j]);
      else
        ary_ll[j] = atoll(chunks[j]);
      free(chunks[j]);
    }
    ary[i] = ary_ll;
    (*p_size)[i] = sz_c;
    free(chunks);
    free(splt[i]);
  }
  free(splt);

  return ary;
}

long long *difference(long long *restrict ary, int sz) {
  for (int i = 0; i < sz; i++)
    ary[i] = ary[i + 1] - ary[i];
  return ary;
}

long long extrapolate(long long *restrict ary, int sz) {
  sz--;
  long long last = ary[sz];
  if (!sz) return last;
  return extrapolate(difference(ary, sz), sz) + last;
}

char *part1(const char *restrict input) {
  int sz, i, *p_size;
  long long **parsed = parseInput(input, &sz, &p_size, false), res = 0;

  for (i = 0; i < sz; i++) {
    res += extrapolate(parsed[i], p_size[i]);
    free(parsed[i]);
  }
  free(parsed);
  free(p_size);

  return numtostr(res);
}

char *part2(const char *restrict input) {
  int sz, i, *p_size;
  long long **parsed = parseInput(input, &sz, &p_size, true), res = 0;

  for (i = 0; i < sz; i++) {
    res += extrapolate(parsed[i], p_size[i]);
    free(parsed[i]);
  }
  free(parsed);
  free(p_size);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
