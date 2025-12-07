extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   let mut chunks = input.split("\n\n");
   let mut ranges = chunks
      .next()
      .unwrap()
      .lines()
      .map(|x| x.split('-').map(|y| y.parse::<i64>().unwrap()).collect())
      .collect::<Vec<Vec<i64>>>();
   if p2 {
      let mut highest_min = 0;
      ranges.sort_by_key(|x| x[0]);
      return ranges
         .iter()
         .map(|x| {
            let res = std::cmp::max(x[1] + 1 - std::cmp::max(x[0], highest_min), 0);
            highest_min = std::cmp::max(highest_min, x[1] + 1);
            res
         })
         .sum::<i64>()
         .to_string();
   }
   chunks
      .next()
      .unwrap()
      .lines()
      .map(|x| x.parse::<i64>().unwrap())
      .filter(|x| ranges.iter().any(|r| r[0] <= *x && *x <= r[1]))
      .count()
      .to_string()
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
