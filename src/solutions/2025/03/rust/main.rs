extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   input
      .lines()
      .fold(0, |acc, line| {
         let mut res: u64 = 0;
         let mut start: usize = 0;
         let max: usize = if p2 { 12 } else { 2 };
         let bytes = line.as_bytes();
         for digit in 0..max {
            let mut marked = 0;
            let mut n: u64 = 0;
            let t = max - 1 - digit;
            let l = bytes.len() - t;
            for it in start..l {
               let parsed = (bytes[it] - b'0') as u64;
               if n < parsed {
                  marked = it;
                  n = parsed;
               }
            }
            start = marked + 1;
            res += n * (10_u64.pow(t as u32));
         }
         res + acc
      })
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
