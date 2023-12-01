#include <stdbool.h>

#ifndef RUN_H_
#define RUN_H_

int run(int argc, char *argv[], void *(*fun_part1)(char *),
        void *(*fun_part2)(char *), bool has_alternate);

#endif