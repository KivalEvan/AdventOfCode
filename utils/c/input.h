#ifndef INPUT_H_
#define INPUT_H_

char *get_input();

typedef struct Answers {
  char *test1;
  char *test2;
  char *part1;
  char *part2;
} Answers;

Answers get_answers();

#endif