#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <ctype.h>
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_ALTERNATE = 1;

static char getnum(const char *restrict str) {
   if (strncmp(str, "zero", 4) == 0)
      return '0';
   if (strncmp(str, "one", 3) == 0)
      return '1';
   if (strncmp(str, "two", 3) == 0)
      return '2';
   if (strncmp(str, "three", 5) == 0)
      return '3';
   if (strncmp(str, "four", 4) == 0)
      return '4';
   if (strncmp(str, "five", 4) == 0)
      return '5';
   if (strncmp(str, "six", 3) == 0)
      return '6';
   if (strncmp(str, "seven", 5) == 0)
      return '7';
   if (strncmp(str, "eight", 5) == 0)
      return '8';
   if (strncmp(str, "nine", 4) == 0)
      return '9';
   return '\0';
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t linesSz, i, j;
   int32_t res = 0;
   char *s, str[2], **lines;

   lines = str_splitc(input, '\n', &linesSz);
   for (i = 0; i < linesSz; i++) {
      s = lines[i];
      for (j = 0; j < strlen(s); j++) {
         if (isdigit(s[j])) {
            str[0] = s[j];
            break;
         }
      }
      for (j = strlen(s) - 1; j >= 0; j--) {
         if (isdigit(s[j])) {
            str[1] = s[j];
            break;
         }
      }

      res += atoi(str);
      free(lines[i]);
   }
   free(lines);

   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t linesSz, i, j;
   int32_t res = 0;
   char c, *s, str[2], temp[6], **lines;

   lines = str_splitc(input, '\n', &linesSz);
   for (i = 0; i < linesSz; i++) {
      s = lines[i];

      for (j = 0; j < strlen(s); j++) {
         if (isdigit(s[j])) {
            str[0] = s[j];
            break;
         }
         c = getnum(str_slice(s, temp, j, j + 5));
         if (c != '\0') {
            str[0] = c;
            break;
         }
      }
      for (j = strlen(s) - 1; j >= 0; j--) {
         if (isdigit(s[j])) {
            str[1] = s[j];
            break;
         }
         c = getnum(str_slice(s, temp, j, j + 5));
         if (c != '\0') {
            str[1] = c;
            break;
         }
      }

      res += atoi(str);
      free(lines[i]);
   }
   free(lines);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
