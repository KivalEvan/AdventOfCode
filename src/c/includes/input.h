#ifndef INPUT_H_
#define INPUT_H_

typedef struct answers {
   char *test1;
   char *test2;
   char *part1;
   char *part2;
} Answers;

char *getinput(const char *restrict path);

Answers getanswers(const char *restrict path);

#endif
