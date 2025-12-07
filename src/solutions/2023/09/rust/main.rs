extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn difference(ary: &mut Vec<i64>, sz: usize) -> &mut Vec<i64> {
   for i in 0..sz {
      ary[i] = ary[i + 1] - ary[i];
   }
   ary
}

fn extrapolate(ary: &mut Vec<i64>, sz: usize) -> i64 {
   let z = sz - 1;
   let last = ary[z];
   if z == 0 {
      last
   } else {
      extrapolate(difference(ary, z), z) + last
   }
}

fn part_1(input: &str, _is_test: bool) -> String {
   let parsed: Vec<Vec<i64>> = input
      .lines()
      .map(|x| x.split(' ').map(|y| y.parse::<i64>().unwrap()).collect())
      .collect();
   let mut res = 0_i64;
   for mut history in parsed {
      let len = history.len();
      res += extrapolate(&mut history, len);
   }
   res.to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let parsed: Vec<Vec<i64>> = input
      .lines()
      .map(|x| x.split(' ').map(|y| y.parse::<i64>().unwrap()).rev().collect())
      .collect();
   let mut res = 0_i64;
   for mut history in parsed {
      let len = history.len();
      res += extrapolate(&mut history, len);
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
