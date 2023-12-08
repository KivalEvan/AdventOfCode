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

typedef struct Node {
  char key[3];
  char **lr;
  struct Node *next;
} Node;

typedef struct Hashmap {
  Node *bucket[BUCKET_SIZE];
  size_t size;
} Hashmap;

Node *node_init(const char *key, char **val) {
  Node *n = malloc(sizeof(Node));
  strcpy(n->key, key);
  n->lr = val;
  n->next = NULL;
  return n;
}

size_t node_add(Node *n, const char *str, char **val) {
  if (!strcmp(n->key, str))
    n->lr = val;
    return 0;
  if (n->next)
    return node_add(n->next, str, val);
  else
    n->next = node_init(str, val);
  return 1;
}

// djb2 hash, source: http://www.cse.yorku.ca/~oz/hash.html
size_t hash(const char *str) {
  size_t hash = 5381;
  int c;

  while ((c = *str++))
    hash = ((hash << 5) + hash) + c;

  return hash;
}

Hashmap *hashmap_init(void) {
  Hashmap *h = malloc(sizeof(Hashmap));
  h->size = 0;
  return h;
}

Node *hashmap_getorcreate(Hashmap *hashmap, const char *str) {
  int idx = hash(str) % BUCKET_SIZE;
  Node *n = hashmap->bucket[idx];
  if (!n) {
    n = node_init(str, 0);
    hashmap->bucket[idx] = n;
    hashmap->size++;
  }

  return n;
}

void hashmap_add(Hashmap *hashmap, const char *str, char **val) {
  hashmap->size += node_add(hashmap_getorcreate(hashmap, str), str, val);
}

long gcd(long a, long b) { return !b ? a : gcd(b, a % b); }

long lcm(long a, long b) { return (a * b) / gcd(a, b); }

char *part1(char *input) {
  int i, len, sz;
  char **sides = strsplit(input, "\n", &sz);

  len = strlen(sides[0]);
  int *instructions = malloc(len * sizeof(int));
  for (i = 0; i < len; i++)
    instructions[i] = sides[0][i] == 'L' ? 0 : 1;

  Hashmap *hashmap = hashmap_init();
  for (i = 1; i < sz; i++) {
    int m;
    char **n = strsplit(sides[i], "=", &m);
    strreplacec(n[1], '(', ' ');
    strreplacec(n[1], ')', ' ');
    char **s = strsplit(n[1], ", ", &m);
    hashmap_add(hashmap, strtrim(n[0]), s);

    free(n[1]);
    free(n);
    free(sides[i]);
  }
  free(sides[0]);
  free(sides);

  long long it = 0;
  char *nav = "AAA";
  while (true) {
    Node *map = hashmap_getorcreate(hashmap, nav);
    // printf("%s %d %s %lld\n", map->key, instructions[it % len], map->lr[instructions[it % len]], it);
    nav = map->lr[instructions[it % len]];
    printf("%s %lld %c\n", nav, it, instructions[it % len] ? 'R' : 'L');
    it++;
    if (!strcmp(nav, "ZZZ"))
      break;
  }

  return numtostr(it);
}

char *part2(char *input) { return numtostr(0); }

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
