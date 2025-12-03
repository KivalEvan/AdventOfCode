#include "utils_math.h"
#include <math.h>
#include <stdlib.h>

int8_t math_i8mod(const int8_t a, const int8_t b) {
   int8_t r = a % b;
   return r < 0 ? r + b : r;
}

int16_t math_i16mod(const int16_t a, const int16_t b) {
   int16_t r = a % b;
   return r < 0 ? r + b : r;
}

int32_t math_i32mod(const int32_t a, const int32_t b) {
   int32_t r = a % b;
   return r < 0 ? r + b : r;
}

int64_t math_i64mod(const int64_t a, const int64_t b) {
   int64_t r = a % b;
   return r < 0 ? r + b : r;
}

int32_t math_i32gcd(const int32_t a, const int32_t b) {
   return !b ? a : math_i32gcd(b, a % b);
}
uint32_t math_ui32gcd(const uint32_t a, const uint32_t b) {
   return !b ? a : math_ui32gcd(b, a % b);
}
int64_t math_i64gcd(const int64_t a, const int64_t b) {
   return !b ? a : math_i64gcd(b, a % b);
}
uint64_t math_ui64gcd(const uint64_t a, const uint64_t b) {
   return !b ? a : math_ui64gcd(b, a % b);
}
float math_fgcd(const float a, const float b) {
   return !b ? a : math_fgcd(b, fmodf(a, b));
}
double math_dgcd(const double a, const double b) {
   return !b ? a : math_dgcd(b, fmod(a, b));
}

int32_t math_i32lcm(const int32_t a, const int32_t b) {
   return (a * b) / math_i32gcd(a, b);
}
uint32_t math_ui32lcm(const uint32_t a, const uint32_t b) {
   return (a * b) / math_ui32gcd(a, b);
}
int64_t math_i64lcm(const int64_t a, const int64_t b) {
   return (a * b) / math_i64gcd(a, b);
}
uint64_t math_ui64lcm(const uint64_t a, const uint64_t b) {
   return (a * b) / math_ui64gcd(a, b);
}
float math_flcm(const float a, const float b) {
   return (a * b) / math_fgcd(a, b);
}
double math_dlcm(const double a, const double b) {
   return (a * b) / math_dgcd(a, b);
}
