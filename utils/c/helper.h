#include <stdio.h>

#ifndef HELPER_H_
#define HELPER_H_

char *strslice(const char *restrict src, char *restrict dest, size_t start,
               size_t end);

char **strsplit(char *input);

#endif