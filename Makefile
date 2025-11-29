YEAR = $(shell date '+%Y')
DAY = $(shell date '+%d')
AOC_PATH = ./src/solutions/$(YEAR)/$(DAY)
ITERATION = 1
ARGS = 
__ARGUMENTS = $(AOC_PATH) $(ITERATION) $(ARGS)

SRC_DIR = src/langs
OBJ_DIR = obj
TEMP_DIR = temp

PY_RUNTIME = pypy3
JS_RUNTIME = deno run --allow-read=.
# JS_RUNTIME = bun
LUA_RUNTIME = luajit
OCAML_RUNTIME = opam exec -- dune exec
MEMORY_USAGE_CMD = /usr/bin/time -f "Memory used (KB): %M\nElapsed (s): %e"

SRCS = $(wildcard $(SRC_DIR)/c/*.c)
OBJS = $(patsubst $(SRC_DIR)/c/%.c, $(TEMP_DIR)/%.o, $(SRCS))
HDRS = $(wildcard $(SRC_DIR)/c/includes/*.h)

CC = clang
# TODO: remove the -Wno-gnu-statement-expression-from-macro-expansion once C23 is supported as it officially supports typeof
CFLAGS = -std=c2x \
      	-Wall -Wextra -pedantic \
         -O2 -I $(SRC_DIR)/c/includes/
LDFLAGS = -std=c2x \
			 -Wall -Wextra -pedantic \
			 -Wno-language-extension-token -Wno-gnu-statement-expression-from-macro-expansion \
			 -Wno-unused-parameter \
			 -I $(SRC_DIR)/c/includes/

all:
	@echo -e "You must specify which to run:"
	@echo "make <language> YEAR=<current_year_by_default> DAY=<current_day_by_default> ITERATION=<any_input_to_bench>"
	@echo ""
	@echo "Languages available: ts, c, java"

c_compile: $(OBJS) $(TEMP_DIR)
	@$(CC) $(LDFLAGS) -c $(AOC_PATH)/c/main.c -o $(TEMP_DIR)/main.o
	@$(CC) $(CFLAGS) $(OBJS) $(TEMP_DIR)/main.o -lm -o $(TEMP_DIR)/aoc_c

c:
	@$(MEMORY_USAGE_CMD) temp/aoc_c $(__ARGUMENTS)

c_debug:
	@valgrind temp/aoc_c $(AOC_PATH) $(ARGS) > /dev/null

$(TEMP_DIR)/%.o: $(SRC_DIR)/c/%.c $(SRC_DIR)/c/includes/%.h $(TEMP_DIR)
	@$(CC) $(LDFLAGS) -c $< -o $@

$(TEMP_DIR):
	mkdir -p $@

# imagine "compiling" these with makefile lmao
java_compile: $(AOC_PATH)/java/Main.java
	@javac --enable-preview --release 25 -Xlint:unchecked -d $(TEMP_DIR) -cp $(TEMP_DIR)\; \
		$(SRC_DIR)/java/Input.java \
		$(SRC_DIR)/java/Options.java \
		$(SRC_DIR)/java/Runner.java \
		$(AOC_PATH)/java/Main.java

java:
	@$(MEMORY_USAGE_CMD) java --enable-preview -cp $(TEMP_DIR) kival/aoc/year${YEAR}/day${DAY}/Main $(__ARGUMENTS)

csharp_compile: $(AOC_PATH)/csharp/Main.cs
	@dotnet clean $(AOC_PATH)/csharp/Main.csproj --nologo -v=q
	@dotnet build $(AOC_PATH)/csharp/Main.csproj -v=q \
		--nologo \
		--no-incremental \
		--configuration Release \
		-o temp/csharp

csharp:
	@$(MEMORY_USAGE_CMD) temp/csharp/Main $(__ARGUMENTS)

go_compile: $(AOC_PATH)/go/main.go
	@go build -o $(TEMP_DIR)/aoc_go $(AOC_PATH)/go/main.go

go:
	@$(MEMORY_USAGE_CMD) $(TEMP_DIR)/aoc_go $(__ARGUMENTS)

rust_compile: $(AOC_PATH)/rust/main.rs
	@cargo build --package solution-$(YEAR)-$(DAY) -rq

rust:
	@$(MEMORY_USAGE_CMD) target/release/aoc_rs $(__ARGUMENTS)

lua: $(AOC_PATH)/lua/main.lua
	@$(MEMORY_USAGE_CMD) $(LUA_RUNTIME) $(AOC_PATH)/lua/main.lua $(__ARGUMENTS)

ts: $(AOC_PATH)/ts/main.ts
	@$(MEMORY_USAGE_CMD) $(JS_RUNTIME) $(AOC_PATH)/ts/main.ts $(__ARGUMENTS)

python: $(AOC_PATH)/python/main.py
	@$(MEMORY_USAGE_CMD) $(PY_RUNTIME) $(AOC_PATH)/python/main.py $(__ARGUMENTS)

ocaml: $(AOC_PATH)/ocaml/main.ml
	@$(MEMORY_USAGE_CMD) $(OCAML_RUNTIME) $(AOC_PATH)/ocaml/main.exe $(__ARGUMENTS)

zig_compile: $(AOC_PATH)/zig/main.zig
	@zig build -- $(AOC_PATH)/zig/main.zig

zig:
	@$(MEMORY_USAGE_CMD) zig-out/bin/aoc_zig $(__ARGUMENTS)

.PHONY: clean
clean:
	go mod tidy
	go clean
	dotnet clean --nologo
	cargo clean
	rm -rf ./.zig-cache
	rm -rf ./zig-out
	rm -rf ./target
	rm -rf ./_build
	rm -rf ./build
	rm -rf ./temp
	rm -rf ./bin
	rm -rf ./obj

format:
	find $(SRC_DIR)/c/*.c | xargs clang-format -i
	find $(SRC_DIR)/c/includes/*.h | xargs clang-format -i
	find $(SRC_DIR)/../solutions/*/*/c/*.c | xargs clang-format -i
	go fmt ./...
	dotnet format
	deno fmt
	find $(SRC_DIR)/python/*.py | xargs yapf -ip
	find $(SRC_DIR)/../solutions/*/*/python/*.py | xargs yapf -ip
	find $(SRC_DIR)/zig/*.zig | xargs zig fmt
	find $(SRC_DIR)/../solutions/*/*/zig/*.zig | xargs zig fmt
	opam exec -- dune fmt

version:
	@deno --version
	@pypy3 --version
	@rustc --version
	@go version
	dotnet --version
	@clang --version
	zig version
	@lua -v
	@luajit -v
	@java --version
	@ocaml --version
