#include "run.h"
#include "bench.h"
#include "helper.h"
#include "input.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

char *result;

void _test(const char *restrict actual, const char *restrict expected) {
  if (strlen(expected) == 0)
    return;
  if (strcmp(actual, expected) != 0) {
    fprintf(stderr, "Expected %s but received %s\n", expected, actual);
    exit(-1);
  }
}

void _perform(const char *restrict tag, char *(*fun)(const char *restrict),
              char *path) {
  clock_t start, end;
  char *input = getinput(path);
  double e_io, e_part;

  printf("\n\\ %s\n", tag);

  start = clock();
  input = getinput(path);
  end = clock();
  e_io = ((double)(end - start)) / CLOCKS_PER_SEC;

  start = clock();
  result = fun(input);
  end = clock();
  e_part = ((double)(end - start)) / CLOCKS_PER_SEC;
  printf(" -- Time Taken (ms):\n | IO > PART > ALL\n | %.3f > %.3f > %.3f\n",
         e_io * 1000, e_part * 1000, (e_io + e_part) * 1000);

  printf("/ Result: %s\n", result);

  free(input);
  free(path);
}

int run(int argc, char *argv[], char *(*fun_part1)(const char *restrict),
        char *(*fun_part2)(const char *restrict), bool has_alternate) {
  if (argc == 1) {
    fprintf(stderr, "Usage: <path/to/year/day> <any_input_for_bench>\n");
    return -1;
  }

  if (argc == 3) {
    bench("Test 1", fun_part1, strdupcat(argv[1], "/test1.txt"));
    bench("Part 1", fun_part1, strdupcat(argv[1], "/input.txt"));
    bench("Test 2", fun_part2,
          strdupcat(argv[1], has_alternate ? "/test2.txt" : "/test1.txt"));
    bench("Part 2", fun_part2, strdupcat(argv[1], "/input.txt"));
  } else {
    Answers *answers = getanswers(strdupcat(argv[1], "/answers.txt"));

    _perform("Test 1", fun_part1, strdupcat(argv[1], "/test1.txt"));
    _test(result, answers->test1);
    free(result);
    _perform("Part 1", fun_part1, strdupcat(argv[1], "/input.txt"));
    _test(result, answers->part1);
    free(result);
    _perform("Test 2", fun_part2,
             strdupcat(argv[1], has_alternate ? "/test2.txt" : "/test1.txt"));
    _test(result, answers->test2);
    free(result);
    _perform("Part 2", fun_part2, strdupcat(argv[1], "/input.txt"));
    _test(result, answers->part2);
    free(result);

    free(answers->part1);
    free(answers->part2);
    free(answers->test1);
    free(answers->test2);
    free(answers);
  }

  return 0;
}
