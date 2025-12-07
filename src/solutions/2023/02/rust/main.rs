extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn get_sequences(game: &str) -> Vec<(i32, usize)> {
   game
      .split(':')
      .next_back()
      .unwrap()
      .replace(',', ";")
      .split(';')
      .map(|x| {
         let mut split = x.trim().split(' ');
         (
            split.next().unwrap().parse::<i32>().unwrap(),
            (split.next().unwrap().as_bytes()[0] % 3) as usize,
         )
      })
      .collect()
}

const RGB: [i32; 3] = [12, 13, 14];
fn part_1(input: &str, _is_test: bool) -> String {
   input
      .lines()
      .map(get_sequences)
      .enumerate()
      .map(|x| {
         for cube in x.1 {
            if cube.0 > RGB[cube.1] {
               return 0;
            }
         }
         x.0 + 1
      })
      .sum::<usize>()
      .to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   input
      .lines()
      .map(get_sequences)
      .map(|x| {
         let mut rgb = [0, 0, 0];
         for cube in x {
            if cube.0 > rgb[cube.1] {
               rgb[cube.1] = cube.0;
            }
         }
         rgb[0] * rgb[1] * rgb[2]
      })
      .sum::<i32>()
      .to_string()
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
