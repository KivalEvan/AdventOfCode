# [Advent of Code](https://adventofcode.com/)

My incomplete collection of solutions for AoC for all years using multiple languages. Done for
learning purposes because fun and pain.

## Languages, Runner & Compiler

This is also the order of priority that I will solve the problem with, ~~totally not because of job
market~~:

- TypeScript 5.5.2 with Deno 1.45.5 for `.ts`
- Python 3.10.14 with PyPy 7.3.16 for `.py`
- Rust 1.79.0 for `.rust`
- Go 1.22.5 for `.go`
- C# 12 with .NET 8.0.107 for `.cs`
- C23 with Clang 18.1.8 for `.c`
- Zig 0.13 for `.zig`
- Lua 5.4.7 with LuaJIT 2.1 for `.lua`
- Java 22 for `.java`
- OCaml 5.2.0 for `.ml`

Parallelism/concurrency are allowed only in solution implementation. Result must always convert to
and return string. The performance metric is evaluated only on IO read and function call and does
not include program execution/start time.

To make challenges for myself, I can only use standard library provided by the language/compiler and
write my own library for use in AoC or related coding challenges.

## Input & Answers

The input is not included in the repository. You should use `fetchInput.ts` to fetch the input from
source, it will be saved as `input.txt` in respective `year/day` folder. Grab cookie when logged in
AoC through developer tool and paste it in `.env`.

`answers.txt` consist of 4 lines in order, `test1`, `part1`, `test2`, and `part2`. Answers are
stored in string, any result must be converted to string for proper comparison. Empty line are
considered null value and will not test the result. Certain answers may not be presented as the
actual answer involve multiple lines or require certain interpretation that cannot be represented in
string.

## Utils & Others

Certain algorithms, types and functions may be found in `src/<lang>`. As there may not be any
third-party library, plenty of works are done by me (with a bit of online code yoinking) and used
only for coding challenges. Feel free to snoop around and yoink.

Redundant code that gets reused such as helpers are placed in `src/<lang>` respective to language.
The input reading can be implemented or use provided generic read all text if not specified. For
consistency reason, `args` processing, the function callback timer and console output must be
identical whenever possible.

Utility for runner and such, I just use Deno because I'm a pleb and Makefile because I'm a chad.
Will try `bash` when I feel like it.

## Progress

☑️ = Partial

✅ = Completed

### 2023

| Day | TypeScript | Python | Rust | Go | C# | C  | Zig | Lua | Java | OCaml |
| --- | ---------- | ------ | ---- | -- | -- | -- | --- | --- | ---- | ----- |
| 1   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 2   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 3   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 4   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 5   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 6   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 7   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 8   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 9   | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  | ✅   | ✅    |
| 10  | ✅         | ✅     | ✅   | ✅ | ✅ | ✅ | ✅  | ✅  |      |       |
| 11  | ✅         |        |      |    |    | ✅ |     |     |      |       |
| 12  | ✅         |        |      |    |    | ☑️  |     |     |      |       |
| 13  | ✅         |        |      |    |    |    |     |     |      |       |
| 14  | ✅         |        |      |    |    | ☑️  |     |     |      |       |
| 15  | ✅         |        |      |    |    |    |     |     |      |       |
| 16  | ✅         |        |      |    |    |    |     |     |      |       |
| 17  | ✅         |        |      |    |    |    |     |     |      |       |
| 18  | ✅         |        |      |    |    |    |     |     |      |       |
| 19  | ✅         |        |      |    |    |    |     |     |      |       |
| 20  | ☑️          |        |      |    |    |    |     |     |      |       |
| 21  | ☑️          |        |      |    |    |    |     |     |      |       |
| 22  | ✅         |        |      |    |    |    |     |     |      |       |
| 23  | ✅         |        |      |    |    |    |     |     |      |       |
| 24  | ✅         |        |      |    |    |    |     |     |      |       |
| 25  | ☑️          |        |      |    |    |    |     |     |      |       |

## Note

While this should result me in more knowledge in wider range of language, it also gave me brain
damage.
