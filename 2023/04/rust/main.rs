extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn part_1(input: &str, _is_test: bool) -> String {
   input
      .split('\n')
      .map(|x| {
         let nums = x
            .split(':')
            .next_back()
            .unwrap()
            .split('|')
            .map(|r| {
               r.split(' ')
                  .into_iter()
                  .filter(|s| *s != "")
                  .map(|s| s.parse::<i32>().unwrap())
                  .collect::<Vec<i32>>()
            })
            .collect::<Vec<Vec<i32>>>();
         let mut j = -1 as i64;
         for i in 0..nums[0].len() {
            if nums[1].contains(&nums[0][i]) {
               j += 1;
            }
         }
         if j != -1 {
            2_i64.pow(j as u32)
         } else {
            0
         }
      })
      .sum::<i64>()
      .to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let lines = input.split('\n');
   let mut instances = vec![1_i64; input.lines().count()];

   lines.enumerate().for_each(|(i, x)| {
      let nums = x
         .split(':')
         .next_back()
         .unwrap()
         .split('|')
         .map(|r| {
            r.split(' ')
               .into_iter()
               .filter(|s| *s != "")
               .map(|s| s.parse::<i32>().unwrap())
               .collect::<Vec<i32>>()
         })
         .collect::<Vec<Vec<i32>>>();
      let mut j = 0 as usize;
      for i in 0..nums[0].len() {
         if nums[1].contains(&nums[0][i]) {
            j += 1;
         }
      }
      while j > 0 {
         instances[i + j] += instances[i];
         j -= 1;
      }
   });
   instances.iter().sum::<i64>().to_string()
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
