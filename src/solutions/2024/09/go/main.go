package main

import (
	core "advent/of/go/src/langs/go"
	"os"
	"strconv"
)

func main() {
	options := core.SolutionOptions{
		HasAlternate: false,
		HasIo:        false,
	}
	core.Run(os.Args, part1, part2, options)
}

type Disk struct {
	size  uint64
	free  uint64
	moved uint64
	space []uint64
}

func solve(input string, p2 bool) string {
	disks := make([]Disk, 0)
	for i, k := range input {
		if i%2 == 1 {
			continue
		}
		if i+1 == len(input) {
			disks = append(disks, Disk{size: uint64(k - '0'), free: 0, space: []uint64{}, moved: 0})
		} else {
			disks = append(disks, Disk{size: uint64(k - '0'), free: uint64(input[i+1] - '0'), space: []uint64{}, moved: 0})
		}
	}

	left := uint64(0)
	right := uint64(len(disks) - 1)
	firstPos := uint64(0)
	if p2 {
		for left < right {
			if disks[left].free >= disks[right].size {
				for i := uint64(0); i < disks[right].size; i++ {
					disks[left].space = append(disks[left].space, right)
				}
				disks[left].free -= disks[right].size
				disks[right].moved += disks[right].size
				disks[right].size = 0
				left = firstPos
				right--
			} else {
				left++
			}

			if disks[firstPos].free == 0 {
				firstPos = left
			}

			if left == right {
				left = firstPos
				right--
			}
		}
	} else {
		for left < right {
			if disks[left].free > 0 && disks[right].size > 0 {
				disks[left].space = append(disks[left].space, right)
				disks[left].free--
				disks[right].size--
			}

			if disks[right].size == 0 {
				right--
			}
			if disks[left].free == 0 {
				left++
			}
		}
	}

	total := uint64(0)
	pos := uint64(0)
	for i := uint64(0); i < uint64(len(disks)); i++ {
		pos += disks[i].moved
		for j := uint64(0); j < disks[i].size; j++ {
			total += i * pos
			pos++
		}
		for j := 0; j < len(disks[i].space); j++ {
			total += disks[i].space[j] * pos
			pos++
		}
		pos += disks[i].free
	}

	return strconv.FormatUint(total, 10)
}

func part1(input string, isTest bool) string {
	return solve(input, false)
}

func part2(input string, isTest bool) string {
	return solve(input, true)
}
