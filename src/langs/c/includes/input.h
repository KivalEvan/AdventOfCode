#ifndef INPUT_H_
#define INPUT_H_

typedef struct Answers {
   char *test1;
   char *test2;
   char *part1;
   char *part2;
} answers_t;

char *get_input(const char *restrict path);

answers_t get_answers(const char *restrict path);

#endif
