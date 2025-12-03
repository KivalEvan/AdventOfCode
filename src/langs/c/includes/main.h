#ifndef MAIN_H_
#define MAIN_H_
#include "options.h"
#include <stdint.h>

#define MOD_CP 1000000007

static const solution_options_t options;

static char *solve(const char *restrict input, const int32_t isTest,
                   const int32_t p2);
static char *part1(const char *restrict input, const int32_t isTest);
static char *part2(const char *restrict input, const int32_t isTest);

#endif
