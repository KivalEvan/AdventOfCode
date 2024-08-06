#ifndef UTILS_NUM_H_
#define UTILS_NUM_H_
#include <stdint.h>

#define num_min(a, b)                                                          \
   ({                                                                          \
      typeof(a) _a = (a);                                                      \
      typeof(b) _b = (b);                                                      \
      _a < _b ? _a : _b;                                                       \
   })

#define num_max(a, b)                                                          \
   ({                                                                          \
      typeof(a) _a = (a);                                                      \
      typeof(b) _b = (b);                                                      \
      _a > _b ? _a : _b;                                                       \
   })

char *num_i8tostr(const int8_t n);
char *num_ui8tostr(const uint8_t n);
char *num_i16tostr(const int16_t n);
char *num_ui16tostr(const uint16_t n);
char *num_i32tostr(const int32_t n);
char *num_ui32tostr(const uint32_t n);
char *num_i64tostr(const int64_t n);
char *num_ui64tostr(const uint64_t n);
char *num_ftostr(const float n);
char *num_dtostr(const double n);
#define num_tostr(n)                                                           \
   _Generic((n),                                                               \
       int8_t: num_i8tostr,                                                    \
       uint8_t: num_ui8tostr,                                                  \
       int16_t: num_i16tostr,                                                  \
       uint16_t: num_ui16tostr,                                                \
       int32_t: num_i32tostr,                                                  \
       uint32_t: num_ui32tostr,                                                \
       int64_t: num_i64tostr,                                                  \
       uint64_t: num_ui64tostr,                                                \
       float: num_ftostr,                                                      \
       double: num_dtostr,                                                     \
       default: num_dtostr)(n)

#endif
