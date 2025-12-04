#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

struct position {
   int32_t x;
   int32_t y;
};

static uint8_t countneighbour(const int32_t x, const int32_t y,
                              const int32_t max, const char *restrict input,
                              const int32_t size) {
   uint8_t adjacent = 0;
   for (int32_t nX = -1; nX <= 1; nX++)
      for (int32_t nY = -1; nY <= 1; nY++) {
         int32_t index = (max * (y + nY)) + (x + nX) + (y + nY);
         if (index < 0 || index >= size)
            continue;
         adjacent += input[index] == '@';
      }
   return adjacent - 1;
}

static char *solve(const char *restrict input, const int32_t isTest,
                   const int32_t p2) {
   uint8_t grid[32766] = {};
   int32_t size = strlen(input);
   int32_t max = 0;
   for (int32_t i = 0; i < size; i++) {
      if (input[i] == '\n') {
         break;
      }
      max++;
   }

   struct position candidates[32766] = {};
   int32_t ptr = 0;

   for (int32_t y = 0; y < max; y++)
      for (int32_t x = 0; x < max; x++) {
         int32_t index = max * y + x + y;
         if (input[index] == '@') {
            grid[index] = countneighbour(x, y, max, input, size);
            if (grid[index] < 4) {
               candidates[ptr].x = x;
               candidates[ptr].y = y;
               ptr++;
            }
         }
      }

   int32_t total = 0;
   if (!p2) {
      return num_tostr(ptr);
   }

   while (ptr) {
      total++;
      struct position pos = candidates[--ptr];
      int32_t i = max * pos.y + pos.x + pos.y;
      grid[i] = 0;
      for (int32_t nX = -1; nX <= 1; nX++) {
         for (int32_t nY = -1; nY <= 1; nY++) {
            int32_t index = max * (pos.y + nY) + pos.x + nX + pos.y + nY;
            if (index < 0 || index >= size)
               continue;
            grid[index]--;
            if (grid[index] == 3) {
               candidates[ptr].x = pos.x + nX;
               candidates[ptr].y = pos.y + nY;
               ptr++;
            }
         }
      }
   }

   return num_tostr(total);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   return solve(input, isTest, 0);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   return solve(input, isTest, 1);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
   return run(argc, argv, part1, part2, options);
}
