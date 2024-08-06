#ifndef UTILS_HASHMAP_H_
#define UTILS_HASHMAP_H_
#include <stdlib.h>

struct Node {
   char *key;
   void *data;
   struct Node *next;
};

struct Hashmap {
   size_t size;
   struct Node **elements;
   void (*cleanup)(void *);
};

struct Hashmap *hashmap_create(size_t size, void(cleanupfn)(void *));
void hashmap_destroy(struct Hashmap *hm);
struct Node *hashmap_get(const struct Hashmap *hm, const char *restrict key);
void hashmap_set(const struct Hashmap *hm, const char *restrict key,
                 void *data);
void hashmap_remove(const struct Hashmap *hm, const char *restrict key);

#endif
