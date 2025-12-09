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

func solve(input string, isTest bool, p2 bool) string {
	total := int64(0)
	len := strings.IndexByte(input, '\n')
	buffer := make([]int64, 141)
	buffer[strings.IndexByte(input, 'S')] = 1

	for i, c := range input {
		x := i % (len + 1)
		if c != '^' {
			continue
		}
		if buffer[x] > 0 {
			total++
		}
		buffer[x-1] += buffer[x]
		buffer[x+1] += buffer[x]
		buffer[x] = 0
	}

	if p2 {
		total = 0
		for _, v := range buffer {
			total += v
		}
	}

	return strconv.FormatInt(total, 10)
}

func part1(input string, isTest bool) string {
	return solve(input, isTest, false)
}

func part2(input string, isTest bool) string {
	return solve(input, isTest, true)
}
