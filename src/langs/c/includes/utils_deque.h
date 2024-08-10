#ifndef UTILS_DEQUE_H_
#define UTILS_DEQUE_H_
#include <stdlib.h>

struct DequeItem {
   void *data;
   struct DequeItem *next;
   struct DequeItem *prev;
};

struct Deque {
   struct DequeItem *front;
   struct DequeItem *back;
   size_t count;
   void (*cleanup)(void *);
};

struct Deque *deque_create(size_t size, void(cleanupfn)(void *));
void deque_destroy(struct Deque *deque);
void deque_pushback(struct Deque *deque, void *data);
void deque_pushfront(struct Deque *deque, void *data);
void *deque_peekback(const struct Deque *deque);
void *deque_peekfront(const struct Deque *deque);
void *deque_popback(struct Deque *deque);
void *deque_popfront(struct Deque *deque);

#endif
