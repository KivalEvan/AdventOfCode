#include <stdbool.h>

#ifndef BENCH_H_
#define BENCH_H_

void bench(const char *restrict tag, char *(*fun)(const char *restrict),
           char *path);

#endif
