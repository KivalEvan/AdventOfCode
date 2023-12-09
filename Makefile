YEAR = $(shell date '+%Y')
DAY = $(shell date '+%d')
AOC_PATH = $(shell pwd)/$(YEAR)/$(DAY)
ARGS = 

CC = clang
CCFLAGS = -std=c17 \
             -Weverything -Wall -Wextra -Werror -Wpointer-arith -Wcast-qual \
             -Wno-missing-braces -Wempty-body -Wno-error=uninitialized \
             -Wno-error=deprecated-declarations \
             -pedantic-errors -pedantic \
             -O3

LD = clang -o
LDFLAGS = -Wall -pedantic

compile:
	mkdir -p temp
	$(LD) $(LDFLAGS) -c utils/c/helper.c -o temp/helper.o
	$(LD) $(LDFLAGS) -c utils/c/input.c -o temp/input.o
	$(LD) $(LDFLAGS) -c utils/c/bench.c -o temp/bench.o
	$(LD) $(LDFLAGS) -c utils/c/run.c -o temp/run.o
	$(LD) $(LDFLAGS) -c -I./utils/c -I./template/c $(AOC_PATH)/c/main.c -o temp/main.o
	$(CC) $(CCFLAGS) temp/main.o temp/run.o temp/bench.o temp/input.o temp/helper.o -lm -o temp/aoc_c

c: compile
	@temp/aoc_c $(AOC_PATH) $(ARGS)

java:
	@javac --enable-preview --release 21 -d temp -cp temp\; \
		utils/java/Input.java \
		utils/java/Run.java \
		$(AOC_PATH)/java/Main.java
	@java --enable-preview -cp temp kival/aoc/Main $(AOC_PATH) $(ARGS)

clean:
	rm -rf ./bin
	rm -rf ./obj
	rm -rf ./temp
