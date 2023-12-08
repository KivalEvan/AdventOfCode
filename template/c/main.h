#include <stdbool.h>
#include <stdlib.h>
#include <stdio.h>

#define MAX_BUFFER_SIZE 256

#ifndef MAIN_H_
#define MAIN_H_

const bool HAS_ALTERNATE;

char *part1(char *input);
char *part2(char *input);

char* numtostr(long long num) {
  char *str = malloc(MAX_BUFFER_SIZE * sizeof(char));
  sprintf(str, "%lld", num);
  return str;
}

#endif
