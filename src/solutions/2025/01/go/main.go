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

func mod(a, b int) int {
	res := a % b
	if res < 0 {
		return res + b
	}
	return res
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func solve(input string, p2 bool) string {
	dial := 50
	zero := 0
	for _, v := range strings.Split(input, "\n") {
		newDial, _ := strconv.Atoi(v[1:])
		if v[0] == 'L' {
			newDial *= -1
		}
		newDial = dial + newDial

		if p2 {
			zero += abs(newDial) / 100
			if dial != 0 && newDial <= 0 {
				zero += 1
			}
			dial = mod(newDial, 100)
		} else {
			dial = newDial
			if dial%100 == 0 {
				zero += 1
			}
		}
	}

	return strconv.Itoa(zero)
}

func part1(input string, isTest bool) string {
	return solve(input, false)
}

func part2(input string, isTest bool) string {
	return solve(input, true)
}
