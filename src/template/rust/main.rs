extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn solve(input: &str, p2: bool) -> String {
   input.to_string()
}

fn part_1(input: &str, _is_test: bool) -> String {
   solve(input, false)
}
 
fn part_2(input: &str, _is_test: bool) -> String {
   solve(input, true)
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
