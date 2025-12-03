extern crate aoc_core;
use std::{collections::HashSet, env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn candidates(start: u64, end: u64) -> Vec<u64> {
   let mut candidates = Vec::<u64>::new();
   let mut set = HashSet::<u64>::new();

   let digits_min = get_digits(start);
   let digits_max = get_digits(end);

   for digit in 1..=digits_max / 2 {
      if (digits_min % digit != 0) && (digits_max % digit != 0) {
         continue;
      }

      let s = 10_u64.pow((digit - 1) as u32);
      let e = 10_u64.pow((digit) as u32);

      for x in s..e {
         let mut n = x;
         while n < end {
            n = n * e + x;
            if n < start {
               continue;
            }
            if n > end {
               break;
            }
            if set.contains(&n) {
               break;
            }
            set.insert(n);
            candidates.push(n);
         }
      }
   }

   candidates
}

fn get_digits(n: u64) -> u64 {
   let mut digits = 0;
   let mut n = n;
   while n > 0 {
      digits += 1;
      n /= 10;
   }
   digits
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   input
      .lines()
      .flat_map(|line| line.split(','))
      .filter(|line| !line.is_empty())
      .map(|pair| {
         pair
            .split('-')
            .map(|x| x.parse::<u64>().unwrap())
            .collect::<Vec<u64>>()
      })
      .fold(0, |mut acc, range| {
         for x in candidates(range[0], range[1]) {
            if !p2 {
               let digits = get_digits(x);
               if digits % 2 != 0 {
                  continue;
               }
               let place = 10_u64.pow((digits / 2) as u32);
               let left = x / place;
               let right = x % place;
               if left == right {
                  acc += x;
               }
               continue;
            }
            acc += x;
         }
         acc
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
