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

const bool HAS_ALTERNATE = true;

typedef struct node {
  char *key;
  char **lr;
  struct node *next;
} Node;

typedef struct hashmap {
  Node **bucket;
  int size;
} Hashmap;

Node *node_init(const char *key, char **val) {
  Node *n = malloc(sizeof(Node));
  n->key = malloc(strlen(key) * sizeof(char));
  strcpy(n->key, key);
  n->lr = val;
  n->next = NULL;
  return n;
}

int node_add(Node *n, const char *str, char **val) {
  if (!strcmp(n->key, str)) {
    n->lr = val;
    return 0;
  }
  if (n->next)
    return node_add(n->next, str, val);
  else
    n->next = node_init(str, val);
  return 1;
}

Node *node_get(Node *n, const char *str) {
  if (!strcmp(n->key, str))
    return n;
  else
    return node_get(n, str);
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
  for (int i = 0; i < BUCKET_SIZE; i++) {
    h->bucket[i] = NULL;
  }
  h->size = 0;
  return h;
}

Node *hashmap_getorcreate(Hashmap *hashmap, const char *str) {
  int idx = hash(str) % BUCKET_SIZE;
  Node *n = hashmap->bucket[idx];
  if (n == NULL) {
    n = node_init(str, 0);
    hashmap->bucket[idx] = n;
    hashmap->size++;
  }

  return n;
}

Node *hashmap_get(Hashmap *hashmap, const char *str) {
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

void hashmap_add(Hashmap *hashmap, const char *str, char **val) {
  hashmap->size += node_add(hashmap_getorcreate(hashmap, str), str, val);
}

void hashmap_delete(Hashmap *hashmap) {
  Node *n, *m;
  for (int i = 0; i < BUCKET_SIZE; i++) {
    n = hashmap->bucket[i];
    if (n != NULL) {
      free(n->key);
      free(n->lr[0]);
      free(n->lr[1]);
      free(n->lr);
      m = n->next;
      free(n);
      n = m;
    }
  }
  free(hashmap->bucket);
  free(hashmap);
}

long long int gcd(const long long int a, const long long int b) {
  return !b ? a : gcd(b, a % b);
}

long long int lcm(const long long int a, const long long int b) {
  return (a * b) / gcd(a, b);
}

void parseInput(const char *restrict input, int **instructions, Hashmap **hashmap,
                int *len) {
  int i, sz;
  char **sides = strsplit(input, "\n", &sz);

  *len = strlen(sides[0]);
  *instructions = malloc(*len * sizeof(int *));
  for (i = 0; i < *len; i++)
    (*instructions)[i] = sides[0][i] == 'L' ? 0 : 1;

  *hashmap = hashmap_init();
  for (i = 1; i < sz; i++) {
    int m;
    char **n = strsplit(sides[i], "=", &m);
    strreplacec(n[1], '(', ' ');
    strreplacec(n[1], ')', ' ');
    char **s = strsplit(n[1], ", ", &m);
    n[0][3] = '\0';
    hashmap_add(*hashmap, n[0], s);

    free(n[1]);
    free(n);
    free(sides[i]);
  }
  free(sides[0]);
  free(sides);
}

char *part1(const char *restrict input) {
  int len;
  int *instructions;
  Hashmap *hashmap;

  parseInput(input, &instructions, &hashmap, &len);

  long long it = 0;
  char *nav = malloc(4 * sizeof(char));
  strcpy(nav, "AAA");
  while (true) {
    Node *map = hashmap_get(hashmap, nav);
    nav = strcpy(nav, map->lr[instructions[it % len]]);
    it++;
    if (!strcmp(nav, "ZZZ"))
      break;
  }

  free(nav);
  hashmap_delete(hashmap);

  return numtostr(it);
}

char *part2(const char *restrict input) {
  int i, x, len, sz;
  char **sides = strsplit(input, "\n", &sz);

  len = strlen(sides[0]);
  int *instructions = malloc(len * sizeof(int));
  for (i = 0; i < len; i++)
    instructions[i] = sides[0][i] == 'L' ? 0 : 1;

  Hashmap *hashmap = hashmap_init();
  char **navs = malloc(6 * sizeof(char *));
  long long *dists = malloc(6 * sizeof(long long));
  for (i = 1, x = 0; i < sz; i++) {
    int m;
    char **n = strsplit(sides[i], "=", &m);
    strreplacec(n[1], '(', ' ');
    strreplacec(n[1], ')', ' ');
    char **s = strsplit(n[1], ", ", &m);
    n[0][3] = '\0';
    hashmap_add(hashmap, n[0], s);
    if (n[0][2] == 'A') {
      navs[x] = malloc(strlen(n[0]) * sizeof(char));
      strcpy(navs[x], n[0]);
      dists[x] = 0;
      x++;
    }

    free(n[1]);
    free(n);
    free(sides[i]);
  }
  free(sides[0]);
  free(sides);

  for (i = 0; i < x; i++) {
    long long j = 0;
    while (true) {
      Node *map = hashmap_get(hashmap, navs[i]);
      strcpy(navs[i], map->lr[instructions[j % len]]);
      j++;
      if (navs[i][2] == 'Z')
        break;
    }
    dists[i] = j;
  }

  hashmap_delete(hashmap);

  long long res = 1;
  for (i = 0; i < x; i++) {
    res = lcm(res, dists[i]);
    free(navs[i]);
  }
  free(dists);
  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
