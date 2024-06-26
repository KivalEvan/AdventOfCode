#include "main.h"
#include "run.h"
#include "utils_hashmap.h"
#include "utils_math.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUCKET_SIZE 1024

static const int32_t HAS_IO = 0;
static const int32_t HAS_ALTERNATE = 1;

static void hashmap_cleanup(void *obj) {
   char **ary;
   ary = obj;
   free(ary[0]);
   free(ary[1]);
   free(obj);
}

static void parse_input(const char *restrict input, int64_t **instructions,
                        char ***navs, int64_t **dists, struct Hashmap **hashmap,
                        size_t *instructionsSz, size_t *srcSz) {
   size_t i, j, k, linesSz, partsSz, destsSz;
   char **lines, **parts, **dests, **sides;
   lines = str_splitc(input, '\n', &linesSz);

   *navs = malloc(6 * sizeof(**navs));
   *dists = malloc(6 * sizeof(*dists));
   *instructionsSz = strlen(lines[0]);
   *instructions = malloc(*instructionsSz * sizeof(*instructions));
   for (i = 0; i < *instructionsSz; i++)
      (*instructions)[i] = lines[0][i] == 'L' ? 0 : 1;

   *hashmap = hashmap_create(BUCKET_SIZE, hashmap_cleanup);
   *srcSz = 0;
   for (i = 2; i < linesSz; i++) {
      parts = str_splitc(lines[i], '=', &partsSz);
      str_replacec(parts[1], '(', ' ');
      str_replacec(parts[1], ',', ' ');
      str_replacec(parts[1], ')', ' ');
      dests = str_splitc(parts[1], ' ', &destsSz);
      parts[0][3] = 0;

      sides = malloc(2 * sizeof(*sides));
      for (j = 0, k = 0; j < destsSz; j++) {
         if (strlen(dests[j])) {
            sides[k++] = dests[j];
         } else {
            free(dests[j]);
         }
      }
      free(dests);

      hashmap_set(*hashmap, parts[0], sides);
      if (parts[0][2] == 'A') {
         (*navs)[*srcSz] = malloc((strlen(parts[0]) + 1) * sizeof(*navs));
         strcpy((*navs)[*srcSz], parts[0]);
         (*dists)[*srcSz] = 0;
         (*srcSz)++;
      }

      free(parts[0]);
      free(parts[1]);
      free(parts);
      free(lines[i]);
   }
   free(lines[0]);
   free(lines[1]);
   free(lines);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   size_t instructionsSz, srcSz, it, i;
   int64_t *instructions, *dists;
   char **navs, *nav;
   struct Hashmap *hashmap;
   struct Node *node;

   parse_input(input, &instructions, &navs, &dists, &hashmap, &instructionsSz,
               &srcSz);

   nav = malloc(4 * sizeof(*nav));
   strcpy(nav, "AAA");
   it = 0;
   while (1) {
      node = hashmap_get(hashmap, nav);
      nav = strncpy(
          nav, ((char **)node->data)[instructions[it % instructionsSz]], 3);
      it++;
      if (!strncmp(nav, "ZZZ", 3))
         break;
   }

   for (i = 0; i < srcSz; i++)
      free(navs[i]);
   free(nav);
   free(navs);
   free(dists);
   free(instructions);
   hashmap_destroy(hashmap);

   return num_tostr(it);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   size_t i, k, instructionsSz, srcSz;
   int64_t *instructions, *dists, res;
   struct Hashmap *hashmap;
   struct Node *node;
   char **navs;

   parse_input(input, &instructions, &navs, &dists, &hashmap, &instructionsSz,
               &srcSz);

   for (i = 0; i < srcSz; i++) {
      k = 0;
      while (1) {
         node = hashmap_get(hashmap, navs[i]);
         strcpy(navs[i],
                ((char **)node->data)[instructions[k % instructionsSz]]);
         k++;
         if (navs[i][2] == 'Z')
            break;
      }
      dists[i] = k;
   }

   res = 1;
   for (i = 0; i < srcSz; i++) {
      res = math_lcm(res, dists[i]);
      free(navs[i]);
   }
   free(navs);
   free(dists);
   free(instructions);
   hashmap_destroy(hashmap);
   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE, HAS_IO);
}
