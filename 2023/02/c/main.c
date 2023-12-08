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
  int sz, sz_2, sz_3, res = 0;
  char **splitted = strsplit(input, "\n", &sz);

  int i = 0;
  while (i < sz) {
    char *splt = splitted[i];
    char *sliced = malloc(strlen(splt) * sizeof(char));
    // something weird with slice ill fix later
    strslice(splt, sliced, stridxof(splt, ':') + 1, strlen(splt));
    char *real =
        malloc((strlen(splt) - stridxof(splt, ':')) * sizeof(char));
    strncpy(real, sliced, strlen(splt) - stridxof(splt, ':') - 1);

    char **sequences = strsplit(real, ";", &sz_2);
    bool valid = true;
    int j = 0;
    while (j < sz_2) {
      char *seq = sequences[j];
      char **triples = strsplit(seq, ",", &sz_3);
      int k = 0;
      while (k < sz_3) {
        char *val = triples[k];
        char *num = malloc(5 * sizeof(char));
        char *type = malloc(6 * sizeof(char));
        int idx = 0;
        int l = 0;
        int n = 0;
        while (val[l]) {
          if (isdigit(val[l])) {
            num[idx++] = val[l];
          } else if (idx != 0) {
            break;
          }
          l++;
        }
        l++;
        num[idx] = 0;
        n = atoi(num);
        idx = 0;
        while (val[l]) {
          type[idx++] = val[l];
          l++;
        }
        type[idx] = 0;
        if (!strncmp(type, "red", 3) && n > 12)
          valid = false;
        if (!strncmp(type, "green", 5) && n > 13)
          valid = false;
        if (!strncmp(type, "blue", 4) && n > 14)
          valid = false;
        free(num);
        free(type);
        free(triples[k]);
        k++;
      }
      free(triples);
      free(sequences[j]);
      j++;
    }
    if (valid)
      res += i + 1;
    free(sequences);
    free(splitted[i]);
    i++;
  }
  free(splitted);

  return numtostr(res);
}

char *part2(char *input) {
  int sz, sz_2, sz_3, idx, res = 0;
  char **splitted = strsplit(input, "\n", &sz);

  int i = 0;
  while (i < sz) {
    char *splt = splitted[i];
    char *sliced = malloc(strlen(splt) * sizeof(char));
    // something weird with slice ill fix later
    strslice(splt, sliced, stridxof(splt, ':') + 1, strlen(splt));
    char *real =
        malloc((strlen(splt) - stridxof(splt, ':')) * sizeof(char));
    strncpy(real, sliced, strlen(splt) - stridxof(splt, ':') - 1);

    char **sequences = strsplit(real, ";", &sz_2);
    bool valid = true;
    int j = 0;
    int red = 0;
    int green = 0;
    int blue = 0;
    while (j < sz_2) {
      char *seq = sequences[j];
      char **triples = strsplit(seq, ",", &sz_3);
      int k = 0;
      while (k < sz_3) {
        char *val = triples[k];
        char *num = malloc(5 * sizeof(char));
        char *type = malloc(6 * sizeof(char));
        int idx = 0;
        int l = 0;
        int n = 0;
        while (val[l]) {
          if (isdigit(val[l])) {
            num[idx++] = val[l];
          } else if (idx != 0) {
            break;
          }
          l++;
        }
        l++;
        num[idx] = 0;
        n = atoi(num);
        idx = 0;
        while (val[l]) {
          type[idx++] = val[l];
          l++;
        }
        type[idx] = 0;
        if (!strncmp(type, "red", 3) && n > red)
          red = n;
        if (!strncmp(type, "green", 5) && n > green)
          green = n;
        if (!strncmp(type, "blue", 4) && n > blue)
          blue = n;
        free(num);
        free(type);
        free(triples[k]);
        k++;
      }
      free(triples);
      free(sequences[j]);
      j++;
    }
    res += red * green * blue;
    free(sequences);
    i++;
  }
  for (idx = 0; idx < sz; idx++)
    free(splitted[idx]);
  free(splitted);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
