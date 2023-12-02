YEAR = $(shell date '+%Y')
DAY = $(shell date '+%d')
ARGS = $(shell pwd)/$(YEAR)/$(DAY)/c

CC = clang
CCFLAGS = -std=c17 \
             -Weverything -Wall -Wextra -Werror -Wpointer-arith -Wcast-qual \
             -Wno-missing-braces -Wempty-body -Wno-error=uninitialized \
             -Wno-error=deprecated-declarations \
             -pedantic-errors -pedantic \
             -Os

LD = clang -o
LDFLAGS = -Wall -pedantic

compile:
	$(LD) $(LDFLAGS) -c utils/c/helper.c -o temp/helper.o
	$(LD) $(LDFLAGS) -c utils/c/input.c -o temp/input.o
	$(LD) $(LDFLAGS) -c utils/c/run.c -o temp/run.o
	$(LD) $(LDFLAGS) -c -I./utils/c -I./template/c $(ARGS)/main.c -o temp/main.o

execute: compile
	$(CC) $(CCFLAGS) temp/main.o temp/run.o temp/input.o temp/helper.o -lm -o temp/aoc_c
	@rm temp/main.o temp/run.o temp/input.o temp/helper.o
	@temp/aoc_c $(ARGS)