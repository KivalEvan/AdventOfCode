#include "utils_str.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *str_replacec(char *restrict str, const char replace, const char with) {
   size_t i, len = strlen(str);
   for (i = 0; i < len; i++) {
      if (str[i] == replace)
         str[i] = with;
   }
   return str;
}

char *str_slice(const char *restrict src, char *restrict dest,
                const size_t start, const size_t end) {
   return strncpy(dest, src + start, end - start);
}

char **str_splitc(const char *restrict str, const char delimiter,
                  size_t *pSize) {
   char **ary, *nextLine, *tempStr;
   size_t i = 0, j;
   *pSize = 1;
   while (str[i])
      if (str[i++] == delimiter)
         (*pSize)++;
   ary = malloc((*pSize) * sizeof(char *));

   i = 0;
   while (str) {
      nextLine = strchr(str, delimiter);
      j = nextLine ? (nextLine - str) : strlen(str);
      tempStr = malloc((j + 1) * sizeof(char));
      if (tempStr) {
         strncpy(tempStr, str, j);
         tempStr[j] = 0;
         ary[i++] = tempStr;
      }
      str = nextLine ? (nextLine + 1) : NULL;
   }

   return ary;
}

char **str_split(const char *restrict string, const char *delimiter,
                 size_t *pSize) {
   size_t len = strlen(string);

   *pSize = 0;
   size_t i = 0;
   while (i < len) {
      while (i < len) {
         if (strchr(delimiter, string[i]) == NULL)
            break;
         i++;
      }

      size_t old_i = i;
      while (i < len) {
         if (strchr(delimiter, string[i]) != NULL)
            break;
         i++;
      }

      if (i > old_i)
         *pSize = *pSize + 1;
   }

   char **strings = malloc(*pSize * sizeof(char *));

   i = 0;
   char buffer[16384];
   size_t string_index = 0;
   while (i < len) {
      while (i < len) {
         if (strchr(delimiter, string[i]) == NULL)
            break;
         i++;
      }

      size_t j = 0;
      while (i < len) {
         if (strchr(delimiter, string[i]) != NULL)
            break;

         buffer[j] = string[i];
         i++;
         j++;
      }

      if (j > 0) {
         buffer[j] = '\0';
         size_t to_allocate = sizeof(char) * (strlen(buffer) + 1);
         strings[string_index] = malloc(to_allocate * sizeof(char));
         strcpy(strings[string_index], buffer);
         string_index++;
      }
   }

   return strings;
}

size_t str_idxofc(const char *restrict str, const char search) {
   size_t i, len = strlen(str);
   for (i = 0; i < len; i++)
      if (str[i] == search)
         return i;
   return -1;
}

size_t str_lastidxofc(const char *restrict str, const char search) {
   size_t i;
   for (i = strlen(str); i >= 0; i--)
      if (str[i] == search)
         return i;
   return -1;
}

size_t str_idxof(const char *restrict str, const char *restrict search) {
   const char *found = strstr(str, search);
   if (found != NULL)
      return found - str;
   return -1;
}
