#include "run.h"
#include "split.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *slice(const char *restrict src, char *restrict dest, size_t start,
            size_t end) {
  return strncpy(dest, src + start, end - start);
}

bool isnum(char k) {
  return k == '0' || k == '1' || k == '2' || k == '3' || k == '4' || k == '5' ||
         k == '6' || k == '7' || k == '8' || k == '9';
}

char getnum(char *str) {
  if (strncmp(str, "zero", 4) == 0)
    return '0';
  if (strncmp(str, "one", 3) == 0)
    return '1';
  if (strncmp(str, "two", 3) == 0)
    return '2';
  if (strncmp(str, "three", 5) == 0)
    return '3';
  if (strncmp(str, "four", 4) == 0)
    return '4';
  if (strncmp(str, "five", 4) == 0)
    return '5';
  if (strncmp(str, "six", 3) == 0)
    return '6';
  if (strncmp(str, "seven", 5) == 0)
    return '7';
  if (strncmp(str, "eight", 5) == 0)
    return '8';
  if (strncmp(str, "nine", 4) == 0)
    return '9';
  return '\0';
}

void *part1(char *input) {
  long long *result = malloc(sizeof(long long));
  *result = 0;

  char **splitted = strsplit(input);
  int line = 0;
  while (strcmp(splitted[line], "")) {
    char *s = splitted[line];
    char str[2];

    for (int i = 0; i < strlen(s); i++) {
      if (isnum(s[i])) {
        str[0] = s[i];
        break;
      }
    }
    for (int i = strlen(s) - 1; i >= 0; i--) {
      if (isnum(s[i])) {
        str[1] = s[i];
        break;
      }
    }

    *result += atoll(str);
    line++;
  }

  return result;
}

void *part2(char *input) {
  long long *result = malloc(sizeof(long long));
  *result = 0;

  char **splitted = strsplit(input);
  int line = 0;
  while (strcmp(splitted[line], "")) {
    char *s = splitted[line];
    char str[2];

    for (int i = 0; i < strlen(s); i++) {
      if (isnum(s[i])) {
        str[0] = s[i];
        break;
      }
      char c = getnum(slice(s, (char *)malloc(5), i, i + 5));
      if (c != '\0') {
        str[0] = c;
        break;
      }
    }
    for (int i, len = i = strlen(s) - 1; i >= 0; i--) {
      if (isnum(s[i])) {
        str[1] = s[i];
        break;
      }
      char c = getnum(slice(s, (char *)malloc(5), i, i + 5));
      if (c != '\0') {
        str[1] = c;
        break;
      }
    }

    *result += atoll(str);
    line++;
  }

  return result;
}

int main(int argc, char *argv[]) { return run(argc, argv, part1, part2, true); }