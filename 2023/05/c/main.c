#include <ctype.h>
#include <helper.h>
#include <main.h>
#include <math.h>
#include <run.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int HAS_ALTERNATE = 0;

int *getSeeds(char *str, int *sz) {
   int sz_1, sz_2, i;
   char **parsed = strsplit(str, ":", &sz_1);
   char **seeds = strsplit(parsed[1], " ", &sz_2);

   for (i = 0; i < sz_1; i++)
      free(parsed[i]);
   free(parsed);

   int *ary = malloc(sz_2 * sizeof(int));
   for (i = 0, *sz = 0; i < sz_2; i++) {
      if (strlen(seeds[i]))
         ary[(*sz)++] = atoi(seeds[i]);
      free(seeds[i]);
   }
   free(seeds);

   return ary;
}

int **getMaps(char *str, int *sz) {}

char *part1(const char *restrict input) {
   int i, j, k, l, sz_parsed, sz_seeds;
   char **parsed = strsplit(input, "\n\n", &sz_parsed);
   int *seeds = getSeeds(parsed[0], &sz_seeds);

   for (i = 0; i < sz_parsed; i++)
      free(parsed[i]);
   free(parsed);
   free(seeds);

   return numtostr(0);
}

char *part2(const char *restrict input) { return numtostr(0); }

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
