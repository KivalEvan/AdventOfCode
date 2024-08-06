#ifndef RUN_H_
#define RUN_H_
#include "options.h"
#include <stdint.h>

int run(int argc, char *argv[],
        char *(*fun_part1)(const char *restrict, const int32_t),
        char *(*fun_part2)(const char *restrict, const int32_t),
        const solution_options_t options);

#endif
