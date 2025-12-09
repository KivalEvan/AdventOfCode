extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   let mut total: i64 = 0;
   let len = input.find('\n').unwrap();
   let mut buffer = vec![0 as i64; 141];
   buffer[input.find('S').unwrap()] = 1;
   for (i, c) in input.chars().enumerate() {
      let x = i % (len + 1);
      if c != '^' {
         continue;
      }
      if buffer[x] > 0 {
         total += 1;
      }
      buffer[x - 1] += buffer[x];
      buffer[x + 1] += buffer[x];
      buffer[x] = 0;
   }

   return if p2 {
      buffer.iter().sum::<i64>().to_string()
   } else {
      total.to_string()
   }
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
