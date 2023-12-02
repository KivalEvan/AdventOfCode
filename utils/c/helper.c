#include "helper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *strslice(const char *restrict src, char *restrict dest, size_t start,
               size_t end) {
  return strncpy(dest, src + start, end - start);
}

char **strsplitc(char *restrict str, char limiter) {
  char **ary;
  int i = 0, numLine = 0;
  while (str[i])
    if (str[i++] == limiter)
      numLine++;
  ary = malloc((numLine + 1) * sizeof(char *));

  numLine = 0;
  while (str) {
    char *nextLine = strchr(str, limiter);
    int inputLen = nextLine ? (nextLine - str) : strlen(str);
    char *tempStr = (char *)malloc(inputLen + 1);
    if (tempStr) {
      memcpy(tempStr, str, inputLen);
      tempStr[inputLen] = '\0';
      char *toCopy = strcpy((char *)malloc(inputLen + 1), tempStr);
      ary[numLine++] = toCopy;
    }
    str = nextLine ? (nextLine + 1) : NULL;
  }
  ary[numLine] = NULL;

  return ary;
}

char **strsplit(char *restrict str) { return strsplitc(str, '\n'); }

int stridxof(const char *restrict str, char c) {
  int i;
  for (i = 0; i < strlen(str); i++) {
    if (str[i] == c)
      return i;
  }

  return -1;
}
