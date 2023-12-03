#include <stdio.h>

#ifndef HELPER_H_
#define HELPER_H_

char *strreplacec(char *restrict str, char replace, char with);

char *strslice(const char *restrict src, char *restrict dest, size_t start,
               size_t end);

char **strsplit(const char *restrict str, char separator);

char *strdupcat(char *restrict src1, char *restrict src2);

int stridxof(const char *restrict str, char c);

#endif
