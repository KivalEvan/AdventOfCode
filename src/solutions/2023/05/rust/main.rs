extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn parse_input(input: &str, single: bool) -> (Vec<(i64, i64)>, Vec<Vec<((i64, i64), (i64, i64))>>) {
   let mut parsed = input.split("\n\n");
   let header = parsed
      .next()
      .unwrap()
      .split(':')
      .next_back()
      .unwrap()
      .split(' ')
      .filter(|x| *x != "")
      .map(|x| x.parse::<i64>().unwrap())
      .collect::<Vec<i64>>();

   let seed_ranges: Vec<(i64, i64)> = if single {
      header
         .iter()
         .map(|x| (x.clone(), x.clone()))
         .collect::<Vec<(i64, i64)>>()
   } else {
      header
         .iter()
         .enumerate()
         .filter(|(idx, _)| idx % 2 == 0)
         .map(|(idx, x)| (*x, *x + header[idx + 1]))
         .collect::<Vec<(i64, i64)>>()
   };

   let src_to_dest_ranges = parsed
      .into_iter()
      .map(|x| {
         x.lines()
            .skip(1)
            .map(|str| {
               str.split(' ')
                  .map(|x| x.parse::<i64>().unwrap())
                  .collect::<Vec<i64>>()
            })
            .map(|v| ((v[1], v[1] + v[2] - 1), (v[0], v[0] + v[2] - 1)))
            .collect::<Vec<((i64, i64), (i64, i64))>>()
      })
      .collect();

   (seed_ranges, src_to_dest_ranges)
}

fn solve(input: &str, single: bool) -> String {
   let (seed_ranges, src_to_dest_ranges) = parse_input(input, single);
   let seed_ranges = &mut Vec::from_iter(seed_ranges);
   for groups in src_to_dest_ranges.iter() {
      for g in groups.iter() {
         let mut new_seeds = Vec::new();
         for r in seed_ranges.into_iter() {
            if r.0 < g.0 .0 && g.0 .0 < r.1 {
               new_seeds.push((r.0, g.0 .0 - 1));
               r.0 = g.0 .0;
            }
            if r.0 < g.0 .1 && g.0 .1 < r.1 {
               new_seeds.push((g.0 .1 + 1, r.1));
               r.1 = g.0 .1;
            }
         }
         seed_ranges.append(&mut new_seeds);
      }
      for r in seed_ranges.into_iter() {
         let found = groups
            .iter()
            .find(|g| g.0 .0 <= r.0 && r.0 <= g.0 .1 && r.1 >= g.0 .0 && g.0 .1 >= r.1);
         if !found.is_none() {
            let f = found.unwrap();
            let diff = f.1 .0 - f.0 .0;
            r.0 += diff;
            r.1 += diff;
         }
      }
   }

   seed_ranges.iter().map(|x| x.0).min().unwrap().to_string()
}

fn part_1(input: &str, _is_test: bool) -> String {
   return solve(input, true);
}

fn part_2(input: &str, _is_test: bool) -> String {
   return solve(input, false);
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
