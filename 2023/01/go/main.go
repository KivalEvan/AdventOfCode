package main

import (
	core "advent/of/go/src/go"
	"os"
	"strconv"
	"strings"
)

func main() {
	options := core.SolutionOptions{
		HasAlternate: true,
		HasIo:        false,
	}
	core.Run(os.Args, part1, part2, options)
}

func isNum(c byte) bool {
	return c >= '0' && c <= '9'
}

func getNum(str string) byte {
	if isNum(str[0]) {
		return str[0]
	}
	if strings.HasPrefix(str, "zero") {
		return '0'
	}
	if strings.HasPrefix(str, "one") {
		return '1'
	}
	if strings.HasPrefix(str, "two") {
		return '2'
	}
	if strings.HasPrefix(str, "three") {
		return '3'
	}
	if strings.HasPrefix(str, "four") {
		return '4'
	}
	if strings.HasPrefix(str, "five") {
		return '5'
	}
	if strings.HasPrefix(str, "six") {
		return '6'
	}
	if strings.HasPrefix(str, "seven") {
		return '7'
	}
	if strings.HasPrefix(str, "eight") {
		return '8'
	}
	if strings.HasPrefix(str, "nine") {
		return '9'
	}
	return ' '
}

func part1(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	res := 0

	for i := 0; i < len(lines); i++ {
		var first byte
		var last byte

		for j := 0; j < len(lines[i]); j++ {
			if isNum(lines[i][j]) {
				first = lines[i][j]
				break
			}
		}
		for j := len(lines[i]) - 1; j >= 0; j-- {
			if isNum(lines[i][j]) {
				last = lines[i][j]
				break
			}
		}

		num := strings.Join([]string{string(first), string(last)}, "")
		n, _ := strconv.Atoi(num)
		res += n
	}

	return strconv.FormatInt(int64(res), 10)
}

func part2(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	res := 0

	for i := 0; i < len(lines); i++ {
		var first byte
		var last byte

		for j := 0; j < len(lines[i]); j++ {
			c := getNum(lines[i][j:])
			if c != ' ' {
				first = c
				break
			}
		}
		for j := len(lines[i]) - 1; j >= 0; j-- {
			c := getNum(lines[i][j:])
			if c != ' ' {
				last = c
				break
			}
		}

		num := strings.Join([]string{string(first), string(last)}, "")
		n, _ := strconv.Atoi(num)
		res += n
	}

	return strconv.FormatInt(int64(res), 10)
}
