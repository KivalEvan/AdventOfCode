#include "main.h"
#include "run.h"
#include "utils_num.h"
#include "utils_str.h"
#include <stdlib.h>
#include <string.h>

static const int32_t HAS_IO = 0;
static const int32_t HAS_ALTERNATE = 0;

struct hands {
   char cards[6];
   int32_t values;
};

static int32_t get_rank(const char c) {
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

static int32_t card_comparator(const void *v1, const void *v2) {
   size_t i;
   const struct hands *p1, *p2;
   p1 = *(const struct hands **)v1;
   p2 = *(const struct hands **)v2;
   for (i = 0; i < 5; i++)
      if (p1->cards[i] != p2->cards[i])
         return get_rank(p1->cards[i]) - get_rank(p2->cards[i]);
   return 0;
}

static int32_t get_type(const char *restrict str) {
   size_t i, j;
   int32_t *values, temp, min, max, sz;
   values = malloc(14 * sizeof(*values));
   for (i = 0; i < 14; i++)
      values[i] = 0;

   for (i = 0; i < 5; i++)
      values[get_rank(str[i])]++;

   if (values[0]) {
      temp = values[0];
      values[0] = 0;
      j = 0;
      max = 0;
      for (i = 0; i < 14; i++) {
         if (values[i] > max) {
            max = values[i];
            j = i;
         }
      }
      values[j] += temp;
   }

   min = 5;
   max = 0;
   sz = 0;
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

static void parse_input(const char *restrict input, struct hands ****groups,
                        size_t **groupsSz, const int32_t joker) {
   size_t linesSz, tempSz, i;
   int32_t type;
   struct hands *hands;
   char **lines, **temp;

   lines = str_splitc(input, '\n', &linesSz);
   *groups = malloc(7 * sizeof(***groups));
   *groupsSz = malloc(7 * sizeof(*groupsSz));
   for (i = 0; i < 7; i++) {
      (*groups)[i] = malloc(linesSz * sizeof(**groups));
      (*groupsSz)[i] = 0;
   }

   for (i = 0; i < linesSz; i++) {
      temp = str_splitc(lines[i], ' ', &tempSz);
      hands = malloc(sizeof(*hands));
      if (joker)
         str_replacec(temp[0], 'J', '1');
      strcpy(hands->cards, temp[0]);
      hands->values = atoi(temp[1]);

      type = get_type(hands->cards);
      (*groups)[type][(*groupsSz)[type]++] = hands;

      free(temp[0]);
      free(temp[1]);
      free(temp);
      free(lines[i]);
   }
   free(lines);
}

static char *solve(const char *restrict input, int32_t joker) {
   size_t i, j, *groupsSz;
   struct hands ***groups;
   int32_t res, k;
   parse_input(input, &groups, &groupsSz, joker);

   res = k = 0;
   for (i = 0; i < 7; i++) {
      qsort(groups[i], groupsSz[i], sizeof(**groups), card_comparator);
      for (j = 0; j < groupsSz[i]; j++) {
         res += groups[i][j]->values * ++k;
         free(groups[i][j]);
      }
      free(groups[i]);
   }
   free(groups);
   free(groupsSz);

   return num_tostr(res);
}

static char *part1(const char *restrict input, const int32_t isTest) {
   return solve(input, 0);
}

static char *part2(const char *restrict input, const int32_t isTest) {
   return solve(input, 1);
}

int main(int argc, char *argv[]) {
   return run(argc, argv, part1, part2, HAS_ALTERNATE, HAS_IO);
}
