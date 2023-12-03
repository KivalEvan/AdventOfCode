#include "run.h"
#include "helper.h"
#include "input.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

char *result;

void _test(char *actual, char *expected) {
  if (strlen(expected) == 0)
    return;
  if (strcmp(actual, expected) != 0)
    fprintf(stderr, "Expected %s but received %s\n", expected, actual);
}

void _perform(char *tag, char *(*fun)(char *), char *input) {
  clock_t start, end;

  printf("\n\\ %s\n", tag);

  start = clock();
  result = fun(input);
  end = clock();
  double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;

  printf(" -- Time taken (ms): %.3lf\n", time_taken * 1000);
  printf("/ Result: %s\n", result);
}

int run(int argc, char *argv[], char *(*fun_part1)(char *),
        char *(*fun_part2)(char *), bool has_alternate) {
  if (argc == 1) {
    fprintf(stderr, "Usage: <path/to/year/day/c>\n");
    return -1;
  }
  Answers answers = getanswers(strdupcat(argv[1], "/../answers.txt"));

  _perform("Test 1", fun_part1, getinput(strdupcat(argv[1], "/../test1.txt")));
  _test(result, answers.test1);
  _perform("Part 1", fun_part1, getinput(strdupcat(argv[1], "/../input.txt")));
  _test(result, answers.part1);
  _perform("Test 2", fun_part2,
           getinput(strdupcat(argv[1], has_alternate ? "/../test2.txt"
                                                     : "/../test1.txt")));
  _test(result, answers.test2);
  _perform("Part 2", fun_part2, getinput(strdupcat(argv[1], "/../input.txt")));
  _test(result, answers.part2);
  return 0;
}
