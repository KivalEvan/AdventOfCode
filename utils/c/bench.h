#include <stdbool.h>

#ifndef BENCH_H_
#define BENCH_H_

void bench(char *tag, char *(*fun)(char *), char *path);

#endif
