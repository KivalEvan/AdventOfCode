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

func ohnomath(b float64, c float64) int64 {
	pepsilon := 0.001
	min := math.Floor((b+math.Sqrt(b*b-4*c))/2 - pepsilon)
	max := math.Ceil((b-math.Sqrt(b*b-4*c))/2 + pepsilon)
	return int64(min - max + 1)
}

func part1(input string, isTest bool) string {
	var td [2][]float64 = [2][]float64{}
	for i, line := range strings.Split(input, "\n") {
		ary := make([]float64, 0)
		for _, v := range strings.Split(strings.Split(line, ":")[1], " ") {
			if len(v) == 0 {
				continue
			}
			val, _ := strconv.ParseFloat(v, 64)
			ary = append(ary, val)
		}
		td[i] = ary
	}

	var res int64 = 1
	for i := 0; i < len(td[0]); i++ {
		res *= ohnomath(td[0][i], td[1][i])
	}

	return strconv.FormatInt(res, 10)
}

func part2(input string, isTest bool) string {
	var td [2]float64
	for i, line := range strings.Split(input, "\n") {
		val, _ := strconv.ParseFloat(strings.Join(strings.Split(strings.Split(line, ":")[1], " "), ""), 64)
		td[i] = val
	}

	return strconv.FormatInt(ohnomath(td[0], td[1]), 10)
}
