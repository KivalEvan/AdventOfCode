#include "main.h"
#include "helper.h"
#include "run.h"
#include <ctype.h>
#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const bool HAS_ALTERNATE = false;

typedef struct hands {
  char *cards;
  int values;
} Hands;

int getRank(char c) {
  switch (c) {
  case 'A':
    return 13;
  case 'K':
    return 12;
  case 'Q':
    return 11;
  case 'J':
    return 10;
  case 'T':
    return 9;
  case '9':
    return 8;
  case '8':
    return 7;
  case '7':
    return 6;
  case '6':
    return 5;
  case '5':
    return 4;
  case '4':
    return 3;
  case '3':
    return 2;
  case '2':
    return 1;
  case '1':
    return 0;
  default:
    return -1;
  }
}

int card_comparator(const void *v1, const void *v2) {
  const Hands *p1, *p2;
  p1 = *(const Hands **)v1;
  p2 = *(const Hands **)v2;
  for (int i = 0; i < 5; i++)
    if (p1->cards[i] != p2->cards[i])
      return getRank(p1->cards[i]) - getRank(p2->cards[i]);
  return 0;
}

int getType(char *str) {
  int *values = malloc(14 * sizeof(int)), i;
  for (i = 0; i < 14; i++)
    values[i] = 0;

  for (i = 0; i < 5; i++)
    values[getRank(str[i])]++;

  if (values[0]) {
    int temp = values[0];
    values[0] = 0;
    int idx = 0, max = 0;
    for (i = 0; i < 14; i++) {
      if (values[i] > max) {
        max = values[i];
        idx = i;
      }
    }
    values[idx] += temp;
  }

  int min = 5, max = 0, sz = 0;
  for (i = 0; i < 14; i++) {
    if (values[i] > 0) {
      sz++;
      if (min > values[i])
        min = values[i];
    }
    if (max < values[i])
      max = values[i];
  }
  free(values);

  if (sz == 1)
    return 6;
  if (sz == 4)
    return 1;
  if (sz == 5)
    return 0;
  if (min == 1) {
    if (max == 2)
      return 2;
    if (max == 3)
      return 3;
    if (max == 4)
      return 5;
  }
  return 4;
}

char *part1(char *input) {
  int sz, i, j, k = 0, res = 0;
  char **splt = strsplit(input, "\n", &sz);
  Hands ***groups = malloc(7 * sizeof(Hands **));
  int *group_sz = malloc(7 * sizeof(int));
  for (i = 0; i < 7; i++) {
    groups[i] = malloc(sz * sizeof(Hands *));
    group_sz[i] = 0;
  }

  for (i = 0; i < sz; i++) {
    int temp_sz;
    char **temp = strsplit(splt[i], " ", &temp_sz);
    Hands *hands = malloc(sizeof(Hands));
    hands->cards = malloc(strlen(temp[0]) * sizeof(char));
    strcpy(hands->cards, temp[0]);
    hands->values = atoi(temp[1]);

    int type = getType(hands->cards);
    groups[type][group_sz[type]++] = hands;

    free(temp[0]);
    free(temp[1]);
    free(temp);
    free(splt[i]);
  }
  free(splt);

  for (i = 0; i < 7; i++) {
    qsort(groups[i], group_sz[i], sizeof(Hands *), card_comparator);
    for (j = 0; j < group_sz[i]; j++) {
      res += groups[i][j]->values * ++k;
      free(groups[i][j]->cards);
      free(groups[i][j]);
    }
    free(groups[i]);
  }
  free(groups);
  free(group_sz);

  return numtostr(res);
}

char *part2(char *input) {
  int sz, i, j, k = 0, res = 0;
  char **splt = strsplit(input, "\n", &sz);
  Hands ***groups = malloc(7 * sizeof(Hands **));
  int *group_sz = malloc(7 * sizeof(int));
  for (i = 0; i < 7; i++) {
    groups[i] = malloc(sz * sizeof(Hands *));
    group_sz[i] = 0;
  }

  for (i = 0; i < sz; i++) {
    int temp_sz;
    char **temp = strsplit(splt[i], " ", &temp_sz);
    Hands *hands = malloc(sizeof(Hands));
    hands->cards = malloc(strlen(temp[0]) * sizeof(char));
    strreplacec(temp[0], 'J', '1');
    strcpy(hands->cards, temp[0]);
    hands->values = atoi(temp[1]);

    int type = getType(hands->cards);
    groups[type][group_sz[type]++] = hands;

    free(temp[0]);
    free(temp[1]);
    free(temp);
    free(splt[i]);
  }
  free(splt);

  for (i = 0; i < 7; i++) {
    qsort(groups[i], group_sz[i], sizeof(Hands *), card_comparator);
    for (j = 0; j < group_sz[i]; j++) {
      res += groups[i][j]->values * ++k;
      free(groups[i][j]->cards);
      free(groups[i][j]);
    }
    free(groups[i]);
  }
  free(groups);
  free(group_sz);

  return numtostr(res);
}

int main(int argc, char *argv[]) {
  return run(argc, argv, part1, part2, HAS_ALTERNATE);
}
