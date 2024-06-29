package core

import (
	"bufio"
	"os"
	"strings"
)

type Answers struct {
	test1 string
	test2 string
	part1 string
	part2 string
}

// read text file and return the content
func GetInput(path string) string {
	f, _ := os.ReadFile(path)
	return strings.TrimRight(string(f), "\n")
}

func GetAnswers(path string) Answers {
	f, _ := os.Open(path)
	scanner := bufio.NewScanner(f)

	answers := Answers{}

	scanner.Scan()
	answers.test1 = scanner.Text()
	scanner.Scan()
	answers.part1 = scanner.Text()
	scanner.Scan()
	answers.test2 = scanner.Text()
	scanner.Scan()
	answers.part2 = scanner.Text()

	return answers
}
