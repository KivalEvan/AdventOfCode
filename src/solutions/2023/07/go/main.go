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

var ranking = map[byte]int{
	'A': 13,
	'K': 12,
	'Q': 11,
	'J': 10,
	'T': 9,
	'9': 8,
	'8': 7,
	'7': 6,
	'6': 5,
	'5': 4,
	'4': 3,
	'3': 2,
	'2': 1,
	'1': 0,
}

const (
	highCard int = iota
	onePair
	twoPair
	threeOfAKind
	fullHouse
	fourOfAKind
	fiveOfAKind
)

type pair struct {
	card  string
	value int
}

func sortCard(a pair, b pair) int {
	for i := 0; i < 5; i++ {
		if a.card[i] != b.card[i] {
			return ranking[a.card[i]] - ranking[b.card[i]]
		}
	}
	return 0
}

func filterzero(values [14]int) []int {
	var newAry []int

	for i := 0; i < 14; i++ {
		if values[i] != 0 {
			newAry = append(newAry, values[i])
		}
	}

	return newAry
}

func indexOf(values [14]int, value int) int {
	for i := 0; i < 14; i++ {
		if values[i] == value {
			return i
		}
	}
	return -1
}

func maxAry(values [14]int) int {
	max := values[0]
	for _, v := range values {
		if v > max {
			max = v
		}
	}
	return max
}

func getType(str string) int {
	var values [14]int
	for i := range str {
		values[ranking[str[i]]]++
	}
	if values[0] > 0 {
		var temp = values[0]
		values[0] = 0
		var idx = indexOf(values, maxAry(values))
		values[idx] += temp
	}

	newValues := filterzero(values)
	if len(newValues) == 1 {
		return fiveOfAKind
	}
	if len(newValues) == 4 {
		return onePair
	}
	if len(newValues) == 5 {
		return highCard
	}

	mn := 5
	mx := 0
	for _, v := range newValues {
		if mn > v {
			mn = v
		}
		if mx < v {
			mx = v
		}
	}
	if mn == 1 {
		if mx == 2 {
			return twoPair
		}
		if mx == 3 {
			return threeOfAKind
		}
		if mx == 4 {
			return fourOfAKind
		}
	}
	return fullHouse
}

func parseInput(input string, joker bool) [7][]pair {
	var groups [7][]pair

	for _, line := range strings.Split(input, "\n") {
		var temp []string = strings.Split(line, " ")
		if joker {
			temp[0] = strings.ReplaceAll(temp[0], "J", "1")
		}
		val, _ := strconv.ParseInt(temp[1], 10, 32)
		p := pair{temp[0], int(val)}
		t := getType(temp[0])
		groups[t] = append(groups[t], p)
	}

	return groups
}

func solve(input string, joker bool) string {
	groups := parseInput(input, joker)
	res := 0
	i := 1
	for _, group := range groups {
		sort.Slice(group, func(i, j int) bool {
			return sortCard(group[i], group[j]) < 0
		})
		for _, pair := range group {
			res += pair.value * i
			i++
		}
	}
	return strconv.Itoa(res)
}

func part1(input string, isTest bool) string {
	return solve(input, false)
}

func part2(input string, isTest bool) string {
	return solve(input, true)
}
