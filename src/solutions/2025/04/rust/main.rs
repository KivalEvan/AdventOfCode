extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn count_neighbour(x: usize, y: usize, max: usize, input: &[u8]) -> u8 {
   let mut adjacent = 0;
   for n_x in -1..=1 {
      for n_y in -1..=1 {
         let p_x = x as isize + n_x;
         let p_y = y as isize + n_y;
         let index = max as isize * p_y + p_x + p_y;
         if index < 0 || index >= input.len() as isize {
            continue;
         }
         if input[index as usize] == b'@' {
            adjacent += 1;
         }
      }
   }
   adjacent - 1
}

fn update_neighbour(
   x: usize,
   y: usize,
   max: usize,
   grid: &mut [u8],
   candidates: &mut Vec<(usize, usize)>,
) {
   for n_x in -1..=1 {
      for n_y in -1..=1 {
         let p_x = x as isize + n_x;
         let p_y = y as isize + n_y;
         let index = max as isize * p_y + p_x + p_y;
         if index < 0 || index >= grid.len() as isize {
            continue;
         }
         grid[index as usize] -= 1;
         if grid[index as usize] == 3 {
            candidates.push((x + n_x as usize, y + n_y as usize));
         }
      }
   }
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   let mut grid = vec![0 as u8; input.len()];
   let input_bytes = input.as_bytes();
   let max = input_bytes.iter().position(|c| *c == b'\n').unwrap();

   let mut stack: Vec<(usize, usize)> = vec![];

   for y in 0..max {
      for x in 0..max {
         let index = max * y + x + y;
         if input_bytes[index] == b'@' {
            grid[index] = count_neighbour(x, y, max,input_bytes);
            if grid[index] < 4 {
               stack.push((x, y));
            }
         }
      }
   }

   if !p2 {
      return stack.len().to_string();
   }

   let mut total = 0;
   while stack.len() > 0 {
      let (x, y) = stack.pop().unwrap();
      grid[max * y + x + y] = 0;
      total += 1;
      update_neighbour(x, y, max, &mut grid, &mut stack);
   }

   total.to_string()
}

fn part_1(input: &str, is_test: bool) -> String {
   solve(input, is_test, false)
}

fn part_2(input: &str, is_test: bool) -> String {
   solve(input, is_test, true)
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
