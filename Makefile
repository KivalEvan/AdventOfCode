compile:
	clang -c utils/c/split.c -o temp/split.o
	clang -c utils/c/input.c -o temp/input.o
	clang -c utils/c/run.c -o temp/run.o
	clang -c -I./utils/c 2023/01/c/main.c -o temp/main.o

execute: compile
	clang temp/main.o temp/run.o temp/input.o temp/split.o -lm -o temp/aoc_c
	@rm temp/main.o temp/run.o temp/input.o temp/split.o
	@temp/aoc_c $(shell pwd)/2023/01/c