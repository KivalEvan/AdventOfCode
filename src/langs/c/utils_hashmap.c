#include "utils_hashmap.h"
#include <stdlib.h>
#include <string.h>

static size_t hashmap_hash(const char *restrict str) {
   size_t hash = 5381;
   size_t c;
   while ((c = *str++))
      hash = ((hash << 5) + hash) + c;
   return hash;
}

static size_t hashmap_index(const struct Hashmap *hm, const char *key) {
   size_t result = (hashmap_hash(key) % hm->size);
   return result;
}

struct Hashmap *hashmap_create(size_t size, void(cleanupfn)(void *)) {
   struct Hashmap *hm = malloc(sizeof(*hm));
   hm->size = size;
   if (cleanupfn)
      hm->cleanup = cleanupfn;
   else
      hm->cleanup = free;

   hm->elements = calloc(sizeof(*hm->elements), hm->size);
   return hm;
}

void hashmap_destroy(struct Hashmap *hm) {
   size_t i;
   struct Node *tmp;
   for (i = 0; i < hm->size; i++) {
      while (hm->elements[i]) {
         tmp = hm->elements[i];
         hm->elements[i] = tmp->next;

         hm->cleanup(tmp->data);
         free(tmp->key);
         free(tmp);
      }
   }
   free(hm->elements);
   free(hm);
}

struct Node *hashmap_get(const struct Hashmap *hm, const char *restrict key) {
   size_t index;
   struct Node *tmp;

   index = hashmap_index(hm, key);
   tmp = hm->elements[index];
   while (tmp != NULL && strcmp(tmp->key, key) != 0)
      tmp = tmp->next;
   return tmp;
}

void hashmap_set(const struct Hashmap *hm, const char *restrict key,
                 void *data) {
   size_t index;
   struct Node *tmp, *n;
   n = hashmap_get(hm, key);
   if (n != NULL) {
      n->data = data;
      return;
   }

   tmp = malloc(sizeof(*tmp));
   tmp->key = malloc((strlen(key) + 1) * sizeof(*tmp->key));
   strcpy(tmp->key, key);
   tmp->data = data;

   index = hashmap_index(hm, key);
   n = hm->elements[index];
   hm->elements[index] = tmp;
   tmp->next = n;
}

void hashmap_remove(const struct Hashmap *hm, const char *restrict key) {
   size_t index = hashmap_index(hm, key);
   struct Node *tmp, *prev;

   tmp = hm->elements[index];
   prev = NULL;
   while (tmp != NULL && strcmp(tmp->key, key) != 0) {
      prev = tmp;
      tmp = tmp->next;
   }
   if (tmp == NULL)
      return;
   if (prev == NULL)
      hm->elements[index] = tmp->next;
   else
      prev->next = tmp->next;
   free(tmp);
}
