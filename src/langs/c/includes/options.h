#ifndef OPTIONS_H_
#define OPTIONS_H_
#include <stdint.h>

typedef struct SolutionOptions {
   int32_t has_alternate;
   int32_t has_io;
} solution_options_t;

solution_options_t getoptions();

#endif
