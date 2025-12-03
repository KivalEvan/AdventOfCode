extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   input.to_string()
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
