package main

import (
	core "advent/of/go/src/langs/go"
	"os"
	"strconv"
	"strings"
)

func gcd(a int64, b int64) int64 {
	if b == 0 {
		return a
	}
	return gcd(b, a%b)
}

func lcm(a int64, b int64) int64 {
	return (a * b) / gcd(a, b)
}

func main() {
	options := core.SolutionOptions{
		HasAlternate: false,
		HasIo:        false,
	}
	core.Run(os.Args, part1, part2, options)
}

func part1(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	instructions := []byte{}
	for _, c := range lines[0] {
		if c == 'L' {
			instructions = append(instructions, 0)
		} else {
			instructions = append(instructions, 1)
		}
	}

	maps := make(map[string][]string)
	for _, line := range lines[2:] {
		chunks := strings.Split(line, " = ")
		dest := chunks[0]
		lr := chunks[1][1 : len(chunks[1])-1]
		maps[dest] = strings.Split(lr, ", ")
	}

	i := 0
	nav := "AAA"
	for {
		m := maps[nav]
		nav = m[instructions[i%len(instructions)]]
		i++
		if nav == "ZZZ" {
			break
		}
	}
	return strconv.Itoa(i)
}

func part2(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	instructions := []byte{}
	for _, c := range lines[0] {
		if c == 'L' {
			instructions = append(instructions, 0)
		} else {
			instructions = append(instructions, 1)
		}
	}

	maps := make(map[string][]string)
	navs := make([]string, 0)
	for _, line := range lines[2:] {
		chunks := strings.Split(line, " = ")
		dest := chunks[0]
		lr := chunks[1][1 : len(chunks[1])-1]
		maps[dest] = strings.Split(lr, ", ")
		if dest[2] == 'A' {
			navs = append(navs, dest)
		}
	}

	res := int64(1)
	for i := 0; i < len(navs); i++ {
		j := 0
		for {
			m := maps[navs[i]]
			navs[i] = m[instructions[j%len(instructions)]]
			j += 1
			if navs[i][2] == 'Z' {
				break
			}
		}
		res = lcm(res, int64(j))
	}

	return strconv.FormatInt(res, 10)
}
