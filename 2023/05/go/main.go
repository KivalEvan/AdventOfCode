package main

import (
	core "advent/of/go/src/go"
	"errors"
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

type rRange struct {
	Source      rMinMax
	Destination rMinMax
}

type rMinMax struct {
	Min int64
	Max int64
}

func parseInput(input string, single bool) ([]rMinMax, [][]rRange) {
	parsed := strings.Split(input, "\n\n")
	var header []int64
	for _, v := range strings.Split(strings.Split(parsed[0], ":")[1], " ") {
		if len(v) > 0 {
			val, _ := strconv.ParseInt(v, 10, 64)
			header = append(header, val)
		}
	}
	var seedRanges []rMinMax
	if single {
		for _, v := range header {
			seedRanges = append(seedRanges, rMinMax{Min: v, Max: v})
		}
	} else {
		for i := 0; i < len(header); i += 2 {
			seedRanges = append(seedRanges, rMinMax{Min: header[i], Max: header[i] + header[i+1]})
		}
	}

	var srcToDestRanges [][]rRange
	for _, v := range parsed[1:] {
		var tr []rRange
		for _, w := range strings.Split(v, "\n")[1:] {
			var r rRange
			x := strings.Split(w, " ")

			dest, _ := strconv.ParseInt(x[0], 10, 64)
			src, _ := strconv.ParseInt(x[1], 10, 64)
			inc, _ := strconv.ParseInt(x[2], 10, 64)

			r.Source = rMinMax{Min: src, Max: src + inc - 1}
			r.Destination = rMinMax{Min: dest, Max: dest + inc - 1}

			tr = append(tr, r)
		}
		srcToDestRanges = append(srcToDestRanges, tr)
	}

	return seedRanges, srcToDestRanges
}

func find(groups []rRange, r rMinMax) (rRange, error) {
	for _, g := range groups {
		if g.Source.Min <= r.Min &&
			r.Min <= g.Source.Max &&
			r.Max >= g.Source.Min &&
			g.Source.Max >= r.Max {
			return g, nil
		}
	}
	return rRange{}, errors.New("not found")
}

func solve(input string, single bool) string {
	seedRanges, srcToDestRanges := parseInput(input, single)

	for _, groups := range srcToDestRanges {
		for _, g := range groups {
			newSeeds := []rMinMax{}
			for i := 0; i < len(seedRanges); i++ {
				r := &seedRanges[i]
				if r.Min < g.Source.Min && g.Source.Min < r.Max {
					newSeeds = append(newSeeds, rMinMax{Min: r.Min, Max: g.Source.Min - 1})
					r.Min = g.Source.Min
				}
				if r.Min < g.Source.Max && g.Source.Max < r.Max {
					newSeeds = append(newSeeds, rMinMax{Min: g.Source.Max + 1, Max: r.Max})
					r.Max = g.Source.Max
				}
			}
			seedRanges = append(newSeeds, seedRanges...)
		}
		for i := 0; i < len(seedRanges); i++ {
			r := &seedRanges[i]
			found, err := find(groups, *r)
			if err != nil {
				continue
			}
			diff := found.Destination.Min - found.Source.Min
			r.Min += diff
			r.Max += diff
		}
	}

	var res int64 = math.MaxInt64
	for _, r := range seedRanges {
		if res > r.Min {
			res = r.Min
		}
	}
	return strconv.FormatInt(res, 10)
}

func part1(input string, isTest bool) string {
	return solve(input, true)
}

func part2(input string, isTest bool) string {
	return solve(input, false)
}
