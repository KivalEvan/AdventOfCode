#include "run.h"
#include "input.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

void *result;

char *strdupcat(char *restrict src1, char *restrict src2) {
  return strcat(strcpy((char *)malloc(strlen(src1) + strlen(src2) + 1), src1),
                src2);
}

void _test(void *actual, void *expected) {}

void _perform(char *tag, void *(*fun)(char *), char *input) {
  clock_t start, end;

  printf("\n\\ %s\n", tag);

  start = clock();
  result = fun(input);
  end = clock();
  double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;

  printf(" -- Time taken (ms): %.2lf\n", time_taken * 1000);
  printf("/ Result: %lld\n", *(long long *)result);
}

int run(int argc, char *argv[], void *(*fun_part1)(char *),
        void *(*fun_part2)(char *), bool has_alternate) {
  if (argc == 1) {
    fprintf(stderr, "Usage: <path/to/year/day/c>\n");
    return -1;
  }
  Answers answers = getanswers(strdupcat(argv[1], "/../answers.txt"));

  _perform("Test 1", fun_part1, getinput(strdupcat(argv[1], "/../test1.txt")));
  _perform("Part 1", fun_part1, getinput(strdupcat(argv[1], "/../input.txt")));
  _perform("Test 2", fun_part2,
           getinput(strdupcat(argv[1], has_alternate ? "/../test2.txt"
                                                     : "/../test1.txt")));
  _perform("Part 2", fun_part2, getinput(strdupcat(argv[1], "/../input.txt")));
  return 0;
}