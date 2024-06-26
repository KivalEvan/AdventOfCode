#include <stdint.h>

#ifndef RUN_H_
#define RUN_H_

int run(int argc, char *argv[],
        char *(*fun_part1)(const char *restrict, const int32_t),
        char *(*fun_part2)(const char *restrict, const int32_t),
        const int32_t has_alternate, const int32_t has_io);

#endif
