#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

#define MOD_CP 1000000007

#ifndef MAIN_H_
#define MAIN_H_

const int HAS_ALTERNATE;

char *part1(const char *restrict input);
char *part2(const char *restrict input);

char *numtostr(const long long num) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%lld", num);
   return str;
}

#endif
