#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

char *num_i8tostr(const int8_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%d", n);
   return str;
}
char *num_ui8tostr(const uint8_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%u", n);
   return str;
}
char *num_i16tostr(const int16_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%d", n);
   return str;
}
char *num_ui16tostr(const uint16_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%u", n);
   return str;
}
char *num_i32tostr(const int32_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%d", n);
   return str;
}
char *num_ui32tostr(const uint32_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%u", n);
   return str;
}
char *num_i64tostr(const int64_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%ld", n);
   return str;
}
char *num_ui64tostr(const uint64_t n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%ld", n);
   return str;
}
char *num_ftostr(const float n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%f", n);
   return str;
}
char *num_dtostr(const double n) {
   char *str = malloc(42 * sizeof(char));
   sprintf(str, "%lf", n);
   return str;
}
