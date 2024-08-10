#ifndef UTILS_VEC_H_
#define UTILS_VEC_H_
#include <math.h>
#include <stdlib.h>

struct Vector {
   size_t size;
   size_t length;
   void **elements;
   void (*cleanup)(void *);
};

struct Vector *vec_create(size_t size, void(cleanupfn)(void *));
void vec_destroy(struct Vector *vec);
void vec_push(struct Vector *vec, void *data);
void *vec_get(const struct Vector *vec, const size_t idx);
void *vec_pop(struct Vector *vec);

#endif
