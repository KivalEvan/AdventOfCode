# Advent of Code 2021

## Solution

My solution to Advent of Code 2021.

### Benchmark

|   Day   |   Part 1 |   Part 2 |     Total |
| :-----: | -------: | -------: | --------: |
|    1    |  0.183ms |  0.190ms |   0.374ms |
|    2    |  0.345ms |  0.348ms |   0.693ms |
|    3    |  0.248ms |  0.160ms |   0.408ms |
|    4    |  0.673ms |  1.653ms |   2.326ms |
|    5    | 35.480ms | 39.537ms |  75.017ms |
|    6    |  0.047ms |  0.046ms |   0.093ms |
|    7    | 21.614ms | 25.446ms |  47.060ms |
|    8    |  0.274ms |  2.091ms |   2.365ms |
|    9    |  0.369ms |  6.881ms |   7.249ms |
|   10    |  0.185ms |  0.338ms |   0.523ms |
|   11    |  0.481ms |  1.287ms |   1.768ms |
|   12    |      0ms |      0ms |       0ms |
|   13    |  5.019ms |  5.207ms |  10.226ms |
|   14    |      0ms |      0ms |       0ms |
|   15    |      0ms |      0ms |       0ms |
|   16    |      0ms |      0ms |       0ms |
|   17    |      0ms |      0ms |       0ms |
|   18    |      0ms |      0ms |       0ms |
|   19    |      0ms |      0ms |       0ms |
|   20    |      0ms |      0ms |       0ms |
|   21    |      0ms |      0ms |       0ms |
|   22    |      0ms |      0ms |       0ms |
|   23    |      0ms |      0ms |       0ms |
|   24    |      0ms |      0ms |       0ms |
|   25    |      0ms |      0ms |       0ms |
| Overall | 64.917ms | 83.186ms | 148.103ms |

#### Methodology

The benchmark is measured by mean of 100 run loop, with 100 run loop as warm-up, through all
excluding IO (typically takes around 2-4ms). Programmed using `TypeScript` ran via `Deno 1.16.3`
with flag `--allow-read --allow-write --allow-hrtime --watch`. Part 1 and part 2 is separated in the
runtime. CPU used is `Intel Core i9-9900K`. Single run typically result up to 1-16x duration
depending on the test.
