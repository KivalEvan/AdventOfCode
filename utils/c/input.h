#ifndef INPUT_H_
#define INPUT_H_

char *getinput(char *path);

typedef struct Answers {
  char *test1;
  char *test2;
  char *part1;
  char *part2;
} Answers;

Answers getanswers(char *path);

#endif