extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn find_start(grid: &Vec<Vec<char>>) -> (i16, i16) {
   for y in 0..grid.len() {
      for x in 0..grid[0].len() {
         if grid[y][x] == '^' {
            return (x as i16, y as i16);
         }
      }
   }
   (0, 0)
}

fn part_1(input: &str, _is_test: bool) -> String {
   let mut grid: Vec<Vec<char>> = input
      .lines()
      .map(|s| {
         let mut v: Vec<char> = s.chars().into_iter().collect();
         v.insert(0, 'x');
         v.push('x');
         v
      })
      .collect();
   grid.insert(0, vec!['x'; grid[0].len()]);
   grid.push(vec!['x'; grid[0].len()]);
   let mut visited = vec![vec![false; grid[0].len()]; grid.len()];

   let mut loc = find_start(&grid);
   let direction: Vec<(i16, i16)> = vec![(0, -1), (1, 0), (0, 1), (-1, 0)];
   let mut i = 0;
   loop {
      visited[loc.1 as usize][loc.0 as usize] = true;

      let (next_x, next_y) = (loc.0 + direction[i % 4].0, loc.1 + direction[i % 4].1);
      if grid[next_y as usize][next_x as usize] == 'x' {
         break;
      }

      if grid[next_y as usize][next_x as usize] == '#' {
         i = (i + 1) % 4;
      } else {
         loc.0 = next_x;
         loc.1 = next_y;
      }
   }

   visited
      .iter()
      .map(|x| x.iter().filter(|y| **y).count())
      .sum::<usize>()
      .to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let mut grid: Vec<Vec<char>> = input
      .lines()
      .map(|s| {
         let mut v: Vec<char> = s.chars().into_iter().collect();
         v.insert(0, 'x');
         v.push('x');
         v
      })
      .collect();
   grid.insert(0, vec!['x'; grid[0].len()]);
   grid.push(vec!['x'; grid[0].len()]);
   let mut visited = vec![vec![false; grid[0].len()]; grid.len()];

   let mut loc = find_start(&grid);
   let direction: Vec<(i16, i16)> = vec![(0, -1), (1, 0), (0, 1), (-1, 0)];
   let mut i = 0;
   let mut to_visit = vec![];
   loop {
      if !visited[loc.1 as usize][loc.0 as usize] {
         to_visit.push((loc.0 as usize, loc.1 as usize));
      }
      visited[loc.1 as usize][loc.0 as usize] = true;

      let (next_x, next_y) = (loc.0 + direction[i % 4].0, loc.1 + direction[i % 4].1);
      if grid[next_y as usize][next_x as usize] == 'x' {
         break;
      }

      if grid[next_y as usize][next_x as usize] == '#' {
         i = (i + 1) % 4;
      } else {
         loc.0 = next_x;
         loc.1 = next_y;
      }
   }
   let max_visit = to_visit.len() * 2;

   let og_loc = find_start(&grid);
   let mut count = 0;
   for v in to_visit {
      let (x, y) = v;
      if !visited[y][x] || grid[y][x] == '#' || grid[y][x] == '^' {
         continue;
      }
      grid[y][x] = '#';

      loc.0 = og_loc.0;
      loc.1 = og_loc.1;
      i = 0;
      let mut max_iter = max_visit;
      while max_iter > 0 {
         let (next_x, next_y) = (loc.0 + direction[i % 4].0, loc.1 + direction[i % 4].1);
         if grid[next_y as usize][next_x as usize] == 'x' {
            break;
         }

         if grid[next_y as usize][next_x as usize] == '#' {
            i = (i + 1) % 4;
         } else {
            loc.0 = next_x;
            loc.1 = next_y;
         }

         max_iter -= 1;
      }
      if max_iter == 0 {
         count += 1;
      }
      grid[y][x] = '.';
   }

   count.to_string()
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
