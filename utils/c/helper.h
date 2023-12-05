#include <stdio.h>

#ifndef HELPER_H_
#define HELPER_H_

char *strreplacec(char *restrict str, const char replace, const char with);

char *strslice(const char *restrict src, char *restrict dest,
               const size_t start, const size_t end);

char **strsplit(const char *restrict str, const char *delimiter, int *count);

char *strdupcat(const char *restrict src1, const char *restrict src2);

int stridxof(const char *restrict str, char c);

#endif
