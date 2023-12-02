#include <stdio.h>

#ifndef HELPER_H_
#define HELPER_H_

char *strslice(const char *restrict src, char *restrict dest, size_t start,
               size_t end);

char **strsplitc(char *restrict str, char limiter);
char **strsplit(char *restrict str);

int stridxof(const char *restrict str, char c);

#endif