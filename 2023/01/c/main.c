#include <ctype.h>
#include <helper.h>
#include <main.h>
#include <math.h>
#include <run.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int HAS_ALTERNATE = 1;

char getnum(const char *restrict str) {
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

char *part1(const char *restrict input) {
   int sz, line = 0, res = 0;

   char **splitted = strsplit(input, "\n", &sz);
   while (line < sz) {
      char *s = splitted[line];
      char str[2];

      for (int i = 0; i < strlen(s); i++) {
         if (isdigit(s[i])) {
            str[0] = s[i];
            break;
         }
      }
      for (int i = strlen(s) - 1; i >= 0; i--) {
         if (isdigit(s[i])) {
            str[1] = s[i];
            break;
         }
      }

      res += atoi(str);
      free(splitted[line]);
      line++;
   }
   free(splitted);

   return numtostr(res);
}

char *part2(const char *restrict input) {
   int sz, line = 0, res = 0;

   char **splitted = strsplit(input, "\n", &sz);
   while (line < sz) {
      char *s = splitted[line];
      char str[2];

      for (int i = 0; i < strlen(s); i++) {
         if (isdigit(s[i])) {
            str[0] = s[i];
            break;
         }
         char c = getnum(strslice(s, malloc(5 * sizeof(char)), i, i + 5));
         if (c != '\0') {
            str[0] = c;
            break;
         }
      }
      for (int i, len = i = strlen(s) - 1; i >= 0; i--) {
         if (isdigit(s[i])) {
            str[1] = s[i];
            break;
         }
         char c = getnum(strslice(s, malloc(5 * sizeof(char)), i, i + 5));
         if (c != '\0') {
            str[1] = c;
            break;
         }
      }

      res += atoi(str);
      free(splitted[line]);
      line++;
   }
   free(splitted);

   return numtostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
