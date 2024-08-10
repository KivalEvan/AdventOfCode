package main

import (
	core "advent/of/go/src/langs/go"
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

func findStart(grid []string) [2]int64 {
	for y := 0; y < len(grid); y++ {
		for x := 0; x < len(grid[y]); x++ {
			if grid[y][x] == 'S' {
				return [2]int64{int64(x), int64(y)}
			}
		}
	}
	panic("Couldn't find starting point")
}

func goUp(
	grid []string,
	x int64,
	y int64,
) bool {
	criteria := "S7F|"
	return y > 0 && strings.Contains(criteria, string(grid[y-1][x]))
}

func goDown(
	grid []string,
	x int64,
	y int64,
) bool {
	criteria := "SLJ|"
	return y < int64(len(grid))-1 && strings.Contains(criteria, string(grid[y+1][x]))
}

func goLeft(
	grid []string,
	x int64,
	y int64,
) bool {
	criteria := "SLF-"
	return x > 0 && strings.Contains(criteria, string(grid[y][x-1]))
}

func goRight(
	grid []string,
	x int64,
	y int64,
) bool {
	criteria := "S7J-"
	return x < int64(len(grid[y]))-1 && strings.Contains(criteria, string(grid[y][x+1]))
}

func lookUp(
	grid []string,
	x int64,
	y int64,
) [][2]int64 {
	char := grid[y][x]
	res := make([][2]int64, 0)
	switch char {
	case '|':
		if goUp(grid, x, y) {
			res = append(res, [2]int64{x, y - 1})
		}
		if goDown(grid, x, y) {
			res = append(res, [2]int64{x, y + 1})
		}
	case '-':
		if goLeft(grid, x, y) {
			res = append(res, [2]int64{x - 1, y})
		}
		if goRight(grid, x, y) {
			res = append(res, [2]int64{x + 1, y})
		}
	case 'L':
		if goUp(grid, x, y) {
			res = append(res, [2]int64{x, y - 1})
		}
		if goRight(grid, x, y) {
			res = append(res, [2]int64{x + 1, y})
		}
	case 'J':
		if goUp(grid, x, y) {
			res = append(res, [2]int64{x, y - 1})
		}
		if goLeft(grid, x, y) {
			res = append(res, [2]int64{x - 1, y})
		}
	case '7':
		if goDown(grid, x, y) {
			res = append(res, [2]int64{x, y + 1})
		}
		if goLeft(grid, x, y) {
			res = append(res, [2]int64{x - 1, y})
		}
	case 'F':
		if goDown(grid, x, y) {
			res = append(res, [2]int64{x, y + 1})
		}
		if goRight(grid, x, y) {
			res = append(res, [2]int64{x + 1, y})
		}
	case 'S':
		if goUp(grid, x, y) {
			res = append(res, [2]int64{x, y - 1})
		}
		if goDown(grid, x, y) {
			res = append(res, [2]int64{x, y + 1})
		}
		if goLeft(grid, x, y) {
			res = append(res, [2]int64{x - 1, y})
		}
		if goRight(grid, x, y) {
			res = append(res, [2]int64{x + 1, y})
		}
	}
	return res
}

func part1(input string, isTest bool) string {
	grid := strings.Split(input, "\n")
	visited := make([][]bool, len(grid))
	for i := 0; i < len(grid); i++ {
		visited[i] = make([]bool, len(grid[i]))
		for j := 0; j < len(grid[i]); j++ {
			visited[i][j] = false
		}
	}

	var i int64 = 0
	queue := [][2]int64{findStart(grid)}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		found := lookUp(grid, current[0], current[1])
		for _, f := range found {
			if visited[f[1]][f[0]] {
				continue
			}
			visited[f[1]][f[0]] = true
			queue = append(queue, f)
			i++
		}
	}

	return strconv.FormatInt(i/2, 10)
}

func part2(input string, isTest bool) string {
	grid := strings.Split(input, "\n")
	visited := make([][]bool, len(grid)*3)
	for i := range visited {
		visited[i] = make([]bool, len(grid[0])*3)
		for j := range visited[i] {
			visited[i][j] = false
		}
	}

	queue := [][2]int64{findStart(grid)}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		found := lookUp(grid, current[0], current[1])
		for _, f := range found {
			visited[f[1]*3+1+current[1]-f[1]][f[0]*3+1+current[0]-f[0]] = true
			if visited[f[1]*3+1][f[0]*3+1] {
				continue
			}
			visited[f[1]*3+1][f[0]*3+1] = true
			queue = append(queue, f)
		}
	}

	queue = append(queue, [2]int64{0, 0})
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if visited[current[1]][current[0]] {
			continue
		}
		visited[current[1]][current[0]] = true
		for _, ud := range [3]int64{-1, 0, 1} {
			for _, lr := range [3]int64{-1, 0, 1} {
				if current[1]+ud < 0 || current[1]+ud >= int64(len(visited)) {
					continue
				}
				if current[0]+lr < 0 || current[0]+lr >= int64(len(visited[0])) {
					continue
				}
				if visited[current[1]+ud][current[0]+lr] {
					continue
				}
				queue = append(queue, [2]int64{current[0] + lr, current[1] + ud})
			}
		}
	}

	// check result
	var res int64 = 0
	for y := range grid {
		for x := range grid[0] {
			if !visited[1+y*3][1+x*3] {
				res += 1
			}
		}
	}

	return strconv.FormatInt(res, 10)
}
