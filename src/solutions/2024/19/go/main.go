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

func recurse(design string, patterns []string, memo map[string]int) (ways int) {
	if ways, ok := memo[design]; ok {
		return ways
	}
	defer func() { memo[design] = ways }()

	if design == "" {
		return 1
	}

	for _, pattern := range patterns {
		if strings.HasPrefix(design, pattern) {
			ways += recurse(design[len(pattern):], patterns, memo)
		}
	}

	return ways
}

func solve(input string, p2 bool) string {
	lines := strings.Split(input, "\n\n")
	patterns := strings.Split(lines[0], ", ")

	memo := map[string]int{}
	total := 0
	for _, design := range strings.Split(lines[1], "\n") {
		combinations := recurse(design, patterns, memo)
		if combinations > 0 {
			if p2 {
				total += combinations
			} else {
				total++
			}
		}
	}

	return strconv.FormatInt(int64(total), 10)
}

func part1(input string, isTest bool) string {
	return solve(input, false)
}

func part2(input string, isTest bool) string {
	return solve(input, true)
}
