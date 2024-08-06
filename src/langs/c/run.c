#include "run.h"
#include "input.h"
#include "options.h"
#include "utils_ary.h"
#include "utils_str.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct SolutionWrapper {
   const char *restrict tag;
   char *(*fun)(const char *restrict, const int32_t);
   char *restrict path;
   char *restrict test;
   const size_t iteration;
   const solution_options_t options;
   char *restrict result;
   double elapsed[2];
   double bench[3][3];
} solution_t;

static solution_t
_solution_get(const char *restrict tag,
              char *(*fun)(const char *restrict, const int32_t),
              char *restrict path, char *restrict test, const size_t iteration,
              const solution_options_t options) {
   solution_t solution = {
       .tag = tag,
       .fun = fun,
       .path = path,
       .test = test,
       .iteration = iteration,
       .options = options,
       .result = NULL,
       .elapsed = {0, 0},
       .bench = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}},
   };
   return solution;
}

static void _test(const char *restrict actual, const char *restrict expected) {
   if (strlen(expected) == 0)
      return;
   if (strcmp(actual, expected) != 0) {
      fprintf(stderr, "Expected %s but received %s\n", expected, actual);
      exit(-1);
   }
}

static solution_t _print_result(const solution_t solution) {
   if (solution.iteration == 1) {
      printf("\n%s: (ms) IO > Part > Overall\n", solution.tag);
      printf("Timer: %.3f > %.3f > %.3f\n", solution.bench[0][2],
             solution.bench[1][2], solution.bench[2][2]);
   } else {
      printf("\n%s: (ms) min..max avg\n", solution.tag);
      printf("IO: %.3f .. %.3f - %.3f\n", solution.bench[0][0],
             solution.bench[0][1], solution.bench[0][2]);
      printf("Part: %.3f .. %.3f - %.3f\n", solution.bench[1][0],
             solution.bench[1][1], solution.bench[1][2]);
      printf("Overall: %.3f .. %.3f %.3f\n", solution.bench[2][0],
             solution.bench[2][1], solution.bench[2][2]);
   }
   printf("Result: %s\n", solution.result);

   return solution;
}

static solution_t *_execute(solution_t *solution) {
   int32_t is_test = strncmp(solution->tag, "Test", 4) == 0 ? 1 : 0;
   clock_t start, end;
   char *input, *result;
   double e_io, e_part;

   start = clock();
   input = solution->options.has_io
               ? strcpy(malloc(strlen(solution->path) + 1), solution->path)
               : get_input(solution->path);
   end = clock();
   e_io = ((double)(end - start)) / CLOCKS_PER_SEC;

   start = clock();
   result = solution->fun(input, is_test);
   end = clock();
   e_part = ((double)(end - start)) / CLOCKS_PER_SEC;

   solution->result = result;
   solution->elapsed[0] = e_io;
   solution->elapsed[1] = e_part;

   free(input);

   return solution;
}

static solution_t *_perform(solution_t *solution) {
   size_t it = solution->iteration;

   double *timesIo = malloc(it * sizeof(double));
   double *timesPart = malloc(it * sizeof(double));
   double *timesOverall = malloc(it * sizeof(double));

   for (size_t i = 0; i < it; i++) {
      _execute(solution);
      timesIo[i] = solution->elapsed[0];
      timesPart[i] = solution->elapsed[1];
      timesOverall[i] = timesPart[i] + timesIo[i];

      if (i != it - 1) {
         free(solution->result);
      }
   }

   solution->bench[0][0] = ary_min(timesIo, it) * 1000;
   solution->bench[0][1] = ary_max(timesIo, it) * 1000;
   solution->bench[0][2] = ary_sum(timesIo, it) / it * 1000;

   solution->bench[1][0] = ary_min(timesPart, it) * 1000;
   solution->bench[1][1] = ary_max(timesPart, it) * 1000;
   solution->bench[1][2] = ary_sum(timesPart, it) / it * 1000;

   solution->bench[2][0] = ary_min(timesOverall, it) * 1000;
   solution->bench[2][1] = ary_max(timesOverall, it) * 1000;
   solution->bench[2][2] = ary_sum(timesOverall, it) / it * 1000;

   free(timesIo);
   free(timesPart);
   free(timesOverall);

   return solution;
}

static char *_strcatpath(const char *restrict path1,
                         const char *restrict path2) {
   size_t len = strlen(path1) + strlen(path2);
   char *str = malloc((len + 1) * sizeof(char));
   str[0] = 0;
   strcat(str, path1);
   strcat(str, path2);

   return str;
}

int run(int32_t argc, char *argv[],
        char *(*fun_part1)(const char *restrict, const int32_t),
        char *(*fun_part2)(const char *restrict, const int32_t),
        const solution_options_t options) {
   if (argc == 1) {
      fprintf(stderr, "Usage: <path/to/year/day> <number_input_for_bench>\n");
      return -1;
   }
   char *pathAnswers = _strcatpath(argv[1], "/answers.txt");
   char *pathInput = _strcatpath(argv[1], "/input.txt");
   char *pathTest1 = _strcatpath(argv[1], "/test1.txt");
   char *pathTest2 = options.has_alternate ? _strcatpath(argv[1], "/test2.txt")
                                           : strdup(pathTest1);
   int32_t iteration = argc > 2 ? atoi(argv[2]) : 0;

   answers_t answers = get_answers(pathAnswers);
   solution_t solutions[4] = {
       _solution_get("Test 1", fun_part1, pathTest1, answers.test1, iteration,
                     options),
       _solution_get("Part 1", fun_part1, pathInput, answers.part1, iteration,
                     options),
       _solution_get("Test 2", fun_part2, pathTest2, answers.test2, iteration,
                     options),
       _solution_get("Part 2", fun_part2, strdup(pathInput), answers.part2,
                     iteration, options),
   };

   for (size_t i = 0; i < 4; i++) {
      _perform(&solutions[i]);
   }

   for (size_t i = 0; i < 4; i++) {
      _print_result(solutions[i]);
      _test(solutions[i].result, solutions[i].test);

      free(solutions[i].path);
      free(solutions[i].result);
      free(solutions[i].test);
   }
   free(pathAnswers);

   return 0;
}
