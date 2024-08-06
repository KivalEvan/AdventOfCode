#ifndef UTILS_ARY_H_
#define UTILS_ARY_H_
#include <stdint.h>
#include <stdlib.h>

int32_t ary_i32sum(const int32_t *restrict array, const size_t sz);
uint32_t ary_ui32sum(const uint32_t *restrict array, const size_t sz);
int64_t ary_i64sum(const int64_t *restrict array, const size_t sz);
uint64_t ary_ui64sum(const uint64_t *restrict array, const size_t sz);
float ary_fsum(const float *restrict array, const size_t sz);
double ary_dsum(const double *restrict array, const size_t sz);
#define ary_sum(ary, sz)                                                       \
   _Generic((ary),                                                             \
       int32_t *: ary_i32sum,                                                  \
       uint32_t *: ary_ui32sum,                                                \
       int64_t *: ary_i64sum,                                                  \
       uint64_t *: ary_ui64sum,                                                \
       float *: ary_fsum,                                                      \
       double *: ary_dsum)(ary, sz)

int32_t ary_i32mul(const int32_t *restrict array, const size_t sz);
uint32_t ary_ui32mul(const uint32_t *restrict array, const size_t sz);
int64_t ary_i64mul(const int64_t *restrict array, const size_t sz);
uint64_t ary_ui64mul(const uint64_t *restrict array, const size_t sz);
float ary_fmul(const float *restrict array, const size_t sz);
double ary_dmul(const double *restrict array, const size_t sz);
#define ary_mul(ary, sz)                                                       \
   _Generic((ary),                                                             \
       int32_t *: ary_i32mul,                                                  \
       uint32_t *: ary_ui32mul,                                                \
       int64_t *: ary_i64mul,                                                  \
       uint64_t *: ary_ui64mul,                                                \
       float *: ary_fmul,                                                      \
       double *: ary_dmul)(ary, sz)

int32_t ary_i32min(const int32_t *restrict array, const size_t sz);
uint32_t ary_ui32min(const uint32_t *restrict array, const size_t sz);
int64_t ary_i64min(const int64_t *restrict array, const size_t sz);
uint64_t ary_ui64min(const uint64_t *restrict array, const size_t sz);
float ary_fmin(const float *restrict array, const size_t sz);
double ary_dmin(const double *restrict array, const size_t sz);
#define ary_min(ary, sz)                                                       \
   _Generic((ary),                                                             \
       int32_t *: ary_i32min,                                                  \
       uint32_t *: ary_ui32min,                                                \
       int64_t *: ary_i64min,                                                  \
       float *: ary_fmin,                                                      \
       double *: ary_dmin)(ary, sz)

int32_t ary_i32max(const int32_t *restrict array, const size_t sz);
uint32_t ary_ui32max(const uint32_t *restrict array, const size_t sz);
int64_t ary_i64max(const int64_t *restrict array, const size_t sz);
uint64_t ary_ui64max(const uint64_t *restrict array, const size_t sz);
float ary_fmax(const float *restrict array, const size_t sz);
double ary_dmax(const double *restrict array, const size_t sz);
#define ary_max(ary, sz)                                                       \
   _Generic((ary),                                                             \
       int32_t *: ary_i32max,                                                  \
       uint32_t *: ary_ui32max,                                                \
       int64_t *: ary_i64max,                                                  \
       uint64_t *: ary_ui64max,                                                \
       float *: ary_fmax,                                                      \
       double *: ary_dmax)(ary, sz)

#endif
