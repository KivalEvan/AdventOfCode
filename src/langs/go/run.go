package core

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

type ParameterFunction func(string, bool) string
type SolutionWrapper struct {
	tag       string
	fn        ParameterFunction
	path      string
	test      string
	iteration int
	options   SolutionOptions
	result    string
	elapsed   [2]int64
	bench     [3][3]float64
}

func printResult(solution SolutionWrapper) SolutionWrapper {
	if solution.iteration == 1 {
		fmt.Println("\n" + solution.tag + ": (ms) IO > Part > Overall")
		fmt.Println("Timer: " + strconv.FormatFloat(solution.bench[0][2], 'f', -1, 64) + " > " + strconv.FormatFloat(solution.bench[1][2], 'f', -1, 64) + " > " + strconv.FormatFloat(solution.bench[2][2], 'f', -1, 64))
	} else {
		fmt.Println("\n" + solution.tag + ": (ms) min..max avg")
		fmt.Println("IO: " + strconv.FormatFloat(solution.bench[0][0], 'f', -1, 64) + " .. " + strconv.FormatFloat(solution.bench[0][1], 'f', -1, 64) + " - " + strconv.FormatFloat(solution.bench[0][2], 'f', -1, 64))
		fmt.Println("Part: " + strconv.FormatFloat(solution.bench[1][0], 'f', -1, 64) + " .. " + strconv.FormatFloat(solution.bench[1][1], 'f', -1, 64) + " - " + strconv.FormatFloat(solution.bench[1][2], 'f', -1, 64))
		fmt.Println("Overall: " + strconv.FormatFloat(solution.bench[2][0], 'f', -1, 64) + " .. " + strconv.FormatFloat(solution.bench[2][1], 'f', -1, 64) + " - " + strconv.FormatFloat(solution.bench[2][2], 'f', -1, 64))
	}
	fmt.Println("Result: " + solution.result)

	return solution
}

func test(result string, expected string) {
	if expected == "" {
		return
	}
	if result != expected {
		println("Expected " + expected + " but received " + result)
		panic("Test failed")
	}
}

func timer(fn func() string) (string, int64) {
	start := time.Now()
	result := fn()
	end := time.Since(start)
	return result, end.Microseconds()
}

func execute(solution *SolutionWrapper) *SolutionWrapper {
	isTest := strings.HasPrefix(solution.tag, "Test")

	input, elapsedIo := timer(func() string {
		input := solution.path
		if !solution.options.HasIo {
			input = GetInput(solution.path)
		}
		return input
	})

	output, elapsedPart := timer(func() string { return solution.fn(input, isTest) })

	solution.result = output
	solution.elapsed = [2]int64{elapsedIo, elapsedPart}

	return solution
}

func perform(solution *SolutionWrapper) *SolutionWrapper {
	timesIo := make([]float64, solution.iteration)
	timesPart := make([]float64, solution.iteration)
	timesOverall := make([]float64, solution.iteration)

	for i := 0; i < solution.iteration/2; i++ {
		solution = execute(solution)
	}

	for i := 0; i < solution.iteration; i++ {
		solution = execute(solution)
		timesIo[i] = float64(solution.elapsed[0]) / 1000.0
		timesPart[i] = float64(solution.elapsed[1]) / 1000.0
		timesOverall[i] = float64(solution.elapsed[0]+solution.elapsed[1]) / 1000.0
	}

	mn := 0.0
	mx := 0.0
	avg := 0.0

	mn = minFloat(timesIo)
	mx = maxFloat(timesIo)
	avg = sumFloat(timesIo) / float64(solution.iteration)
	solution.bench[0] = [3]float64{mn, mx, avg}

	mn = minFloat(timesPart)
	mx = maxFloat(timesPart)
	avg = sumFloat(timesPart) / float64(solution.iteration)
	solution.bench[1] = [3]float64{mn, mx, avg}

	mn = minFloat(timesOverall)
	mx = maxFloat(timesOverall)
	avg = sumFloat(timesOverall) / float64(solution.iteration)
	solution.bench[2] = [3]float64{mn, mx, avg}

	return solution
}

func Run(args []string, part1 ParameterFunction, part2 ParameterFunction, options SolutionOptions) {
	pathAnswers := args[1] + "/answers.txt"
	pathTest1 := args[1] + "/test1.txt"
	pathTest2 := pathTest1
	if options.HasAlternate {
		pathTest2 = args[1] + "/test2.txt"
	}
	pathInput := args[1] + "/input.txt"
	itBench := 0
	if len(args) > 2 {
		itBench, _ = strconv.Atoi(args[2])
	}

	answers := GetAnswers(pathAnswers)
	solutions := [4]SolutionWrapper{
		{tag: "Test 1", fn: part1, path: pathTest1, test: answers.test1, iteration: itBench, options: options},
		{tag: "Part 1", fn: part1, path: pathInput, test: answers.part1, iteration: itBench, options: options},
		{tag: "Test 2", fn: part2, path: pathTest2, test: answers.test2, iteration: itBench, options: options},
		{tag: "Part 2", fn: part2, path: pathInput, test: answers.part2, iteration: itBench, options: options},
	}

	for i := range solutions {
		solution := &solutions[i]
		perform(solution)
	}

	for i := range solutions {
		solution := &solutions[i]
		printResult(*solution)
		test(solution.result, solution.test)
	}
}

func sumFloat(times []float64) float64 {
	sum := 0.0
	for _, t := range times {
		sum += t
	}
	return sum
}

func minFloat(times []float64) float64 {
	min := times[0]
	for _, t := range times {
		if t < min {
			min = t
		}
	}
	return min
}

func maxFloat(times []float64) float64 {
	max := times[0]
	for _, t := range times {
		if t > max {
			max = t
		}
	}
	return max
}
