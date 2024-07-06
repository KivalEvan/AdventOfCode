extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn get_ranking(c: char) -> usize {
   match c {
      'A' => 13,
      'K' => 12,
      'Q' => 11,
      'J' => 10,
      'T' => 9,
      '9' => 8,
      '8' => 7,
      '7' => 6,
      '6' => 5,
      '5' => 4,
      '4' => 3,
      '3' => 2,
      '2' => 1,
      '1' => 0,
      _ => 0,
   }
}

enum CardType {
   HighCard,
   OnePair,
   TwoPair,
   ThreeOfAKind,
   FullHouse,
   FourOfAKind,
   FiveOfAKind,
}

fn get_type(cards: &Vec<char>) -> CardType {
   let mut values = vec![0; 14];
   for i in 0..5 {
      values[get_ranking(cards[i])] += 1;
   }

   if values[0] > 0 {
      let temp = values[0];
      values[0] = 0;
      let max = *values.iter().max().unwrap();
      let idx = values.iter().position(|x| *x == max).unwrap();
      values[idx] += temp;
   }

   values = values.into_iter().filter(|x| *x > 0).collect();
   if values.len() == 1 {
      return CardType::FiveOfAKind;
   }
   if values.len() == 4 {
      return CardType::OnePair;
   }
   if values.len() == 5 {
      return CardType::HighCard;
   }

   let min = *values.iter().min().unwrap();
   let max = *values.iter().max().unwrap();

   if min == 1 {
      if max == 2 {
         return CardType::TwoPair;
      }
      if max == 3 {
         return CardType::ThreeOfAKind;
      }
      return CardType::FourOfAKind;
   }

   CardType::FullHouse
}

fn parse_input(input: &str, joker: bool) -> Vec<Vec<(Vec<char>, i64)>> {
   input
      .split('\n')
      .map(|str| {
         let mut temp = str.split(' ');
         let mut s = temp.next().unwrap().to_string();
         if joker {
            s = s.replace('J', "1");
         }
         (
            s.chars().collect::<Vec<char>>(),
            temp.next().unwrap().parse::<i64>().unwrap(),
         )
      })
      .fold(vec![vec![]; 7], |mut v, p| {
         v[get_type(&p.0) as usize].push((p.0, p.1));
         v
      })
}

fn solve(input: &str, joker: bool) -> String {
   let groups = parse_input(input, joker);
   let mut res = 0;
   let mut i = 1;
   for mut g in groups {
      g.sort_by(|a, b| {
         a.0.iter()
            .map(|x| get_ranking(*x))
            .collect::<Vec<_>>()
            .cmp(&b.0.iter().map(|x| get_ranking(*x)).collect::<Vec<_>>())
      });
      for s in g {
         res += s.1 * i;
         i += 1;
      }
   }
   res.to_string()
}

fn part_1(input: &str, _is_test: bool) -> String {
   solve(input, false)
}

fn part_2(input: &str, _is_test: bool) -> String {
   solve(input, true)
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
