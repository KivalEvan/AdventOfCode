#include <stdint.h>

#ifndef UTILS_MATH_H_
#define UTILS_MATH_H_

int32_t math_i32gcd(const int32_t a, const int32_t b);
uint32_t math_ui32gcd(const uint32_t a, const uint32_t b);
int64_t math_i64gcd(const int64_t a, const int64_t b);
uint64_t math_ui64gcd(const uint64_t a, const uint64_t b);
float math_fgcd(const float a, const float b);
double math_dgcd(const double a, const double b);
#define math_gcd(a, b)                                                         \
   _Generic((a),                                                               \
       int32_t: math_i32gcd,                                                   \
       uint32_t: math_ui32gcd,                                                 \
       int64_t: math_i64gcd,                                                   \
       uint64_t: math_ui64gcd,                                                 \
       float: math_fgcd,                                                       \
       double: math_dgcd,                                                      \
       default: math_dgcd)(a, b)

int32_t math_i32lcm(const int32_t a, const int32_t b);
uint32_t math_ui32lcm(const uint32_t a, const uint32_t b);
int64_t math_i64lcm(const int64_t a, const int64_t b);
uint64_t math_ui64lcm(const uint64_t a, const uint64_t b);
float math_flcm(const float a, const float b);
double math_dlcm(const double a, const double b);
#define math_lcm(a, b)                                                         \
   _Generic((a),                                                               \
       int32_t: math_i32lcm,                                                   \
       uint32_t: math_ui32lcm,                                                 \
       int64_t: math_i64lcm,                                                   \
       uint64_t: math_ui64lcm,                                                 \
       float: math_flcm,                                                       \
       double: math_dlcm,                                                      \
       default: math_dlcm)(a, b)

#endif
