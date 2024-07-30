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

func parseInput(input string) [][]int64 {
	lines := strings.Split(input[strings.Index(input, ":")+1:], "|")
	ary := make([][]int64, 0)
	for i := 0; i < len(lines); i++ {
		line := lines[i]
		t := strings.Split(line, " ")

		ary2 := make([]int64, 0)
		for _, s := range t {
			if len(s) > 0 {
				v, _ := strconv.ParseInt(s, 10, 64)
				ary2 = append(ary2, v)
			}
		}
		ary = append(ary, ary2)
	}
	return ary
}

func contains(s []int64, e int64) bool {
	for _, a := range s {
		if a == e {
			return true
		}
	}
	return false
}

func part1(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	res := 0.0
	for i := 0; i < len(lines); i++ {
		nums := parseInput(lines[i])
		j := -1.0
		for i := 0; i < len(nums[0]); i++ {
			if contains(nums[1], nums[0][i]) {
				j++
			}
		}
		if j != -1 {
			res += math.Pow(2, j)
		}
	}
	return strconv.Itoa(int(res))
}

func part2(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	instances := make([]int, len(lines))
	for i := range instances {
		instances[i] = 1
	}
	res := 0

	for idx, line := range lines {
		nums := parseInput(line)
		j := 0
		for i := 0; i < len(nums[0]); i++ {
			if contains(nums[1], nums[0][i]) {
				j++
			}
		}
		for j > 0 {
			instances[idx+j] += instances[idx]
			j--
		}
	}

	for i := 0; i < len(instances); i++ {
		res += instances[i]
	}

	return strconv.Itoa(res)
}
