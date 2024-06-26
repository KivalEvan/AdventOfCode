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
# TODO: remove the -Wno-gnu-statement-expression-from-macro-expansion once C23 is supported as it officially supports typeof
CFLAGS = -std=c2x \
      	-Wall -Wextra -pedantic \
         -O3 -I $(SRC_DIR)/c/includes/
LDFLAGS = -std=c2x \
			 -Wall -Wextra -pedantic \
			 -Wno-language-extension-token -Wno-gnu-statement-expression-from-macro-expansion \
			 -Wno-unused-parameter \
			 -I $(SRC_DIR)/c/includes/

all:
	@echo -e "You must specify which to run:"
	@echo "make <language> YEAR=<current_year_by_default> DAY=<current_day_by_default> BENCH=<any_input_to_bench>"
	@echo ""
	@echo "Languages available: ts, c, java"

c: $(OBJS) $(TEMP_DIR)
	$(CC) $(LDFLAGS) -c $(AOC_PATH)/c/main.c -o $(TEMP_DIR)/main.o
	$(CC) $(CFLAGS) $(OBJS) $(TEMP_DIR)/main.o -lm -o $(TEMP_DIR)/aoc_c
	temp/aoc_c $(AOC_PATH) $(BENCH) $(ARGS)

c_debug:
	@valgrind temp/aoc_c $(AOC_PATH) $(ARGS) > /dev/null

$(TEMP_DIR)/%.o: $(SRC_DIR)/c/%.c $(SRC_DIR)/c/includes/%.h $(TEMP_DIR)
	$(CC) $(LDFLAGS) -c $< -o $@

$(TEMP_DIR):
	mkdir -p $@

# imagine "compiling" these with makefile lmao
java: $(AOC_PATH)/java/Main.java
	@javac --enable-preview --release 22 -d $(TEMP_DIR) -cp $(TEMP_DIR)\; \
		$(SRC_DIR)/java/Input.java \
		$(SRC_DIR)/java/Run.java \
		$(AOC_PATH)/java/Main.java
	java --enable-preview -cp $(TEMP_DIR) kival/aoc/Main $(AOC_PATH) $(BENCH) $(ARGS)

csharp: $(AOC_PATH)/csharp/Main.cs
	@dotnet clean aoc.csproj --nologo -v=q
	@dotnet build aoc.csproj -v=q \
		--nologo \
		--no-incremental \
		--configuration Release \
		-p:StartupObject=Year$(YEAR).Day$(DAY) \
		-o temp/csharp
	@temp/csharp/aoc $(AOC_PATH) $(BENCH) $(ARGS)

ts: $(AOC_PATH)/ts/main.ts
	@deno run --allow-read=. --allow-hrtime $(AOC_PATH)/ts/main.ts $(AOC_PATH) $(BENCH) $(ARGS)

python: $(AOC_PATH)/python/main.py
	@python3 $(AOC_PATH)/python/main.py $(AOC_PATH) $(BENCH) $(ARGS)

.PHONY: clean
clean:
	rm -rf ./temp
	rm -rf ./bin
	rm -rf ./obj

format:
	find $(SRC_DIR)/c/*.c | xargs clang-format -i
	find $(SRC_DIR)/c/includes/*.h | xargs clang-format -i
	deno fmt
