#include "main.h"
#include "helper.h"
#include "run.h"
#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUCKET_SIZE 1024

const bool HAS_ALTERNATE = false;

typedef struct node {
  char *key;
  long long val;
  struct node *next;
} Node;

typedef struct hashmap {
  Node **bucket;
  int size;
} Hashmap;

Node *node_init(const char *key, long long val) {
  Node *n = malloc(sizeof(Node));
  n->key = malloc(strlen(key) * sizeof(char));
  strcpy(n->key, key);
  n->val = val;
  n->next = NULL;
  return n;
}

Node *node_find(Node *n, const char *str) {
  if (n == NULL) return NULL;
  if (!strcmp(n->key, str))
    return n;
  if (n->next)
    return node_find(n->next, str);
  return NULL;
}

// djb2 hash, source: http://www.cse.yorku.ca/~oz/hash.html
int hash(const char *str) {
  int hash = 5381;
  int c;

  while ((c = *str++))
    hash = ((hash << 5) + hash) + c;

  return hash;
}

Hashmap *hashmap_init(void) {
  Hashmap *h = malloc(sizeof(Hashmap));
  h->bucket = malloc(BUCKET_SIZE * sizeof(Node **));
  for (int i = 0; i < BUCKET_SIZE; i++)
    h->bucket[i] = NULL;
  h->size = 0;
  return h;
}

Node *hashmap_getorcreate(Hashmap *hashmap, const char *str) {
  int idx = hash(str) % BUCKET_SIZE;
  Node *n = hashmap->bucket[idx];
  n = node_find(n, str);
  if (n == NULL) {
    n = node_init(str, 0);
    hashmap->bucket[idx] = n;
    hashmap->size++;
  }
  return n;
}

Node *hashmap_get(const Hashmap *hashmap, const char *str) {
  int idx = hash(str) % BUCKET_SIZE;
  Node *n = hashmap->bucket[idx];
  while (true) {
    if (n == NULL)
      return n;
    if (!strcmp(n->key, str))
      return n;
    n = n->next;
  }
}

void hashmap_set(Hashmap *hashmap, const char *str, long long val) {
  Node *n = hashmap_getorcreate(hashmap, str);
  n->val = val;
}

bool hashmap_has(const Hashmap *hashmap, const char *str) {
  int idx = hash(str) % BUCKET_SIZE;
  Node *n = hashmap->bucket[idx];
  while (true) {
    if (n == NULL)
      return false;
    if (!strcmp(n->key, str))
      return true;
    n = n->next;
  }
}

void hashmap_delete(Hashmap *hashmap) {
  Node *n, *m;
  for (int i = 0; i < BUCKET_SIZE; i++) {
    n = hashmap->bucket[i];
    if (n != NULL) {
      free(n->key);
      m = n->next;
      free(n);
      n = m;
    }
  }
  free(hashmap->bucket);
  free(hashmap);
}

void parseInput(const char *restrict input, int *sz, char ***fields,
                int ***conditions, int **c_sz) {
  char **parsed = strsplit(input, "\n", sz);

  *fields = malloc(*sz * sizeof(char **));
  *conditions = malloc(*sz * sizeof(int **));
  *c_sz = malloc(*sz * sizeof(int *));

  for (int i = 0; i < *sz; i++) {
    int sz2;
    char **splt = strsplit(parsed[i], " ", &sz2);
    (*fields)[i] = splt[0];

    char **cond = strsplit(splt[1], ",", &(*c_sz)[i]);
    (*conditions)[i] = malloc((*c_sz)[i] * sizeof(int *));
    for (int j = 0; j < (*c_sz)[i]; j++) {
      (*conditions)[i][j] = atoi(cond[j]);
      free(cond[j]);
    }
    free(cond);

    free(splt[1]);
    free(parsed[i]);
  }
  free(parsed);
}

long long memodrecursion(Hashmap *cache, const char *restrict field,
                         const int *conditions, const int c_sz,
                         const int f_sz, int f_i, int c_i);
long long lookahead(Hashmap *cache, const char *restrict field,
                    const int *conditions, const int c_sz,
                    const int f_sz, int f_i, int c_i);

long long wedoabitofrecursion(Hashmap *cache, const char *restrict field,
                              const int *conditions, const int c_sz,
                              const int f_sz, int f_i, int c_i) {
  if (f_i >= f_sz)
    return c_i == c_sz ? 1 : 0;
  if (field[f_i] == '.')
    return memodrecursion(cache, field, conditions, c_sz, f_sz,
                          f_i + 1, c_i);
  if (field[f_i] == '#')
    return lookahead(cache, field, conditions, c_sz, f_sz, f_i, c_i);
  return memodrecursion(cache, field, conditions, c_sz, f_sz, f_i + 1,
                        c_i) +
         lookahead(cache, field, conditions, c_sz, f_sz, f_i, c_i);
}

long long lookahead(Hashmap *cache, const char *restrict field,
                    const int *conditions, const int c_sz,
                    const int f_sz, int f_i, int c_i) {
  if (c_i == c_sz)
    return 0;
  if (f_sz - f_i < conditions[c_i])
    return 0;
  for (int k = f_i; k < f_i + conditions[c_i]; k++)
    if (field[k] == '.')
      return 0;
  if (f_sz - 1 == conditions[c_i])
    return memodrecursion(cache, field, conditions, c_sz, f_sz,
                          f_sz, c_i + 1);
  if (field[f_i + conditions[c_i]] != '#')
    return memodrecursion(cache, field, conditions, c_sz, f_sz,
                          f_i + conditions[c_i] + 1, c_i + 1);
  return 0;
}

long long memodrecursion(Hashmap *cache, const char *restrict field,
                         const int *conditions, const int c_sz,
                         const int f_sz, int f_i, int c_i) {
  char *key = malloc(32 * sizeof(char));
  sprintf(key, "%d,%d", f_i, c_i);
  Node *n = hashmap_get(cache, key);
  if (n != NULL) {
    return n->val;
  } else {
    long long result = wedoabitofrecursion(cache, field, conditions, c_sz,
                                           f_sz, f_i, c_i);
    hashmap_set(cache, key, result);
    return result;
  }
}

long long solve(const char *restrict field, const int *conditions,
                const int c_sz) {
  Hashmap *cache = hashmap_init();

  long long res =
      memodrecursion(cache, field, conditions, c_sz, strlen(field), 0, 0);

  hashmap_delete(cache);
  return res;
}

char *part1(const char *restrict input) {
  char **fields;
  int sz, **conditions, *c_sz;
  long long res = 0;

  parseInput(input, &sz, &fields, &conditions, &c_sz);

  for (int i = 0; i < sz; i++) {
    res += solve(fields[i], conditions[i], c_sz[i]);
    free(fields[i]);
    free(conditions[i]);
  }
  free(fields);
  free(conditions);
  free(c_sz);

  return numtostr(res);
}

char *repeatstr(char *str, int count) {
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

int *repeatary(int *ary, int sz, int count) {
  if (count == 0)
    return NULL;
  int *ret = malloc(sz * count * sizeof(int));
  if (ret == NULL)
    return NULL;
  for (int i = 0; i < count; i++) {
    for (int j = 0; j < sz; j++) {
      ret[i * sz + j] = ary[j];
    }
  }
  return ret;
}

char *part2(const char *restrict input) {
  char **fields;
  int sz, **conditions, *c_sz;
  long long res = 0;

  parseInput(input, &sz, &fields, &conditions, &c_sz);

  for (int i = 0; i < sz; i++) {
    char *newstr = repeatstr(fields[i], 5);
    int *newcond = repeatary(conditions[i], c_sz[i], 5);
    free(fields[i]);
    free(conditions[i]);

    res += solve(newstr, newcond, c_sz[i] * 5);
    free(newstr);
    free(newcond);
  }
  free(fields);
  free(conditions);
  free(c_sz);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
