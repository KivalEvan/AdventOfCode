#include "helper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool isnum(char k) {
  return k == '0' || k == '1' || k == '2' || k == '3' || k == '4' || k == '5' ||
         k == '6' || k == '7' || k == '8' || k == '9';
}

char *strreplacec(char *restrict str, char replace, char with) {
  int i;
  for (i = 0; i < strlen(str); i++) {
    if (str[i] == replace)
      str[i] = with;
  }
  return str;
}

char *strslice(const char *restrict src, char *restrict dest, size_t start,
               size_t end) {
  return strncpy(dest, src + start, end - start);
}

char **strsplit(const char *restrict str, char separator) {
  char **ary;
  int i = 0, numLine = 0;
  while (str[i])
    if (str[i++] == separator)
      numLine++;
  ary = malloc((numLine + 1) * sizeof(char *));

  numLine = 0;
  while (str) {
    char *nextLine = strchr(str, separator);
    int inputLen = nextLine ? (nextLine - str) : strlen(str);
    char *tempStr = (char *)malloc(inputLen + 1);
    if (tempStr) {
      memcpy(tempStr, str, inputLen);
      tempStr[inputLen] = '\0';
      ary[numLine++] = tempStr;
    }
    str = nextLine ? (nextLine + 1) : NULL;
  }
  ary[numLine] = NULL;

  return ary;
}

char *strdupcat(char *restrict src1, char *restrict src2) {
  return strcat(strcpy((char *)malloc(strlen(src1) + strlen(src2) + 1), src1),
                src2);
}

int stridxof(const char *restrict str, char c) {
  int i;
  for (i = 0; i < strlen(str); i++) {
    if (str[i] == c)
      return i;
  }
  return -1;
}
