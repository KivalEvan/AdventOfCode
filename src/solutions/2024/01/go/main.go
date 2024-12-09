package main

import (
	core "advent/of/go/src/langs/go"
	"os"
	"sort"
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

func solve(input string, p2 bool) string {

	l := []int64{}
	r := []int64{}
	hashmap := map[int64]int64{}
	for _, line := range strings.Split(input, "\n") {
		pair := strings.Split(line, "   ")
		k, _ := strconv.ParseInt(pair[0], 10, 64)
		v, _ := strconv.ParseInt(pair[1], 10, 64)
		l = append(l, k)
		r = append(r, v)
		if _, ok := hashmap[k]; !ok {
			hashmap[k] = 0
		}
		if _, ok := hashmap[v]; !ok {
			hashmap[v] = 0
		}
		hashmap[v]++
	}

	sum := int64(0)
	if p2 {
		for i := 0; i < len(l); i++ {
			sum += l[i] * hashmap[l[i]]
		}
	} else {
		sort.Slice(l, func(i, j int) bool {
			return l[i] < l[j]
		})
		sort.Slice(r, func(i, j int) bool {
			return r[i] < r[j]
		})
		for i := 0; i < len(l); i++ {
			val := l[i] - r[i]
			if val < 0 {
				sum += -val
			} else {
				sum += val
			}
		}
	}

	return strconv.FormatInt(sum, 10)
}

func part1(input string, isTest bool) string {
	return solve(input, false)
}

func part2(input string, isTest bool) string {
	return solve(input, true)
}
