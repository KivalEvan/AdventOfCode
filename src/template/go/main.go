package main

import (
	core "advent/of/go/src/langs/go"
	"os"
)

func main() {
	options := core.SolutionOptions{
		HasAlternate: false,
		HasIo:        false,
	}
	core.Run(os.Args, part1, part2, options)
}

func solve(input string, p2 bool) string {
	return ""
}

func part1(input string, isTest bool) string {
	return solve(input, false)
}

func part2(input string, isTest bool) string {
	return solve(input, true)
}
