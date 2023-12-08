#include "helper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *strreplacec(char *restrict str, const char replace, const char with) {
  int i;
  for (i = 0; i < strlen(str); i++) {
    if (str[i] == replace)
      str[i] = with;
  }
  return str;
}

char *strslice(const char *restrict src, char *restrict dest,
               const size_t start, const size_t end) {
  return strncpy(dest, src + start, end - start);
}

char **strsplit(const char *restrict string, const char *delimiter,
                int *count) {
  int len = strlen(string);

  *count = 0;
  int i = 0;
  while (i < len) {
    while (i < len) {
      if (strchr(delimiter, string[i]) == NULL)
        break;
      i++;
    }

    int old_i = i;
    while (i < len) {
      if (strchr(delimiter, string[i]) != NULL)
        break;
      i++;
    }

    if (i > old_i)
      *count = *count + 1;
  }

  char **strings = malloc(*count * sizeof(char *));

  i = 0;
  char buffer[16384];
  int string_index = 0;
  while (i < len) {
    while (i < len) {
      if (strchr(delimiter, string[i]) == NULL)
        break;
      i++;
    }

    int j = 0;
    while (i < len) {
      if (strchr(delimiter, string[i]) != NULL)
        break;

      buffer[j] = string[i];
      i++;
      j++;
    }

    if (j > 0) {
      buffer[j] = '\0';
      int to_allocate = sizeof(char) * (strlen(buffer) + 1);
      strings[string_index] = malloc(to_allocate * sizeof(char));
      strcpy(strings[string_index], buffer);
      string_index++;
    }
  }

  return strings;
}

char *strdupcat(const char *restrict src1, const char *restrict src2) {
  return strcat(
      strcpy(malloc((strlen(src1) + strlen(src2) + 1) * sizeof(char)),
             src1),
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

char *strltrim(char *s) {
  while (isspace(*s))
    s++;
  return s;
}

char *strrtrim(char *s) {
  char *back = s + strlen(s);
  while (isspace(*--back))
    ;
  *(back + 1) = '\0';
  return s;
}

char *strtrim(char *s) { return strrtrim(strltrim(s)); }
