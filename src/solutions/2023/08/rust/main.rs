extern crate aoc_core;
use std::{collections::HashMap, env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      has_alternate: true,
      ..Default::default()
   }
}

fn gcd(a: i64, b: i64) -> i64 {
   return if b == 0 { a } else { gcd(b, a % b) };
}

fn lcm(a: i64, b: i64) -> i64 {
   return (a * b) / gcd(a, b);
}

fn part_1(input: &str, _is_test: bool) -> String {
   let lines: Vec<&str> = input.split("\n").collect();
   let instructions: Vec<i64> = lines[0]
      .chars()
      .map(|x| if x == 'L' { 0 } else { 1 })
      .collect();
   let mut maps: HashMap<&str, Vec<&str>> = HashMap::new();
   for ele in lines[2..].iter() {
      let mut chunks = ele.split(" = ");
      let dest = chunks.next().unwrap();
      let n = chunks.next().unwrap();
      let lr = n[1..(n.len() - 1)].split(", ").collect::<Vec<&str>>();
      maps.insert(dest, lr);
   }

   let mut i = 0;
   let mut nav = "AAA";
   loop {
      let m = maps.get(nav).unwrap();
      nav = m[instructions[i % instructions.len()] as usize];
      i += 1;
      if nav == "ZZZ" {
         break;
      }
   }

   i.to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let lines: Vec<&str> = input.split("\n").collect();
   let instructions: Vec<i64> = lines[0]
      .chars()
      .map(|x| if x == 'L' { 0 } else { 1 })
      .collect();
   let mut maps: HashMap<&str, Vec<&str>> = HashMap::new();
   let mut navs = Vec::new();
   for ele in lines[2..].iter() {
      let mut chunks = ele.split(" = ");
      let dest = chunks.next().unwrap();
      let n = chunks.next().unwrap();
      let lr = n[1..(n.len() - 1)].split(", ").collect::<Vec<&str>>();
      maps.insert(dest, lr);
      if dest.chars().nth(2) == Some('A') {
         navs.push(dest);
      }
   }

   let mut res = 1_i64;
   for i in 0..navs.len() {
      let mut j = 0;
      loop {
         let m = maps.get(navs[i]).unwrap();
         navs[i] = m[instructions[j % instructions.len()] as usize];
         j += 1;
         if navs[i].chars().nth(2) == Some('Z') {
            break;
         }
      }
      res = lcm(res, j as i64);
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
