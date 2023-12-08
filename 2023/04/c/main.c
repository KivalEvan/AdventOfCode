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

char *part1(char *input) {
  int sz, i = 0, j = 0;
  char **splitted = strsplit(input, "\n", &sz);
  int res = 0;

  char *splt, **scratches, **win_c, **owned_c;
  while (i < sz) {
    splt = splitted[i];

    int sz_s, sz_r, sz_l;
    scratches = strsplit(splt, "|", &sz_s);
    win_c = strsplit(scratches[0], " ", &sz_l);
    owned_c = strsplit(scratches[1], " ", &sz_r);
    free(scratches[0]);
    free(scratches[1]);
    free(scratches);

    int win_sz = 0;
    for (int idx = 2; idx < sz_l; idx++) {
      if (strlen(win_c[idx]))
        win_sz++;
    }
    int *win = malloc(win_sz * sizeof(int));
    for (int idx = 0, addTo = 0; idx < sz_l; idx++) {
      if (idx > 1 && strlen(win_c[idx]))
        win[addTo++] = atoi(win_c[idx]);
      free(win_c[idx]);
    }
    free(win_c);

    int owned_sz = 0;
    for (int idx = 0; idx < sz_r; idx++) {
      if (strlen(owned_c[idx]))
        owned_sz++;
    }
    int *owned = malloc(owned_sz * sizeof(int));
    for (int idx = 0, addTo = 0; idx < sz_r; idx++) {
      if (strlen(owned_c[idx]))
        owned[addTo++] = atoi(owned_c[idx]);
      free(owned_c[idx]);
    }
    free(owned_c);

    int factor = -1;
    for (int x = 0; x < win_sz; x++) {
      for (int y = 0; y < owned_sz; y++) {
        if (owned[y] == win[x])
          factor++;
      }
    }
    free(win);
    free(owned);

    res += factor != -1 ? pow(2, factor) : 0;
    free(splitted[i]);
    i++;
  }
  free(splitted);

  return numtostr(res);
}

char *part2(char *input) {
  int sz, i = 0, j = 0;
  char **splitted = strsplit(input, "\n", &sz);
  int *instances = malloc(sz * sizeof(int));
  for (i = 0; i < sz; i++)
    instances[i] = 1;
  int res = 0;

  char *splt, **scratches, **win_c, **owned_c;
  i = 0;
  while (i < sz) {
    splt = splitted[i];

    int sz_s, sz_r, sz_l;
    scratches = strsplit(splt, "|", &sz_s);
    win_c = strsplit(scratches[0], " ", &sz_l);
    owned_c = strsplit(scratches[1], " ", &sz_r);
    free(scratches[0]);
    free(scratches[1]);
    free(scratches);

    int win_sz = 0;
    for (int idx = 2; idx < sz_l; idx++) {
      if (strlen(win_c[idx]))
        win_sz++;
    }
    int *win = malloc(win_sz * sizeof(int));
    for (int idx = 0, addTo = 0; idx < sz_l; idx++) {
      if (idx > 1 && strlen(win_c[idx]))
        win[addTo++] = atoi(win_c[idx]);
      free(win_c[idx]);
    }
    free(win_c);

    int owned_sz = 0;
    for (int idx = 0; idx < sz_r; idx++) {
      if (strlen(owned_c[idx]))
        owned_sz++;
    }
    int *owned = malloc(owned_sz * sizeof(int));
    for (int idx = 0, addTo = 0; idx < sz_r; idx++) {
      if (strlen(owned_c[idx]))
        owned[addTo++] = atoi(owned_c[idx]);
      free(owned_c[idx]);
    }
    free(owned_c);

    int won = 0;
    for (int x = 0; x < win_sz; x++) {
      for (int y = 0; y < owned_sz; y++) {
        if (owned[y] == win[x])
          won++;
      }
    }
    while (won) {
      instances[i + won] += instances[i];
      won--;
    }
    free(win);
    free(owned);
    free(splitted[i]);
    i++;
  }
  free(splitted);

  for (i = 0; i < sz; i++)
    res += instances[i];
  free(instances);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
