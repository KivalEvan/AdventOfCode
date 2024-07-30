#include <stdlib.h>

#ifndef UTILS_STR_H_
#define UTILS_STR_H_

char *str_replacec(char *restrict str, const char replace, const char with);

char *str_slice(const char *restrict src, char *restrict dest,
                const size_t start, const size_t end);

char **str_splitc(const char *restrict str, const char delimiter,
                  size_t *pSize);
char **str_split(const char *restrict str, const char *delimiter,
                 size_t *pSize);

size_t str_idxofc(const char *restrict str, const char search);
size_t str_lastidxofc(const char *restrict str, const char search);
size_t str_idxof(const char *restrict str, const char *restrict search);

#endif
