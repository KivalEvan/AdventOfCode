YEAR = $(shell date '+%Y')
DAY = $(shell date '+%d')
AOC_PATH = $(shell pwd)/$(YEAR)/$(DAY)
ARGS = 

CC = clang
CFLAGS = -std=c17 \
             -Weverything -Wall -Wextra -Werror -Wpointer-arith -Wcast-qual \
             -Wno-missing-braces -Wempty-body -Wno-error=uninitialized \
             -Wno-error=deprecated-declarations \
             -pedantic-errors -pedantic \
             -O3
LDFLAGS = -Wall -pedantic
TEMP_DIR = $(shell pwd)/temp
UTILS_DIR = $(shell pwd)/utils
TEMPLATE_DIR = $(shell pwd)/template

compile:
	mkdir -p $(TEMP_DIR)
	$(CC) $(LDFLAGS) -c $(UTILS_DIR)/c/helper.c -o $(TEMP_DIR)/helper.o
	$(CC) $(LDFLAGS) -c $(UTILS_DIR)/c/input.c -o $(TEMP_DIR)/input.o
	$(CC) $(LDFLAGS) -c $(UTILS_DIR)/c/bench.c -o $(TEMP_DIR)/bench.o
	$(CC) $(LDFLAGS) -c $(UTILS_DIR)/c/run.c -o $(TEMP_DIR)/run.o
	$(CC) $(LDFLAGS) -c -I$(UTILS_DIR)/c -I$(TEMPLATE_DIR)/c $(AOC_PATH)/c/main.c -o $(TEMP_DIR)/main.o
	$(CC) $(CFLAGS) $(TEMP_DIR)/main.o $(TEMP_DIR)/run.o $(TEMP_DIR)/bench.o $(TEMP_DIR)/input.o $(TEMP_DIR)/helper.o -lm -o $(TEMP_DIR)/aoc_c

c: compile
	@temp/aoc_c $(AOC_PATH) $(ARGS)

java:
	@javac --enable-preview --release 21 -d $(TEMP_DIR) -cp $(TEMP_DIR)\; \
		$(UTILS_DIR)/java/Input.java \
		$(UTILS_DIR)/java/Run.java \
		$(AOC_PATH)/java/Main.java
	@java --enable-preview -cp $(TEMP_DIR) kival/aoc/Main $(AOC_PATH) $(ARGS)

.PHONY: clean
clean:
	rm $(shell pwd)/bin
	rm $(shell pwd)/obj
	rm $(shell pwd)/temp
