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

func difference(ary []int64, sz int) []int64 {
	for i := 0; i < sz; i++ {
		ary[i] = ary[i+1] - ary[i]
	}
	return ary
}

func extrapolate(ary []int64, sz int) int64 {
	sz--
	last := ary[sz]
	if sz == 0 {
		return last
	}
	return extrapolate(difference(ary, sz), sz) + last
}

func part1(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	var res int64 = 0
	for _, line := range lines {
		nums := make([]int64, 0)
		xdd := strings.Split(line, " ")

		for _, v := range xdd {
			val, _ := strconv.ParseInt(v, 10, 64)
			nums = append(nums, val)
		}

		res += extrapolate(nums, len(nums))
	}

	return strconv.FormatInt(res, 10)
}

func part2(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	var res int64 = 0
	for _, line := range lines {
		nums := make([]int64, 0)
		xdd := strings.Split(line, " ")

		for _, v := range xdd {
			val, _ := strconv.ParseInt(v, 10, 64)
			nums = append(nums, val)
		}

		for i, j := 0, len(nums)-1; i < j; i, j = i+1, j-1 {
			nums[i], nums[j] = nums[j], nums[i]
		}

		res += extrapolate(nums, len(nums))
	}

	return strconv.FormatInt(res, 10)
}
