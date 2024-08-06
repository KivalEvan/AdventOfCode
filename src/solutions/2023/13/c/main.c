#include "main.h"
#include "run.h"
#include "utils_str.h"
#include "utils_num.h"
#include <stdlib.h>
#include <string.h>

static char *part1(const char *restrict input, const int32_t isTest) {
   return num_tostr(0);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   return num_tostr(0);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
return run(argc, argv, part1, part2, options);
}
