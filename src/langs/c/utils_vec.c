#include "utils_vec.h"

static void vec_resize(struct Vector *vec) {
   size_t new_size = pow(2, ceil(log2(vec->size)) + 1);
   vec->elements = realloc(vec->elements, new_size * sizeof(void *));
   vec->size = new_size;
}

struct Vector *vec_create(size_t size, void(cleanupfn)(void *)) {
   struct Vector *vec = malloc(sizeof(*vec));
   if (!size)
      size = 1;
   size = pow(2, ceil(log2(size)));
   vec->length = 0;
   vec->size = size;
   if (cleanupfn)
      vec->cleanup = cleanupfn;
   else
      vec->cleanup = free;

   vec->elements = malloc(vec->size * sizeof(void *));
   return vec;
}

void vec_destroy(struct Vector *vec) {
   for (size_t i = 0; i < vec->length; i++)
      vec->cleanup(vec->elements[i]);
   free(vec->elements);
   free(vec);
}

void vec_push(struct Vector *vec, void *data) {
   if (vec->length == vec->size)
      vec_resize(vec);
   vec->elements[vec->length++] = data;
}

void *vec_get(const struct Vector *vec, const size_t idx) {
   if (idx >= vec->length)
      return NULL;
   return vec->elements[idx];
}

void *vec_pop(struct Vector *vec) {
   void *item = vec->elements[vec->length - 1];
   vec->length--;
   return item;
}
