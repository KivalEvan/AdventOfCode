# [Advent of Code](https://adventofcode.com/)

My incomplete collection of solutions for AoC for all years using multiple languages. Done for learning purposes because fun.

## Languages, Runner & Compiler

This is also the order of priority that I will solve the problem with:

-  TypeScript 5.2.2 with Deno 1.38.3 for `.ts`
-  Java 21 for `.java`
-  Python 3.11.6 for `.py`
-  C# 12 with .NET 6.0.416 for `.cs`
-  C17 with Clang 16.0.6 for `.c`
-  Rust 1.74.0 for `.rust`
-  Go 1.21.4 for `.go`

No parallelism or concurrency will be done, IO is not included in measuring performance, having to deal with `\r` is pain and should be separated. Output must always return string.

To make challenges for myself, I can only use standard library provided by the language/compiler.

## Input & Answers

The input is not included in the repository. You should use `fetchInput.ts` to fetch the input from source, it will be saved as `input.txt` in respective `year/day` folder. Grab cookie when logged in AoC through developer tool and paste it in `.env`.

`answers.txt` consist of 4 lines in order, `test1`, `part1`, `test2`, and `part2`. Answers may be different for each part per individuals. Answers are stored in string and should be converted if necessary. Any output will be converted to string and compared to test value, this will not be counted towards performance. Empty line are considered null value and won't be tested. Be aware of answers with multiple lines. Unfortunately, you may need to manually paste these into answers file.

## Utils & Others

Redundant code that gets reused such as get input and generic run are placed in `utils/<lang>` respectively.
Getting input must always return string, the main code in day should handle the parsing.
For consistency reason, the function process and output must be identical whenever possible.
`path` must be absolute towards `year/day/lang` as it has to traverse back to obtain the input.

Utility for runner and such, I just use Deno because I'm a pleb.
Will try `bash` when I feel like it.

## Progress

✅ = Completed

### 2023

| Day | TypeScript | Java | Python | C#  | C   | Rust | Go  |
| --- | ---------- | ---- | ------ | --- | --- | ---- | --- |
| 1   | ✅         | ✅   |        |     | ✅  |      |     |
| 2   | ✅         | ✅   |        |     | ✅  |      |     |
| 3   | ✅         | ✅   |        |     | ✅  |      |     |
| 4   | ✅         | ✅   |        |     | ✅  |      |     |
| 5   |            |      |        |     |     |      |     |
| 6   |            |      |        |     |     |      |     |
| 7   |            |      |        |     |     |      |     |
| 8   |            |      |        |     |     |      |     |
| 9   |            |      |        |     |     |      |     |
| 10  |            |      |        |     |     |      |     |
| 11  |            |      |        |     |     |      |     |
| 12  |            |      |        |     |     |      |     |
| 13  |            |      |        |     |     |      |     |
| 14  |            |      |        |     |     |      |     |
| 15  |            |      |        |     |     |      |     |
| 16  |            |      |        |     |     |      |     |
| 17  |            |      |        |     |     |      |     |
| 18  |            |      |        |     |     |      |     |
| 19  |            |      |        |     |     |      |     |
| 20  |            |      |        |     |     |      |     |
| 21  |            |      |        |     |     |      |     |
| 22  |            |      |        |     |     |      |     |
| 23  |            |      |        |     |     |      |     |
| 24  |            |      |        |     |     |      |     |
| 25  |            |      |        |     |     |      |     |
