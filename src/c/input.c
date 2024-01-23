#include "input.h"
#include "utils_str.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *get_input(const char *restrict path) {
   FILE *f = fopen(path, "rb");

   fseek(f, 0, SEEK_END);
   size_t sz = ftell(f);
   fseek(f, 0, SEEK_SET);

   char *str = malloc((sz + 1) * sizeof(char));
   if (str == NULL)
      return str;
   fread(str, sz, 1, f);
   fclose(f);

   str[sz] = 0;
   // yeet empty last line that always somehow happen for no reason
   // i hope this will totally not screw me over
   if (str[sz - 1] == '\n')
      str[sz - 1] = 0;

   return str;
}

answers_t get_answers(const char *restrict path) {
   size_t sz, line = 0;
   char *input = get_input(path);
   char **lines = str_splitc(input, '\n', &sz);
   answers_t answers;

   answers.test1 = "";
   answers.test2 = "";
   answers.part1 = "";
   answers.part2 = "";

   while (line < sz) {
      switch (line) {
      case 0:
         answers.test1 = lines[line];
         break;
      case 1:
         answers.part1 = lines[line];
         break;
      case 2:
         answers.test2 = lines[line];
         break;
      case 3:
         answers.part2 = lines[line];
         break;
      default:
         free(lines[line]);
      }
      line++;
   }
   free(input);
   free(lines);

   return answers;
}
