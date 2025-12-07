extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      has_alternate: true,
      ..Default::default()
   }
}

fn _get_num(str: &str) -> char {
   if str.starts_with("zero") {
      return '0';
   }
   if str.starts_with("one") {
      return '1';
   }
   if str.starts_with("two") {
      return '2';
   }
   if str.starts_with("three") {
      return '3';
   }
   if str.starts_with("four") {
      return '4';
   }
   if str.starts_with("five") {
      return '5';
   }
   if str.starts_with("six") {
      return '6';
   }
   if str.starts_with("seven") {
      return '7';
   }
   if str.starts_with("eight") {
      return '8';
   }
   if str.starts_with("nine") {
      return '9';
   }
   return ' ';
}

fn part_1(input: &str, _is_test: bool) -> String {
   input
      .lines()
      .map(|f| {
         let mut first = ' ';
         let mut last = ' ';

         for c in f.chars() {
            if c.is_numeric() {
               first = c;
               break;
            }
         }

         for c in f.chars().rev() {
            if c.is_numeric() {
               last = c;
               break;
            }
         }

         format!("{}{}", first, last).parse::<i32>().unwrap()
      })
      .sum::<i32>()
      .to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   input
      .lines()
      .map(|f| {
         let mut first = ' ';
         let mut last = ' ';

         for (i, _) in f.chars().enumerate() {
            let substr = f[i..].chars().take(5).collect::<String>();
            if substr.as_bytes()[0].is_ascii_digit() {
               first = substr.as_bytes()[0] as char;
               break;
            }
            let c = _get_num(&substr);
            if c != ' ' {
               first = c;
               break;
            }
         }

         for (i, _) in f.bytes().enumerate().rev() {
            let substr = f[i..].chars().take(5).collect::<String>();
            if substr.as_bytes()[0].is_ascii_digit() {
               last = substr.as_bytes()[0] as char;
               break;
            }
            let c = _get_num(&substr);
            if c != ' ' {
               last = c;
               break;
            }
         }

         format!("{}{}", first, last).parse::<i32>().unwrap()
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
