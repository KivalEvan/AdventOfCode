package core

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

type ParameterFunction func(string, bool) string

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

func perform(tag string, fn ParameterFunction, path string, hasIo bool) string {
	fmt.Println("\n\\ " + tag)
	isTest := strings.HasPrefix(tag, "Test")

	input, elapsedIo := timer(func() string {
		input := path
		if !hasIo {
			input = GetInput(path)
		}
		return input
	})

	output, elapsedPart := timer(func() string { return fn(input, isTest) })

	fmt.Println(" -- Time taken (ms):")
	fmt.Println(" | IO > PART > ALL")
	fmt.Println(" | " + strconv.FormatFloat((float64(elapsedIo))/1000.0, 'f', -1, 64) + " > " + strconv.FormatFloat(float64(elapsedPart)/1000.0, 'f', -1, 64) + " > " + strconv.FormatFloat(float64(elapsedIo+elapsedPart)/1000, 'f', -1, 64))
	fmt.Println("/ Result: " + output)
	return output
}

func bench(tag string, fn ParameterFunction, path string, itBench int, hasIo bool) {
	isTest := strings.HasPrefix(tag, "Test")

	timesIo := make([]float64, itBench)
	timesPart := make([]float64, itBench)
	timesOverall := make([]float64, itBench)

	for i := 0; i < itBench; i++ {
		input, elapsedIo := timer(func() string {
			input := path
			if !hasIo {
				input = GetInput(path)
			}
			return input
		})

		_, elapsedPart := timer(func() string { return fn(input, isTest) })

		timesIo[i] = float64(elapsedIo) / 1000.0
		timesPart[i] = float64(elapsedPart) / 1000.0
		timesOverall[i] = float64(elapsedIo+elapsedPart) / 1000.0
	}
	mn := 0.0
	mx := 0.0
	avg := 0.0
	fmt.Println("\nBenchmarking " + tag + " (ms) min..max avg")

	mn = minFloat(timesIo)
	mx = maxFloat(timesIo)
	avg = sumFloat(timesIo) / float64(itBench)
	fmt.Println("IO: " + strconv.FormatFloat(mn, 'f', -1, 64) + " .. " + strconv.FormatFloat(mx, 'f', -1, 64) + " - " + strconv.FormatFloat(avg, 'f', -1, 64))

	mn = minFloat(timesPart)
	mx = maxFloat(timesPart)
	avg = sumFloat(timesPart) / float64(itBench)
	fmt.Println("Part: " + strconv.FormatFloat(mn, 'f', -1, 64) + " .. " + strconv.FormatFloat(mx, 'f', -1, 64) + " - " + strconv.FormatFloat(avg, 'f', -1, 64))

	mn = minFloat(timesOverall)
	mx = maxFloat(timesOverall)
	avg = sumFloat(timesOverall) / float64(itBench)
	fmt.Println("Overall: " + strconv.FormatFloat(mn, 'f', -1, 64) + " .. " + strconv.FormatFloat(mx, 'f', -1, 64) + " - " + strconv.FormatFloat(avg, 'f', -1, 64))
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
	if itBench > 0 {
		bench("Test 1", part1, pathTest1, itBench, options.HasIo)
		bench("Part 1", part1, pathInput, itBench, options.HasIo)
		bench("Test 2", part2, pathTest2, itBench, options.HasIo)
		bench("Part 2", part2, pathInput, itBench, options.HasIo)
		return
	}

	answers := GetAnswers(pathAnswers)
	result := ""
	result = perform("Test 1", part1, pathTest1, options.HasIo)
	test(result, answers.test1)
	result = perform("Part 1", part1, pathInput, options.HasIo)
	test(result, answers.part1)
	result = perform("Test 2", part2, pathTest2, options.HasIo)
	test(result, answers.test2)
	result = perform("Part 2", part2, pathInput, options.HasIo)
	test(result, answers.part2)
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
