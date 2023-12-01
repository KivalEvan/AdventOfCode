#include "run.h"
#include "input.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

void *result;

void _test(void *actual, void *expected) {}

void _perform(void *(*fun)(char *), char *input) {
  clock_t start, end;
  start = clock();
  result = fun(input);
  end = clock();
  double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;

  printf("Result: %p", result);
  printf(" -- Time taken (ms): %f", round(time_taken * 100) / 100000)
}

int run(int argc, char *argv[], void *(*fun_part1)(char *),
        void *(*fun_part2)(char *), bool has_alternate) {
  Answers answers = get_answers();
  return 0;
}