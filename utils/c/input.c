#include "input.h"
#include "split.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *getinput(char *path) {
  FILE *f = fopen(path, "rb");

  fseek(f, 0, SEEK_END);
  long fsize = ftell(f);
  fseek(f, 0, SEEK_SET);

  char *string = malloc(fsize + 1);
  fread(string, fsize, 1, f);
  fclose(f);

  string[fsize] = 0;

  return string;
}

Answers getanswers(char *path) {
  char **input = strsplit(getinput(path));
  Answers answers;
  int line = 0;

  while (input[line]) {
    switch (line) {
    case 0:
      answers.test1 = input[line];
      break;
    case 1:
      answers.part1 = input[line];
      break;
    case 2:
      answers.test2 = input[line];
      break;
    case 3:
      answers.part2 = input[line];
      break;
    }
    line++;
  }

  return answers;
}