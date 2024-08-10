#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stdlib.h>
#include <string.h>

static void parse_input(const char *restrict input, char ***types,
                        int32_t ***qtys, size_t **qtySz, size_t *sz) {
   size_t i, j, count, countTemp;
   char **lines, *line, **temp, **sequences, **val;

   lines = str_splitc(input, '\n', sz);
   *types = malloc((*sz) * sizeof(**types));
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
         (*types)[i][j] = val[2][0];
         (*qtys)[i][j] = atoi(val[1]);

         free(val[0]);
         free(val[1]);
         free(val[2]);
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
   int32_t **qtys, valid, rgb[3] = {12, 13, 14}, res = 0;
   size_t i, j, sz, *qtySz;
   char **types;
   parse_input(input, &types, &qtys, &qtySz, &sz);

   for (i = 0; i < sz; i++) {
      valid = 1;
      for (j = 0; j < qtySz[i]; j++) {
         size_t idx = types[i][j] % 3;
         if (qtys[i][j] > rgb[idx])
            valid = 0;
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
   int32_t **qtys, rgb[3], res = 0;
   size_t i, j, sz, *qtySz;
   char **types;
   parse_input(input, &types, &qtys, &qtySz, &sz);

   for (i = 0; i < sz; i++) {
      rgb[0] = rgb[1] = rgb[2] = 0;
      for (j = 0; j < qtySz[i]; j++) {
         size_t idx = types[i][j] % 3;
         if (qtys[i][j] > rgb[idx])
            rgb[idx] = qtys[i][j];
      }
      res += rgb[0] * rgb[1] * rgb[2];

      free(types[i]);
      free(qtys[i]);
   }
   free(types);
   free(qtys);
   free(qtySz);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
   return run(argc, argv, part1, part2, options);
}
