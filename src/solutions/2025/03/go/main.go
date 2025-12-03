package main

import (
	core "advent/of/go/src/langs/go"
	"math"
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

func solve(input string, isTest bool, p2 bool) string {
	res := int64(0)
	for _, line := range strings.Split(input, "\n") {
		start := 0
		max := 2
		if p2 {
			max = 12
		}
		for digit := 0; digit < max; digit++ {
			marked := 0
			n := int64(0)
			t := max - 1 - digit
			l := len(line) - t
			for it := start; it < l; it++ {
				parsed := int64(line[it] - '0')
				if n < parsed {
					marked = it
					n = parsed
				}
			}
			start = marked + 1
			res += n * int64(math.Pow(float64(10), float64(t)))
		}
	}
	return strconv.FormatInt(res, 10)
}

func part1(input string, isTest bool) string {
	return solve(input, isTest, false)
}

func part2(input string, isTest bool) string {
	return solve(input, isTest, true)
}
