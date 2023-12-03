#include "main.h"
#include "helper.h"
#include "run.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const bool HAS_ALTERNATE = false;

char *part1(char *input) {
  int result = 0;
  char **splitted = strsplit(input, '\n');

  int i = 0;
  while (splitted[i] != NULL) {
    char *splt = splitted[i];
    char *sliced = (char *)malloc(strlen(splt));
    // something weird with slice ill fix later
    strslice(splt, sliced, stridxof(splt, ':') + 1, strlen(splt));
    char *real = (char *)malloc(strlen(splt) - stridxof(splt, ':'));
    strncpy(real, sliced, strlen(splt) - stridxof(splt, ':') - 1);

    char **sequence = strsplit(real, ';');
    bool valid = true;
    int j = 0;
    while (sequence[j] != NULL) {
      char *seq = sequence[j];
      char **triples = strsplit(seq, ',');
      int k = 0;
      while (triples[k] != NULL) {
        char *val = triples[k];
        char *num = (char *)malloc(5);
        char *type = (char *)malloc(6);
        int idx = 0;
        int l = 0;
        int n = 0;
        while (val[l]) {
          if (isnum(val[l])) {
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
        k++;
        free(num);
        free(type);
      }
      j++;
    }
    if (valid)
      result += i + 1;
    i++;
  }

  char *str = malloc(MAX_BUFFER_SIZE);
  sprintf(str, "%d", result);
  return str;
}

char *part2(char *input) {
  int result = 0;
  char **splitted = strsplit(input, '\n');

  int i = 0;
  while (splitted[i] != NULL) {
    char *splt = splitted[i];
    char *sliced = (char *)malloc(strlen(splt));
    // something weird with slice ill fix later
    strslice(splt, sliced, stridxof(splt, ':') + 1, strlen(splt));
    char *real = (char *)malloc(strlen(splt) - stridxof(splt, ':'));
    strncpy(real, sliced, strlen(splt) - stridxof(splt, ':') - 1);

    char **sequence = strsplit(real, ';');
    bool valid = true;
    int j = 0;
    int red = 0;
    int green = 0;
    int blue = 0;
    while (sequence[j] != NULL) {
      char *seq = sequence[j];
      char **triples = strsplit(seq, ',');
      int k = 0;
      while (triples[k] != NULL) {
        char *val = triples[k];
        char *num = (char *)malloc(5);
        char *type = (char *)malloc(6);
        int idx = 0;
        int l = 0;
        int n = 0;
        while (val[l]) {
          if (isnum(val[l])) {
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
        k++;
        free(num);
        free(type);
      }
      j++;
    }
    result += red * green * blue;
    i++;
  }

  char *str = malloc(MAX_BUFFER_SIZE);
  sprintf(str, "%d", result);
  return str;
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
