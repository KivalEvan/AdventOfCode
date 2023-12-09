#include "bench.h"
#include "helper.h"
#include "input.h"
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define ITERATION_BENCH 1000

void bench(char *tag, char *(*fun)(char *), char *path) {
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
  free(path);
  free(_);
}
