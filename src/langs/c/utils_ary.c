#include "utils_ary.h"
#include "utils_num.h"
#include <stdio.h>
#include <stdlib.h>

int32_t ary_i32sum(const int32_t *restrict array, const size_t sz) {
   size_t i;
   int32_t sum = 0;
   for (i = 0; i < sz; i++)
      sum += array[i];
   return sum;
}
uint32_t ary_ui32sum(const uint32_t *restrict array, const size_t sz) {
   size_t i;
   uint32_t sum = 0;
   for (i = 0; i < sz; i++)
      sum += array[i];
   return sum;
}
int64_t ary_i64sum(const int64_t *restrict array, const size_t sz) {
   size_t i;
   int64_t sum = 0;
   for (i = 0; i < sz; i++)
      sum += array[i];
   return sum;
}
uint64_t ary_ui64sum(const uint64_t *restrict array, const size_t sz) {
   size_t i;
   uint64_t sum = 0;
   for (i = 0; i < sz; i++)
      sum += array[i];
   return sum;
}
float ary_fsum(const float *restrict array, const size_t sz) {
   size_t i;
   float sum = 0;
   for (i = 0; i < sz; i++)
      sum += array[i];
   return sum;
}
double ary_dsum(const double *restrict array, const size_t sz) {
   size_t i;
   double sum = 0;
   for (i = 0; i < sz; i++)
      sum += array[i];
   return sum;
}

int32_t ary_i32mul(const int32_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   int32_t mul = 1;
   for (i = 0; i < sz; i++)
      mul *= array[i];
   return mul;
}
uint32_t ary_ui32mul(const uint32_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   uint32_t mul = 1;
   for (i = 0; i < sz; i++)
      mul *= array[i];
   return mul;
}
int64_t ary_i64mul(const int64_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   int64_t mul = 1;
   for (i = 0; i < sz; i++)
      mul *= array[i];
   return mul;
}
uint64_t ary_ui64mul(const uint64_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   uint64_t mul = 1;
   for (i = 0; i < sz; i++)
      mul *= array[i];
   return mul;
}
float ary_fmul(const float *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   float mul = 1;
   for (i = 0; i < sz; i++)
      mul *= array[i];
   return mul;
}
double ary_dmul(const double *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   double mul = 1;
   for (i = 0; i < sz; i++)
      mul *= array[i];
   return mul;
}

int32_t ary_i32min(const int32_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   int32_t min = array[0];
   for (i = 1; i < sz; i++)
      min = num_min(min, array[i]);
   return min;
}
uint32_t ary_ui32min(const uint32_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   uint32_t min = array[0];
   for (i = 1; i < sz; i++)
      min = num_min(min, array[i]);
   return min;
}
int64_t ary_i64min(const int64_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   int64_t min = array[0];
   for (i = 1; i < sz; i++)
      min = num_min(min, array[i]);
   return min;
}
uint64_t ary_ui64min(const uint64_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   uint64_t min = array[0];
   for (i = 1; i < sz; i++)
      min = num_min(min, array[i]);
   return min;
}
float ary_fmin(const float *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   float min = array[0];
   for (i = 1; i < sz; i++)
      min = num_min(min, array[i]);
   return min;
}
double ary_dmin(const double *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   double min = array[0];
   for (i = 1; i < sz; i++)
      min = num_min(min, array[i]);
   return min;
}

int32_t ary_i32max(const int32_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   int32_t max = array[0];
   for (i = 1; i < sz; i++)
      max = num_max(max, array[i]);
   return max;
}
uint32_t ary_ui32max(const uint32_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   uint32_t max = array[0];
   for (i = 1; i < sz; i++)
      max = num_max(max, array[i]);
   return max;
}
int64_t ary_i64max(const int64_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   int64_t max = array[0];
   for (i = 1; i < sz; i++)
      max = num_max(max, array[i]);
   return max;
}
uint64_t ary_ui64max(const uint64_t *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   uint64_t max = array[0];
   for (i = 1; i < sz; i++)
      max = num_max(max, array[i]);
   return max;
}
float ary_fmax(const float *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   float max = array[0];
   for (i = 1; i < sz; i++)
      max = num_max(max, array[i]);
   return max;
}
double ary_dmax(const double *restrict array, const size_t sz) {
   size_t i;
   if (sz == 0)
      return 0;
   double max = array[0];
   for (i = 1; i < sz; i++)
      max = num_max(max, array[i]);
   return max;
}
