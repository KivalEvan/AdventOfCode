extern crate aoc_core;
use std::{collections::HashMap, env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn depth(
   column: usize,
   row: usize,
   splitters: &Vec<Vec<usize>>,
   visited: &mut HashMap<(usize, usize), usize>,
) -> usize {
   if row >= splitters.len() {
      return 1;
   }
   if visited.contains_key(&(column, row)) {
      return *visited.get(&(column, row)).unwrap();
   }
   let res;
   if splitters[row].contains(&column) {
      res = depth(column - 1, row + 1, splitters, visited)
         + depth(column + 1, row + 1, splitters, visited);
      visited.insert((column, row), res);
   } else {
      res = depth(column, row + 1, splitters, visited);
   }
   res
}

fn solve(input: &str, _is_test: bool, p2: bool) -> String {
   let splitters = input
      .lines()
      .map(|line| {
         line
            .chars()
            .enumerate()
            .filter(|(_, c)| *c == '^')
            .map(|(i, _)| i)
            .collect::<Vec<usize>>()
      })
      .filter(|x| x.len() > 0)
      .collect::<Vec<Vec<usize>>>();

   let mut visited: HashMap<(usize, usize), usize> = HashMap::with_capacity(2047);
   let timelines = depth(input.find('S').unwrap(), 0, &splitters, &mut visited);
   return if p2 {
      timelines.to_string()
   } else {
      visited.keys().len().to_string()
   };
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
