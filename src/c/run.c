#include <input.h>
#include <run.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define ITERATION_BENCH 1000

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
}

void _bench(const char *restrict tag, char *(*fun)(const char *restrict),
            char *path) {
   char *_, *input;
   clock_t start, end;
   double elapsed;
   int i;

   double *timesIo = malloc(ITERATION_BENCH * sizeof(double));
   double *timesPart = malloc(ITERATION_BENCH * sizeof(double));
   double *timesOverall = malloc(ITERATION_BENCH * sizeof(double));

   for (i = 0; i < ITERATION_BENCH; i++) {
      start = clock();
      input = getinput(path);
      end = clock();
      elapsed = ((double)(end - start)) / CLOCKS_PER_SEC;
      timesIo[i] = elapsed;

      start = clock();
      _ = fun(input);
      end = clock();
      elapsed = ((double)(end - start)) / CLOCKS_PER_SEC;
      timesPart[i] = elapsed;

      timesOverall[i] = timesPart[i] + timesIo[i];
   }
   double min, max, total, avg;
   printf("\nBenchmarking %s (ms)\n", tag);
   min = 9999999, max = 0, total = 0;
   for (i = 0; i < ITERATION_BENCH; i++) {
      total += timesIo[i];
      if (min > timesIo[i])
         min = timesIo[i];
      if (max < timesIo[i])
         max = timesIo[i];
   }
   avg = total / ITERATION_BENCH;
   min *= 1000;
   max *= 1000;
   avg *= 1000;
   printf("IO (min..max) %.3f - %.3f (avg) %.3f\n", min, max, avg);

   min = 9999999, max = 0, total = 0;
   for (i = 0; i < ITERATION_BENCH; i++) {
      total += timesPart[i];
      if (min > timesPart[i])
         min = timesPart[i];
      if (max < timesPart[i])
         max = timesPart[i];
   }
   avg = total / ITERATION_BENCH;
   min *= 1000;
   max *= 1000;
   avg *= 1000;
   printf("Part (min..max) %.3f - %.3f (avg) %.3f\n", min, max, avg);

   min = 9999999, max = 0, total = 0;
   for (i = 0; i < ITERATION_BENCH; i++) {
      total += timesOverall[i];
      if (min > timesOverall[i])
         min = timesOverall[i];
      if (max < timesOverall[i])
         max = timesOverall[i];
   }
   avg = total / ITERATION_BENCH;
   min *= 1000;
   max *= 1000;
   avg *= 1000;
   printf("Overall (min..max) %.3f - %.3f (avg) %.3f\n", min, max, avg);

   free(timesIo);
   free(timesPart);
   free(timesOverall);
   free(input);
   free(_);
}

char *_strcatpath(const char *restrict path1, const char *restrict path2) {
   char *str = malloc((strlen(path1) + strlen(path2)) * sizeof(char));
   str[0] = 0;
   strcat(str, path1);
   strcat(str, path2);

   return str;
}

int run(int argc, char *argv[], char *(*fun_part1)(const char *restrict),
        char *(*fun_part2)(const char *restrict), int has_alternate) {
   if (argc == 1) {
      fprintf(stderr, "Usage: <path/to/year/day> <any_input_for_bench>\n");
      return -1;
   }

   char *pathAnswers = _strcatpath(argv[1], "/answers.txt");
   char *pathInput = _strcatpath(argv[1], "/input.txt");
   char *pathTest1 = _strcatpath(argv[1], "/test1.txt");
   char *pathTest2 = _strcatpath(argv[1], "/test2.txt");

   if (argc > 2) {
      _bench("Test 1", fun_part1, pathTest1);
      _bench("Part 1", fun_part1, pathInput);
      _bench("Test 2", fun_part2, has_alternate ? pathTest2 : pathTest1);
      _bench("Part 2", fun_part2, pathInput);
   } else {
      Answers answers = getanswers(pathAnswers);

      _perform("Test 1", fun_part1, pathTest1);
      _test(result, answers.test1);
      free(result);
      _perform("Part 1", fun_part1, pathInput);
      _test(result, answers.part1);
      free(result);
      _perform("Test 2", fun_part2, has_alternate ? pathTest2 : pathTest1);
      _test(result, answers.test2);
      free(result);
      _perform("Part 2", fun_part2, pathInput);
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
