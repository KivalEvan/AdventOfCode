package main

import (
	core "advent/of/go/src/go"
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

type xdd struct {
	value int64
	color int64
}

func parseInput(input string) [][]xdd {
	lines := strings.Split(input, "\n")
	var results [][]xdd = make([][]xdd, 0)
	for i := 0; i < len(lines); i++ {
		line := strings.Split(strings.ReplaceAll(strings.Split(lines[i], ":")[1], ",", ";"), ";")
		cubes := make([]xdd, 0)
		for j := 0; j < len(line); j++ {
			lmao := strings.Split(strings.Trim(line[j], " "), " ")
			val, _ := strconv.ParseInt(lmao[0], 10, 64)
			col := int64(lmao[1][0]) % 3
			cubes = append(cubes, xdd{
				value: val,
				color: col,
			})
		}
		results = append(results, cubes)
	}
	return results
}

var rgb_p1 = [3]int64{12, 13, 14}

func part1(input string, isTest bool) string {
	parsed := parseInput(input)
	res := 0

	for i := 0; i < len(parsed); i++ {
		cubes := parsed[i]
		found := false
		for j := 0; j < len(cubes); j++ {
			cube := cubes[j]
			if cube.value > rgb_p1[cube.color] {
				found = true
			}
		}
		if !found {
			res += i + 1
		}
	}

	return strconv.Itoa(res)
}

func part2(input string, isTest bool) string {
	parsed := parseInput(input)
	var res int64 = 0

	for i := 0; i < len(parsed); i++ {
		cubes := parsed[i]
		rgb := [3]int64{0, 0, 0}
		for j := 0; j < len(cubes); j++ {
			cube := cubes[j]
			if cube.value > rgb[cube.color] {
				rgb[cube.color] = cube.value
			}
		}
		res += rgb[0] * rgb[1] * rgb[2]
	}

	return strconv.FormatInt(res, 10)
}
