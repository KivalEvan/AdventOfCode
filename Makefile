compile:
	clang -c utils/c/helper.c -o temp/helper.o
	clang -c utils/c/input.c -o temp/input.o
	clang -c utils/c/run.c -o temp/run.o
	clang -c -I./utils/c -I./template/c 2023/01/c/main.c -o temp/main.o

execute: compile
	clang temp/main.o temp/run.o temp/input.o temp/helper.o -lm -o temp/aoc_c
	@rm temp/main.o temp/run.o temp/input.o temp/helper.o
	@temp/aoc_c $(shell pwd)/2023/01/c