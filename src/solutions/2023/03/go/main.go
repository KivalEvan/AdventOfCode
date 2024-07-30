package main

import (
	core "advent/of/go/src/langs/go"
	"os"
	"strconv"
	"strings"
)

func main() {
	options := core.SolutionOptions{
		HasAlternate: false,
		HasIo:        false,
	}
	core.Run(os.Args, part1, part2, options)
}

func isSymbol(c byte) bool {
	return c == '*' ||
		c == '$' ||
		c == '=' ||
		c == '#' ||
		c == '%' ||
		c == '/' ||
		c == '&' ||
		c == '+' ||
		c == '-' ||
		c == '@'
}

func isNum(c byte) bool {
	return c >= '0' && c <= '9'
}

func yeetTheNumber(grid [][]byte, x int, y int) string {
	res := ""
	if isNum(grid[y][x]) {
		res += string(grid[y][x])
		grid[y][x] = '.'

		if x > 0 {
			res = yeetTheNumber(grid, x-1, y) + res
		}
		if x < len(grid[y])-1 {
			res += yeetTheNumber(grid, x+1, y)
		}
	}
	return res
}

func tryParseDefault(s string) int64 {
	if len(s) == 0 {
		return 0
	}
	res, _ := strconv.ParseInt(s, 10, 64)
	return res
}

func toGrid(input string) [][]byte {
	line := strings.Split(input, "\n")
	grid := make([][]byte, len(line))
	for i := 0; i < len(line); i++ {
		grid[i] = []byte(line[i])
	}
	return grid
}

func part1(input string, isTest bool) string {
	grid := toGrid(input)
	var res int64 = 0

	for y := 0; y < len(grid); y++ {
		for x := 0; x < len(grid[y]); x++ {
			if isSymbol(grid[y][x]) {
				if x > 0 {
					if y < len(grid)-1 {
						res += tryParseDefault(yeetTheNumber(grid, x-1, y+1))
					}
					if y > 0 {
						res += tryParseDefault(yeetTheNumber(grid, x-1, y-1))
					}
					res += tryParseDefault(yeetTheNumber(grid, x-1, y))
				}
				if x < len(grid[y])-1 {
					if y < len(grid)-1 {
						res += tryParseDefault(yeetTheNumber(grid, x+1, y+1))
					}
					if y > 0 {
						res += tryParseDefault(yeetTheNumber(grid, x+1, y-1))
					}
					res += tryParseDefault(yeetTheNumber(grid, x+1, y))
				}
				if y < len(grid)-1 {
					res += tryParseDefault(yeetTheNumber(grid, x, y+1))
				}
				if y > 0 {
					res += tryParseDefault(yeetTheNumber(grid, x, y-1))
				}
			}
		}
	}

	return strconv.FormatInt(res, 10)
}

func filter(ary []int64) []int64 {
	newAry := make([]int64, 0)

	for i := 0; i < len(ary); i++ {
		if ary[i] != 0 {
			newAry = append(newAry, ary[i])
		}
	}

	return newAry
}

func part2(input string, isTest bool) string {
	grid := toGrid(input)
	var res int64 = 0

	for y := 0; y < len(grid); y++ {
		for x := 0; x < len(grid[y]); x++ {
			if grid[y][x] == '*' {
				ary := []int64{0, 0, 0, 0, 0, 0, 0, 0}
				if x > 0 {
					if y < len(grid)-1 {
						ary[0] = tryParseDefault(yeetTheNumber(grid, x-1, y+1))
					}
					if y > 0 {
						ary[1] = tryParseDefault(yeetTheNumber(grid, x-1, y-1))
					}
					ary[2] = tryParseDefault(yeetTheNumber(grid, x-1, y))
				}
				if x < len(grid[y])-1 {
					if y < len(grid)-1 {
						ary[3] = tryParseDefault(yeetTheNumber(grid, x+1, y+1))
					}
					if y > 0 {
						ary[4] = tryParseDefault(yeetTheNumber(grid, x+1, y-1))
					}
					ary[5] = tryParseDefault(yeetTheNumber(grid, x+1, y))
				}
				if y < len(grid)-1 {
					ary[6] = tryParseDefault(yeetTheNumber(grid, x, y+1))
				}
				if y > 0 {
					ary[7] = tryParseDefault(yeetTheNumber(grid, x, y-1))
				}
				ary = filter(ary)
				if len(ary) == 2 {
					res += ary[0] * ary[1]
				}
			}
		}
	}

	return strconv.FormatInt(res, 10)
}
