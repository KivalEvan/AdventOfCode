YEAR = $(shell date '+%Y')
DAY = $(shell date '+%d')
AOC_PATH = $(YEAR)/$(DAY)
BENCH = 
ARGS = 

SRC_DIR = src
OBJ_DIR = obj
TEMP_DIR = temp

SRCS = $(wildcard $(SRC_DIR)/c/*.c)
OBJS = $(patsubst $(SRC_DIR)/c/%.c, $(TEMP_DIR)/%.o, $(SRCS))
HDRS = $(wildcard $(SRC_DIR)/c/includes/*.h)

CC = clang
CFLAGS = -std=c17 \
             -Weverything -Wall -Wextra -Werror -Wpointer-arith -Wcast-qual \
             -Wno-missing-braces -Wempty-body -Wno-error=uninitialized \
             -Wno-error=deprecated-declarations \
             -pedantic-errors -pedantic \
             -O3 -I $(SRC_DIR)/c/includes/
LDFLAGS = -Wall -pedantic -I $(SRC_DIR)/c/includes/

all:
	@echo -e "You must specify which to run:"
	@echo "make <language> YEAR=<current_year_by_default> DAY=<current_day_by_default> BENCH=<any_input_to_bench>"
	@echo ""
	@echo "Languages available: ts, c, java"

c: $(OBJS) $(TEMP_DIR)
	$(CC) $(LDFLAGS) -c $(AOC_PATH)/c/main.c -o $(TEMP_DIR)/main.o
	$(CC) $(CFLAGS) $(OBJS) $(TEMP_DIR)/main.o -lm -o $(TEMP_DIR)/aoc_c
	temp/aoc_c $(AOC_PATH) $(BENCH) $(ARGS)

$(TEMP_DIR)/%.o: $(SRC_DIR)/c/%.c $(SRC_DIR)/c/includes/%.h $(TEMP_DIR)
	$(CC) $(LDFLAGS) -c $< -o $@

$(TEMP_DIR):
	mkdir -p $@

java:
	@javac --enable-preview --release 21 -d $(TEMP_DIR) -cp $(TEMP_DIR)\; \
		$(UTILS_DIR)/java/Input.java \
		$(UTILS_DIR)/java/Run.java \
		$(AOC_PATH)/java/Main.java
	java --enable-preview -cp $(TEMP_DIR) kival/aoc/Main $(AOC_PATH) $(BENCH) $(ARGS)

ts: $(AOC_PATH)/ts/main.ts
	@deno run --allow-read=. --allow-hrtime $(AOC_PATH)/ts/main.ts

.PHONY: clean
clean:
	rm -r temp/*

format:
	find $(SRC_DIR)/c/*.c | xargs clang-format -i
	find $(SRC_DIR)/c/includes/*.h | xargs clang-format -i
	deno fmt
