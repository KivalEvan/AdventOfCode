#include "main.h"
#include "run.h"
#include "utils_deque.h"
#include "utils_num.h"
#include "utils_str.h"
#include "utils_vec.h"
#include <stdint.h>
#include <stdio.h>
#include <string.h>

static int16_t meetscriteria(char criteria[4], char c) {
   for (int i = 0; i < 4; i++) {
      if (criteria[i] == c) {
         return 1;
      }
   }
   return 0;
}

static int16_t *findstart(char **grid, const size_t max_x, const size_t max_y) {
   int16_t *res = malloc(sizeof(int16_t) * 2);
   for (size_t y = 0; y < max_y; y++) {
      for (size_t x = 0; x < max_x; x++) {
         if (grid[y][x] == 'S') {
            res[0] = x;
            res[1] = y;
            return res;
         }
      }
   }
   return res;
}

static int16_t goup(char **grid, size_t x, size_t y, const size_t max_x,
                    const size_t max_y) {
   if (y > 0 && meetscriteria("S7F|", grid[y - 1][x]))
      return 1;
   return 0;
}

static int16_t godown(char **grid, size_t x, size_t y, const size_t max_x,
                      const size_t max_y) {
   if (y < max_y - 1 && meetscriteria("SLJ|", grid[y + 1][x]))
      return 1;
   return 0;
}

static int16_t goleft(char **grid, size_t x, size_t y, const size_t max_x,
                      const size_t max_y) {
   if (x > 0 && meetscriteria("SLF-", grid[y][x - 1]))
      return 1;
   return 0;
}

static int16_t goright(char **grid, size_t x, size_t y, const size_t max_x,
                       const size_t max_y) {
   if (x < max_x - 1 && meetscriteria("S7J-", grid[y][x + 1]))
      return 1;
   return 0;
}

static int16_t *createpos(int16_t x, int16_t y) {
   int16_t *res = malloc(sizeof(int16_t) * 2);
   res[0] = x;
   res[1] = y;
   return res;
}

static void literallynothing(void *) {}
static struct Vector *lookup(char **grid, int16_t x, int16_t y,
                             const size_t max_x, const size_t max_y) {
   char c = grid[y][x];
   struct Vector *res = vec_create(sizeof(int16_t *), literallynothing);
   switch (c) {
   case '|':
      if (goup(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y - 1));
      }
      if (godown(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y + 1));
      }
      break;
   case '-':
      if (goleft(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x - 1, y));
      }
      if (goright(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x + 1, y));
      }
      break;
   case 'L':
      if (goup(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y - 1));
      }
      if (goright(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x + 1, y));
      }
      break;
   case 'J':
      if (goup(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y - 1));
      }
      if (goleft(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x - 1, y));
      }
      break;
   case '7':
      if (godown(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y + 1));
      }
      if (goleft(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x - 1, y));
      }
      break;
   case 'F':
      if (godown(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y + 1));
      }
      if (goright(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x + 1, y));
      }
      break;
   case 'S':
      if (goup(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y - 1));
      }
      if (godown(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x, y + 1));
      }
      if (goleft(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x - 1, y));
      }
      if (goright(grid, x, y, max_x, max_y)) {
         vec_push(res, createpos(x + 1, y));
      }
      break;
   }
   return res;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t max_x, max_y, max_vy;
   char **grid = str_splitc(input, '\n', &max_y);
   int16_t **visited = malloc(sizeof(int16_t *) * max_y);
   max_x = strlen(grid[0]);
   max_vy = max_y;
   for (size_t y = 0; y < max_y; y++) {
      visited[y] = malloc(sizeof(int16_t) * max_x);
      for (size_t x = 0; x < max_x; x++)
         visited[y][x] = 0;
   }

   int16_t res = 0;
   struct Vector *queue = vec_create(sizeof(int16_t *), free);
   vec_push(queue, findstart(grid, max_x, max_y));
   while (queue->length > 0) {
      int16_t *pos = vec_pop(queue);
      struct Vector *found = lookup(grid, pos[0], pos[1], max_x, max_y);
      for (size_t i = 0; i < found->length; i++) {
         int16_t *f = vec_get(found, i);
         if (visited[f[1]][f[0]]) {
            free(f);
            continue;
         }
         visited[f[1]][f[0]] = 1;
         vec_push(queue, f);
         res++;
      }

      free(pos);
      vec_destroy(found);
   }

   for (size_t y = 0; y < max_y; y++) {
      free(grid[y]);
   }
   free(grid);

   for (size_t y = 0; y < max_vy; y++) {
      free(visited[y]);
   }
   free(visited);

   vec_destroy(queue);

   return num_tostr(res / 2);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t max_x, max_y, max_vx, max_vy;
   char **grid = str_splitc(input, '\n', &max_y);
   int16_t **visited = malloc(sizeof(int16_t *) * max_y * 3);
   max_x = strlen(grid[0]);
   max_vx = max_x * 3;
   max_vy = max_y * 3;
   for (size_t y = 0; y < max_vy; y++) {
      visited[y] = malloc(sizeof(int16_t) * max_vx);
      for (size_t x = 0; x < max_vx; x++)
         visited[y][x] = 0;
   }

   struct Vector *queue = vec_create(sizeof(int16_t *), free);
   vec_push(queue, findstart(grid, max_x, max_y));
   while (queue->length > 0) {
      int16_t *pos = vec_pop(queue);
      struct Vector *found = lookup(grid, pos[0], pos[1], max_x, max_y);
      for (size_t i = 0; i < found->length; i++) {
         int16_t *f = vec_get(found, i);
         visited[f[1] * 3 + 1 + pos[1] - f[1]][f[0] * 3 + 1 + pos[0] - f[0]] =
             1;
         if (visited[f[1] * 3 + 1][f[0] * 3 + 1]) {
            free(f);
            continue;
         }
         visited[f[1] * 3 + 1][f[0] * 3 + 1] = 1;
         vec_push(queue, f);
      }

      free(pos);
      vec_destroy(found);
   }

   vec_push(queue, createpos(0, 0));
   while (queue->length > 0) {
      int16_t *pos = vec_pop(queue);
      if (visited[pos[1]][pos[0]]) {
         free(pos);
         continue;
      }
      visited[pos[1]][pos[0]] = 1;
      for (int16_t ud = -1; ud <= 1; ud++) {
         for (int16_t lr = -1; lr <= 1; lr++) {
            if (pos[1] + ud < 0 || pos[1] + ud >= (int16_t)max_vy) {
               continue;
            }
            if (pos[0] + lr < 0 || pos[0] + lr >= (int16_t)max_vx) {
               continue;
            }
            if (visited[pos[1] + ud][pos[0] + lr]) {
               continue;
            }
            vec_push(queue, createpos(pos[0] + lr, pos[1] + ud));
         }
      }

      free(pos);
   }

   int16_t res = 0;
   for (size_t y = 0; y < max_y; y++) {
      for (size_t x = 0; x < max_x; x++) {
         if (!visited[y * 3 + 1][x * 3 + 1]) {
            res += 1;
         }
      }
   }

   for (size_t y = 0; y < max_y; y++) {
      free(grid[y]);
   }
   free(grid);

   for (size_t y = 0; y < max_vy; y++) {
      free(visited[y]);
   }
   free(visited);

   vec_destroy(queue);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
   options.has_alternate = 1;
   return run(argc, argv, part1, part2, options);
}
