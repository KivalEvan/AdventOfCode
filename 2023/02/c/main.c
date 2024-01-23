#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_ALTERNATE = 0;

static void parse_input(const char *restrict input, char ****types,
                        int32_t ***qtys, size_t **qtySz, size_t *sz) {
   size_t i, j, count, countTemp;
   char **lines, *line, **temp, **sequences, **val;

   lines = str_splitc(input, '\n', sz);
   *types = malloc((*sz) * sizeof(***types));
   *qtys = malloc((*sz) * sizeof(**qtys));
   *qtySz = malloc((*sz) * sizeof(*qtySz));
   for (i = 0; i < *sz; i++) {
      line = lines[i];
      temp = str_splitc(line, ':', &count);
      str_replacec(temp[1], ';', ',');
      sequences = str_splitc(temp[1], ',', &count);

      (*qtySz)[i] = count;
      (*types)[i] = malloc(count * sizeof(**types));
      (*qtys)[i] = malloc(count * sizeof(*qtys));
      for (j = 0; j < count; j++) {
         val = str_splitc(sequences[j], ' ', &countTemp);
         (*types)[i][j] = val[2];
         (*qtys)[i][j] = atoi(val[1]);

         free(val[0]);
         free(val[1]);
         free(val);
         free(sequences[j]);
      }
      free(sequences);
      free(temp[0]);
      free(temp[1]);
      free(temp);
      free(lines[i]);
   }
   free(lines);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   int32_t **qtys, valid, res = 0;
   size_t i, j, sz, *qtySz;
   char ***types;
   parse_input(input, &types, &qtys, &qtySz, &sz);

   for (i = 0; i < sz; i++) {
      valid = 1;
      for (j = 0; j < qtySz[i]; j++) {
         if (!strcmp(types[i][j], "red") && qtys[i][j] > 12)
            valid = 0;
         if (!strcmp(types[i][j], "green") && qtys[i][j] > 13)
            valid = 0;
         if (!strcmp(types[i][j], "blue") && qtys[i][j] > 14)
            valid = 0;
         free(types[i][j]);
      }
      if (valid)
         res += i + 1;

      free(types[i]);
      free(qtys[i]);
   }
   free(types);
   free(qtys);
   free(qtySz);

   return num_tostr(res);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   int32_t **qtys, red, green, blue, res = 0;
   size_t i, j, sz, *qtySz;
   char ***types;
   parse_input(input, &types, &qtys, &qtySz, &sz);

   for (i = 0; i < sz; i++) {
      red = green = blue = 0;
      for (j = 0; j < qtySz[i]; j++) {
         if (!strcmp(types[i][j], "red") && qtys[i][j] > red)
            red = qtys[i][j];
         if (!strcmp(types[i][j], "green") && qtys[i][j] > green)
            green = qtys[i][j];
         if (!strcmp(types[i][j], "blue") && qtys[i][j] > blue)
            blue = qtys[i][j];
         free(types[i][j]);
      }
      res += red * green * blue;

      free(types[i]);
      free(qtys[i]);
   }
   free(types);
   free(qtys);
   free(qtySz);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
