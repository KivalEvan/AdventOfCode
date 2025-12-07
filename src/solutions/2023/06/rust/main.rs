extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn ohnomath(b: i64, c: i64) -> i64 {
   const PEPSILON: f64 = 0.001;
   let min = ((b as f64 + ((b * b - 4 * c) as f64).sqrt()) / 2.0 - PEPSILON).floor() as i64;
   let max = ((b as f64 - ((b * b - 4 * c) as f64).sqrt()) / 2.0 + PEPSILON).ceil() as i64;
   return min - max + 1;
}

fn part_1(input: &str, _is_test: bool) -> String {
   let td = input
      .lines()
      .map(|str| {
         str.split(':')
            .nth(1)
            .unwrap()
            .trim()
            .split(' ')
            .filter(|x| !x.is_empty())
            .map(|x| x.parse::<i64>().unwrap())
            .collect::<Vec<i64>>()
      })
      .collect::<Vec<Vec<i64>>>();
   let mut res = 1;
   for i in 0..td[0].len() {
      res *= ohnomath(td[0][i], td[1][i]);
   }
   res.to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let td = input
      .lines()
      .map(|str| {
         str.split(':')
            .nth(1)
            .unwrap()
            .trim()
            .replace(" ", "")
            .parse::<i64>()
            .unwrap()
      })
      .collect::<Vec<i64>>();
   ohnomath(td[0], td[1]).to_string()
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
