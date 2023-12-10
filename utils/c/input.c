#include "input.h"
#include "helper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *getinput(const char *restrict path) {
  FILE *f = fopen(path, "rb");

  fseek(f, 0, SEEK_END);
  long fsize = ftell(f);
  fseek(f, 0, SEEK_SET);

  char *string = malloc((fsize + 1) * sizeof(char));
  fread(string, fsize, 1, f);
  fclose(f);

  string[fsize] = 0;
  // yeet empty last line that always somehow happen for no reason
  // i hope this will totally not screw me over
  if (string[fsize - 1] == '\n') {
    char *cpy = malloc(fsize * sizeof(char));
    strncpy(cpy, string, fsize - 1);
    cpy[fsize - 1] = 0;
    string = cpy;
  }

  return string;
}

Answers *getanswers(const char *restrict path) {
  int sz, line = 0;
  char **input = strsplit(getinput(path), "\n", &sz);
  Answers *answers = malloc(sizeof(Answers));

  while (line < sz) {
    switch (line) {
    case 0:
      answers->test1 = input[line];
      break;
    case 1:
      answers->part1 = input[line];
      break;
    case 2:
      answers->test2 = input[line];
      break;
    case 3:
      answers->part2 = input[line];
      break;
    }
    line++;
  }

  return answers;
}
