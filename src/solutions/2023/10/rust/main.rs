extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      has_alternate: true,
      ..Default::default()
   }
}

fn find_start(grid: &Vec<Vec<char>>) -> (usize, usize) {
   for y in 0..grid.len() {
      for x in 0..grid[0].len() {
         if grid[y][x] == 'S' {
            return (x, y);
         }
      }
   }
   (0, 0)
}

fn go_up(grid: &Vec<Vec<char>>, x: usize, y: usize) -> bool {
   let criteria = "S7F|";
   y > 0 && criteria.contains(grid[y - 1][x])
}

fn go_down(grid: &Vec<Vec<char>>, x: usize, y: usize) -> bool {
   let criteria = "SLJ|";
   y < grid.len() - 1 && criteria.contains(grid[y + 1][x])
}

fn go_left(grid: &Vec<Vec<char>>, x: usize, y: usize) -> bool {
   let criteria = "SLF-";
   x > 0 && criteria.contains(grid[y][x - 1])
}

fn go_right(grid: &Vec<Vec<char>>, x: usize, y: usize) -> bool {
   let criteria = "S7J-";
   x < grid[y].len() - 1 && criteria.contains(grid[y][x + 1])
}

fn look_up(grid: &Vec<Vec<char>>, x: usize, y: usize) -> Vec<(usize, usize)> {
   let c = grid[y][x];
   let mut res: Vec<(usize, usize)> = vec![];
   if c == '|' {
      if go_up(grid, x, y) {
         res.push((x, y - 1));
      }
      if go_down(grid, x, y) {
         res.push((x, y + 1));
      }
   }
   if c == '-' {
      if go_left(grid, x, y) {
         res.push((x - 1, y));
      }
      if go_right(grid, x, y) {
         res.push((x + 1, y));
      }
   }
   if c == 'L' {
      if go_up(grid, x, y) {
         res.push((x, y - 1));
      }
      if go_right(grid, x, y) {
         res.push((x + 1, y));
      }
   }
   if c == 'J' {
      if go_up(grid, x, y) {
         res.push((x, y - 1));
      }
      if go_left(grid, x, y) {
         res.push((x - 1, y));
      }
   }
   if c == '7' {
      if go_down(grid, x, y) {
         res.push((x, y + 1));
      }
      if go_left(grid, x, y) {
         res.push((x - 1, y));
      }
   }
   if c == 'F' {
      if go_down(grid, x, y) {
         res.push((x, y + 1));
      }
      if go_right(grid, x, y) {
         res.push((x + 1, y));
      }
   }
   if c == 'S' {
      if go_up(grid, x, y) {
         res.push((x, y - 1));
      }
      if go_down(grid, x, y) {
         res.push((x, y + 1));
      }
      if go_left(grid, x, y) {
         res.push((x - 1, y));
      }
      if go_right(grid, x, y) {
         res.push((x + 1, y));
      }
   }

   res
}

fn part_1(input: &str, _is_test: bool) -> String {
   let grid: Vec<Vec<char>> = input.lines().map(|s| s.chars().collect()).collect();
   let mut visited = vec![vec![false; grid[0].len()]; grid.len()];

   let mut i = 0;
   let mut queue = vec![find_start(&grid)];
   while queue.len() > 0 {
      let (x, y) = queue.pop().unwrap();
      let found = look_up(&grid, x, y);
      for f in found {
         if visited[f.1][f.0] {
            continue;
         }
         visited[f.1][f.0] = true;
         queue.push(f);
         i += 1;
      }
   }
   (i / 2).to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let grid: Vec<Vec<char>> = input.lines().map(|s| s.chars().collect()).collect();
   let mut visited = vec![vec![false; grid[0].len() * 3]; grid.len() * 3];

   let mut queue = vec![find_start(&grid)];
   while queue.len() > 0 {
      let (x, y) = queue.pop().unwrap();
      let found = look_up(&grid, x, y);
      for f in found {
         visited[f.1 * 3 + 1 + y - f.1][f.0 * 3 + 1 + x - f.0] = true;
         if visited[f.1 * 3 + 1][f.0 * 3 + 1] {
            continue;
         }
         visited[f.1 * 3 + 1][f.0 * 3 + 1] = true;
         queue.push(f);
      }
   }

   queue.push((0, 0));
   while queue.len() > 0 {
      let (x, y) = queue.pop().unwrap();
      if visited[y][x] {
         continue;
      }
      visited[y][x] = true;
      for ud in -1..2 {
         for lr in -1..2 {
            let new_x = (x as i32) + lr;
            let new_y = (y as i32) + ud;
            if new_y < 0 || new_y >= (visited.len() as i32) {
               continue;
            }
            if new_x < 0 || new_x >= (visited[0].len() as i32) {
               continue;
            }
            if visited[new_y as usize][new_x as usize] {
               continue;
            }
            queue.push((new_x as usize, new_y as usize));
         }
      }
   }

   let mut res = 0;
   for y in 0..grid.len() {
      for x in 0..grid[0].len() {
         if !visited[1 + y * 3][1 + x * 3] {
            res += 1;
         }
      }
   }

   res.to_string()
}

fn main() {
   let args = Vec::from_iter(env::args());
   aoc_core::run(
      args.iter().map(|x| x.as_ref()).collect::<Vec<_>>(),
      part_1,
      part_2,
      get_options(),
   );
}
