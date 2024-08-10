#include "utils_deque.h"
#include <stdio.h>

static struct DequeItem *item_create(void *data) {
   struct DequeItem *item = malloc(sizeof(*item));
   item->data = data;
   item->next = NULL;
   item->prev = NULL;
   return item;
}

struct Deque *deque_create(size_t size, void(cleanupfn)(void *)) {
   struct Deque *deque = malloc(sizeof(*deque));
   deque->count = 0;
   deque->front = NULL;
   deque->back = NULL;
   if (cleanupfn)
      deque->cleanup = cleanupfn;
   else
      deque->cleanup = free;
   return deque;
}

void deque_destroy(struct Deque *deque) {
   struct DequeItem *item = deque->front;
   while (item) {
      struct DequeItem *tmp = item;
      item = item->next;
      deque->cleanup(tmp->data);
      free(tmp);
   }
   free(deque);
}

void deque_pushback(struct Deque *deque, void *data) {
   struct DequeItem *new_item = item_create(data);
   if (deque->count == 0) {
      deque->front = new_item;
      deque->back = new_item;
      deque->count++;
      return;
   }
   struct DequeItem *item = deque->back;
   item->prev = new_item;
   new_item->next = item;
   deque->back = new_item;
   deque->count++;
   return;
}

void deque_pushfront(struct Deque *deque, void *data) {
   struct DequeItem *new_item = item_create(data);
   if (deque->count == 0) {
      deque->front = new_item;
      deque->back = new_item;
      deque->count++;
      return;
   }
   struct DequeItem *item = deque->front;
   item->next = new_item;
   new_item->prev = item;
   deque->front = new_item;
   deque->count++;
   return;
}

void *deque_peekback(const struct Deque *deque) {
   if (deque->count == 0)
      return NULL;
   return deque->back->data;
}

void *deque_peekfront(const struct Deque *deque) {
   if (deque->count == 0)
      return NULL;
   return deque->front->data;
}

void *deque_popback(struct Deque *deque) {
   if (deque->count == 0)
      return NULL;
   struct DequeItem *item = deque->back;
   void *data = item->data;
   if (deque->count == 1) {
      deque->front = NULL;
      deque->back = NULL;
   } else {
      deque->back = item->next;
      deque->back->prev = NULL;
   }
   free(item);
   deque->count--;
   return data;
}

void *deque_popfront(struct Deque *deque) {
   if (deque->count == 0)
      return NULL;
   struct DequeItem *item = deque->front;
   void *data = item->data;
   if (deque->count == 1) {
      deque->front = NULL;
      deque->back = NULL;
   } else {
      deque->front = item->prev;
      deque->front->next = NULL;
   }
   free(item);
   deque->count--;
   return data;
}
