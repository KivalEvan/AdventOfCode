#ifndef RUN_H_
#define RUN_H_

int run(int argc, char *argv[], char *(*fun_part1)(const char *restrict),
        char *(*fun_part2)(const char *restrict), int has_alternate);

#endif
