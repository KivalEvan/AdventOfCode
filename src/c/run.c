#include "run.h"
#include "input.h"
#include "utils_ary.h"
#include "utils_str.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define ITERATION_BENCH 1000

static char *result;

static void _test(const char *restrict actual, const char *restrict expected) {
   if (strlen(expected) == 0)
      return;
   if (strcmp(actual, expected) != 0) {
      fprintf(stderr, "Expected %s but received %s\n", expected, actual);
      exit(-1);
   }
}

static void _perform(const char *restrict tag,
                     char *(*fun)(const char *restrict, const int32_t),
                     const char *restrict path, const int32_t isTest) {
   clock_t start, end;
   char *input;
   double e_io, e_part;

   printf("\n\\ %s\n", tag);

   start = clock();
   input = get_input(path);
   end = clock();
   e_io = ((double)(end - start)) / CLOCKS_PER_SEC;

   start = clock();
   result = fun(input, isTest);
   end = clock();
   e_part = ((double)(end - start)) / CLOCKS_PER_SEC;
   printf(" -- Time Taken (ms):\n | IO > PART > ALL\n | %.3f > %.3f > %.3f\n",
          e_io * 1000, e_part * 1000, (e_io + e_part) * 1000);

   printf("/ Result: %s\n", result);

   free(input);
}

static void _bench(const char *restrict tag,
                   char *(*fun)(const char *restrict, const int32_t),
                   const char *restrict path, const int32_t isTest) {
   char *_, *input;
   clock_t start, end;
   double elapsed, min, max, avg;
   int32_t i;

   double *timesIo = malloc(ITERATION_BENCH * sizeof(double));
   double *timesPart = malloc(ITERATION_BENCH * sizeof(double));
   double *timesOverall = malloc(ITERATION_BENCH * sizeof(double));

   for (i = 0; i < ITERATION_BENCH; i++) {
      start = clock();
      input = get_input(path);
      end = clock();
      elapsed = ((double)(end - start)) / CLOCKS_PER_SEC;
      timesIo[i] = elapsed;

      start = clock();
      _ = fun(input, isTest);
      end = clock();
      elapsed = ((double)(end - start)) / CLOCKS_PER_SEC;
      timesPart[i] = elapsed;

      timesOverall[i] = timesPart[i] + timesIo[i];
      free(input);
      free(_);
   }
   printf("\nBenchmarking %s (ms)\n", tag);

   min = ary_min(timesIo, ITERATION_BENCH) * 1000;
   max = ary_max(timesIo, ITERATION_BENCH) * 1000;
   avg = ary_sum(timesIo, ITERATION_BENCH) / ITERATION_BENCH * 1000;
   printf("IO (min..max) %.3f - %.3f (avg) %.3f\n", min, max, avg);

   min = ary_min(timesPart, ITERATION_BENCH) * 1000;
   max = ary_max(timesPart, ITERATION_BENCH) * 1000;
   avg = ary_sum(timesPart, ITERATION_BENCH) / ITERATION_BENCH * 1000;
   printf("Part (min..max) %.3f - %.3f (avg) %.3f\n", min, max, avg);

   min = ary_min(timesOverall, ITERATION_BENCH) * 1000;
   max = ary_max(timesOverall, ITERATION_BENCH) * 1000;
   avg = ary_sum(timesOverall, ITERATION_BENCH) / ITERATION_BENCH * 1000;
   printf("Overall (min..max) %.3f - %.3f (avg) %.3f\n", min, max, avg);

   free(timesIo);
   free(timesPart);
   free(timesOverall);
}

static char *_strcatpath(const char *restrict path1,
                         const char *restrict path2) {
   char *str = malloc((strlen(path1) + strlen(path2) + 1) * sizeof(char));
   str[0] = 0;
   strcat(str, path1);
   strcat(str, path2);

   return str;
}

int32_t run(int32_t argc, char *argv[],
            char *(*fun_part1)(const char *restrict, const int32_t),
            char *(*fun_part2)(const char *restrict, const int32_t),
            const int32_t has_alternate) {
   if (argc == 1) {
      char *test = "\nww\n\nxxx\nlol";
      size_t m;
      char **ary = str_split(test, "\n\n", &m);
      for (size_t i = 0; i < m; i++) {
         printf("%lu %s\n", strlen(ary[i]), ary[i]);
      }
      fprintf(stderr, "Usage: <path/to/year/day> <any_input_for_bench>\n");
      return -1;
   }

   char *pathAnswers = _strcatpath(argv[1], "/answers.txt");
   char *pathInput = _strcatpath(argv[1], "/input.txt");
   char *pathTest1 = _strcatpath(argv[1], "/test1.txt");
   char *pathTest2 = _strcatpath(argv[1], "/test2.txt");

   if (argc > 2) {
      _bench("Test 1", fun_part1, pathTest1, 0);
      _bench("Part 1", fun_part1, pathInput, 1);
      _bench("Test 2", fun_part2, has_alternate ? pathTest2 : pathTest1, 0);
      _bench("Part 2", fun_part2, pathInput, 1);
   } else {
      answers_t answers = get_answers(pathAnswers);

      _perform("Test 1", fun_part1, pathTest1, 0);
      _test(result, answers.test1);
      free(result);
      _perform("Part 1", fun_part1, pathInput, 1);
      _test(result, answers.part1);
      free(result);
      _perform("Test 2", fun_part2, has_alternate ? pathTest2 : pathTest1, 0);
      _test(result, answers.test2);
      free(result);
      _perform("Part 2", fun_part2, pathInput, 1);
      _test(result, answers.part2);
      free(result);

      free(answers.part1);
      free(answers.part2);
      free(answers.test1);
      free(answers.test2);
   }

   free(pathAnswers);
   free(pathInput);
   free(pathTest1);
   free(pathTest2);

   return 0;
}
