#include "main.h"
#include "run.h"
#include "utils_hashmap.h"
#include "utils_num.h"
#include "utils_str.h"
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUCKET_SIZE 1024

static void parse_input(const char *restrict input, size_t *sz,
                          char ***fields, size_t ***conditions,
                          size_t **conditionsSz) {
   size_t linesSz, i, j;
   char **parsed, **lines, **cond;
   parsed = str_splitc(input, '\n', sz);

   *fields = malloc(*sz * sizeof(char **));
   *conditions = malloc(*sz * sizeof(size_t **));
   *conditionsSz = malloc(*sz * sizeof(size_t *));

   for (i = 0; i < *sz; i++) {
      lines = str_splitc(parsed[i], ' ', &linesSz);
      (*fields)[i] = lines[0];

      cond = str_splitc(lines[1], ',', &(*conditionsSz)[i]);
      (*conditions)[i] = malloc((*conditionsSz)[i] * sizeof(size_t *));
      for (j = 0; j < (*conditionsSz)[i]; j++) {
         (*conditions)[i][j] = atoi(cond[j]);
         free(cond[j]);
      }
      printf("%s\n", lines[1]);
      printf(" %zu\n", (*conditionsSz)[i]);
      free(cond);

      free(lines[1]);
      free(parsed[i]);
   }
   free(parsed);
}

static size_t memodrecursion(struct Hashmap *cache, const char *restrict field,
                             const size_t *conditions,
                             const size_t conditionsSz, const size_t fieldSz,
                             size_t fieldIdx, size_t conditionsIdx);
static size_t lookahead(struct Hashmap *cache, const char *restrict field,
                        const size_t *conditions, const size_t conditionsSz,
                        const size_t fieldSz, size_t fieldIdx,
                        size_t conditionsIdx);

static size_t wedoabitofrecursion(struct Hashmap *cache,
                                  const char *restrict field,
                                  const size_t *conditions,
                                  const size_t conditionsSz,
                                  const size_t fieldSz, size_t fieldIdx,
                                  size_t conditionsIdx) {
   if (fieldIdx >= fieldSz)
      return conditionsIdx == conditionsSz ? 1 : 0;
   if (field[fieldIdx] == '.')
      return memodrecursion(cache, field, conditions, conditionsSz, fieldSz,
                            fieldIdx + 1, conditionsIdx);
   if (field[fieldIdx] == '#')
      return lookahead(cache, field, conditions, conditionsSz, fieldSz,
                       fieldIdx, conditionsIdx);
   return memodrecursion(cache, field, conditions, conditionsSz, fieldSz,
                         fieldIdx + 1, conditionsIdx) +
          lookahead(cache, field, conditions, conditionsSz, fieldSz, fieldIdx,
                    conditionsIdx);
}

static size_t lookahead(struct Hashmap *cache, const char *restrict field,
                        const size_t *conditions, const size_t conditionsSz,
                        const size_t fieldSz, size_t fieldIdx,
                        size_t conditionsIdx) {
   if (conditionsIdx == conditionsSz)
      return 0;
   if (fieldSz - fieldIdx < conditions[conditionsIdx])
      return 0;
   for (size_t k = fieldIdx; k < fieldIdx + conditions[conditionsIdx]; k++)
      if (field[k] == '.')
         return 0;
   if (fieldSz - 1 == conditions[conditionsIdx])
      return memodrecursion(cache, field, conditions, conditionsSz, fieldSz,
                            fieldSz, conditionsIdx + 1);
   if (field[fieldIdx + conditions[conditionsIdx]] != '#')
      return memodrecursion(cache, field, conditions, conditionsSz, fieldSz,
                            fieldIdx + conditions[conditionsIdx] + 1,
                            conditionsIdx + 1);
   return 0;
}

static size_t memodrecursion(struct Hashmap *cache, const char *restrict field,
                             const size_t *conditions,
                             const size_t conditionsSz, const size_t fieldSz,
                             size_t fieldIdx, size_t conditionsIdx) {
   char *key = malloc(128 * sizeof(char));
   sprintf(key, "%zu,%zu", fieldIdx, conditionsIdx);
   struct Node *n = hashmap_get(cache, key);
   if (n != NULL) {
      return (size_t)n->data;
   } else {
      size_t result =
          wedoabitofrecursion(cache, field, conditions, conditionsSz, fieldSz,
                              fieldIdx, conditionsIdx);
      hashmap_set(cache, key, &result);
      return result;
   }
}

static size_t solve(const char *restrict field, const size_t *conditions,
                    const size_t conditionsSz) {
   struct Hashmap *cache = hashmap_create(BUCKET_SIZE, NULL);

   size_t res = memodrecursion(cache, field, conditions, conditionsSz,
                               strlen(field), 0, 0);

   hashmap_destroy(cache);
   return res;
}

static char *part1(const char *restrict input, const int32_t isTest) {
   char **fields;
   size_t sz, *conditionsSz;
   size_t **conditions;
   parse_input(input, &sz, &fields, &conditions, &conditionsSz);
   size_t res = 0;

   for (size_t i = 0; i < sz; i++) {
      res += solve(fields[i], conditions[i], conditionsSz[i]);
      free(fields[i]);
      free(conditions[i]);
   }
   free(fields);
   free(conditions);
   free(conditionsSz);

   return num_tostr(res);
}

static char *repeat_str(char *str, size_t count) {
   if (count == 0)
      return NULL;
   char *ret = malloc((strlen(str) * count + count) * sizeof(char));
   if (ret == NULL)
      return NULL;
   strcpy(ret, str);
   while (--count > 0) {
      strcat(ret, "?");
      strcat(ret, str);
   }
   return ret;
}

static size_t *repeat_ary(size_t *ary, size_t sz, size_t count) {
   if (count == 0)
      return NULL;
   size_t *ret = malloc(sz * count * sizeof(size_t));
   if (ret == NULL)
      return NULL;
   for (size_t i = 0; i < count; i++) {
      for (size_t j = 0; j < sz; j++) {
         ret[i * sz + j] = ary[j];
      }
   }
   return ret;
}

static char *part2(const char *restrict input, const int32_t isTest) {
   char **fields;
   size_t sz, *conditionsSz;
   size_t **conditions;
   parse_input(input, &sz, &fields, &conditions, &conditionsSz);
   size_t res = 0;

   for (size_t i = 0; i < sz; i++) {
      char *newstr = repeat_str(fields[i], 5);
      size_t *newcond = repeat_ary(conditions[i], conditionsSz[i], 5);
      free(fields[i]);
      free(conditions[i]);

      res += solve(newstr, newcond, conditionsSz[i] * 5);
      free(newstr);
      free(newcond);
   }
   free(fields);
   free(conditions);
   free(conditionsSz);

   return num_tostr(res);
}

int main(int argc, char *argv[]) {
   solution_options_t options = getoptions();
return run(argc, argv, part1, part2, options);
}
