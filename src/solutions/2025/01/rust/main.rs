extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn modulo(x: i32, y: i32) -> i32 {
   let r = x % y;
   if r < 0 {
      r + y
   } else {
      r
   }
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   let mut dial = 50;
   input
      .lines()
      .map(|line| {
         let new_dial = dial
            + line[1..].parse::<i32>().unwrap()
               * if line.chars().nth(0).unwrap() == 'R' {
                  1
               } else {
                  -1
               };

         if p2 {
            let zero = new_dial.abs() / 100 + if dial != 0 && new_dial <= 0 { 1 } else { 0 };
            dial = modulo(new_dial, 100);
            return zero;
         } else {
            dial = new_dial;
            if dial % 100 == 0 {
               return 1;
            }
         }
         return 0;
      })
      .sum::<i32>()
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
