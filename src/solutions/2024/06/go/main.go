package main

import (
	core "advent/of/go/src/langs/go"
	"bytes"
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

func getStart(grid [][]byte) (int, int) {
	for y := 0; y < len(grid); y++ {
		for x := 0; x < len(grid[y]); x++ {
			if grid[y][x] == '^' {
				return x, y
			}
		}
	}
	return 0, 0
}

func part1(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	grid := make([][]byte, len(lines))
	for i, line := range lines {
		grid[i] = []byte(line)
		grid[i] = append(grid[i], 'x')
		grid[i] = append([]byte("x"), grid[i]...)
	}
	grid = append(grid, bytes.Repeat([]byte("x"), len(grid[0])))
	grid = append([][]byte{bytes.Repeat([]byte("x"), len(grid[0]))}, grid...)

	visited := make([][]bool, len(grid))
	for i := 0; i < len(grid); i++ {
		visited[i] = make([]bool, len(grid[i]))
		for j := 0; j < len(grid[i]); j++ {
			visited[i][j] = false
		}
	}

	directions := [][]int{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	dirIndex := 0

	locX, locY := getStart(grid)
	for {
		visited[locY][locX] = true

		nextX := locX + directions[dirIndex][0]
		nextY := locY + directions[dirIndex][1]

		if grid[nextY][nextX] == 'x' {
			break
		}

		if grid[nextY][nextX] == '#' {
			dirIndex = (dirIndex + 1) % 4
		} else {
			locX = nextX
			locY = nextY
		}
	}

	count := int64(0)
	for _, row := range visited {
		for _, val := range row {
			if val {
				count++
			}
		}
	}

	return strconv.FormatInt(int64(count), 10)
}

func part2(input string, isTest bool) string {
	lines := strings.Split(input, "\n")
	grid := make([][]byte, len(lines))
	for i, line := range lines {
		grid[i] = []byte(line)
		grid[i] = append(grid[i], 'x')
		grid[i] = append([]byte("x"), grid[i]...)
	}
	grid = append(grid, bytes.Repeat([]byte("x"), len(grid[0])))
	grid = append([][]byte{bytes.Repeat([]byte("x"), len(grid[0]))}, grid...)

	visited := make([][]bool, len(grid))
	for i := 0; i < len(grid); i++ {
		visited[i] = make([]bool, len(grid[i]))
		for j := 0; j < len(grid[i]); j++ {
			visited[i][j] = false
		}
	}

	directions := [][]int{{0, -1}, {1, 0}, {0, 1}, {-1, 0}}
	dirIndex := 0

	locX, locY := getStart(grid)
	maxCount := int64(0)
	toVisit := [][]int{}
	for {
		if !visited[locY][locX] {
			maxCount++
			toVisit = append(toVisit, []int{locX, locY})
		}
		visited[locY][locX] = true

		nextX := locX + directions[dirIndex][0]
		nextY := locY + directions[dirIndex][1]

		if grid[nextY][nextX] == 'x' {
			break
		}

		if grid[nextY][nextX] == '#' {
			dirIndex = (dirIndex + 1) % 4
		} else {
			locX = nextX
			locY = nextY
		}
	}
	maxCount *= 2

	count := int64(0)
	ogX, ogY := getStart(grid)
	for _, v := range toVisit {
		x, y := v[0], v[1]
		col := grid[y][x]
		if col == 'x' || col == '^' || col == '#' {
			continue
		}

		grid[y][x] = '#'
		locX, locY = ogX, ogY
		dirIndex = 0
		maxIteration := maxCount
		for maxIteration > 0 {
			nextX := locX + directions[dirIndex][0]
			nextY := locY + directions[dirIndex][1]

			if grid[nextY][nextX] == 'x' {
				break
			}

			if grid[nextY][nextX] == '#' {
				dirIndex = (dirIndex + 1) % 4
			} else {
				locX = nextX
				locY = nextY
			}
			maxIteration--
		}
		if maxIteration == 0 {
			count++
		}
		grid[y][x] = '.'
	}

	return strconv.FormatInt(int64(count), 10)
}
