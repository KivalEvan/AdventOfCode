#include "helper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *strslice(const char *restrict src, char *restrict dest, size_t start,
               size_t end) {
  return strncpy(dest, src + start, end - start);
}

char **strsplit(char *input) {
  char **ary;
  int i = 0, numLine = 0;
  while (input[i])
    if (input[i++] == '\n')
      numLine++;
  ary = malloc((numLine + 1) * sizeof(char *));

  numLine = 0;
  while (input) {
    char *nextLine = strchr(input, '\n');
    int inputLen = nextLine ? (nextLine - input) : strlen(input);
    char *tempStr = (char *)malloc(inputLen + 1);
    if (tempStr) {
      memcpy(tempStr, input, inputLen);
      tempStr[inputLen] = '\0';
      char *toCopy = strcpy((char *)malloc(inputLen + 1), tempStr);
      ary[numLine++] = toCopy;
      free(tempStr);
    }
    input = nextLine ? (nextLine + 1) : NULL;
  }
  ary[numLine] = NULL;

  return ary;
}
