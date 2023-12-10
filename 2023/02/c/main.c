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
  int sz, sz_2, sz_3, res = 0;
  char **splitted = strsplit(input, "\n", &sz);

  int i, j;
  for (i = 0; i < sz; i++) {
    char *splt = splitted[i];
    char **temp = strsplit(splt, ":", &sz_2);

    char **sequences = strsplit(temp[1], ";,", &sz_2);
    bool valid = true;
    for (j = 0; j < sz_2; j++) {
      char **val = strsplit(sequences[j], " ", &sz_3);
      char *num = val[0];
      char *type = val[1];

      int n = atoi(num);
      if (!strncmp(type, "red", 3) && n > 12)
        valid = false;
      if (!strncmp(type, "green", 5) && n > 13)
        valid = false;
      if (!strncmp(type, "blue", 4) && n > 14)
        valid = false;

      free(num);
      free(type);
      free(val);
      free(sequences[j]);
    }
    if (valid)
      res += i + 1;

    free(sequences);
    free(temp[0]);
    free(temp[1]);
    free(temp);
    free(splitted[i]);
  }
  free(splitted);

  return numtostr(res);
}

char *part2(const char *restrict input) {
  int sz, sz_2, sz_3, res = 0;
  char **splitted = strsplit(input, "\n", &sz);

  int i, j;
  for (i = 0; i < sz; i++) {
    char *splt = splitted[i];
    char **temp = strsplit(splt, ":", &sz_2);

    char **sequences = strsplit(temp[1], ";,", &sz_2);
    int red, green, blue;
    red = green = blue = 0;
    for (j = 0; j < sz_2; j++) {
      char **val = strsplit(sequences[j], " ", &sz_3);
      char *num = val[0];
      char *type = val[1];

      int n = atoi(num);
      if (!strncmp(type, "red", 3) && n > red)
        red = n;
      if (!strncmp(type, "green", 5) && n > green)
        green = n;
      if (!strncmp(type, "blue", 4) && n > blue)
        blue = n;

      free(num);
      free(type);
      free(val);
      free(sequences[j]);
    }
    res += red * green * blue;

    free(sequences);
    free(temp[0]);
    free(temp[1]);
    free(temp);
    free(splitted[i]);
  }
  free(splitted);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
