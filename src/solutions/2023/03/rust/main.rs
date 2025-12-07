extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

fn issymbol(c: char) -> bool {
   match c {
      '*' | '$' | '=' | '#' | '%' | '/' | '&' | '+' | '-' | '@' => true,
      _ => false,
   }
}

fn yeet_the_number(grid: &mut Vec<Vec<char>>, x: usize, y: usize) -> String {
   let mut res = String::new();
   if grid[y][x].is_ascii_digit() {
      res.push(grid[y][x]);
      grid[y][x] = '.';
      if x > 0 {
         let temp = res;
         res = yeet_the_number(grid, x - 1, y);
         res.push_str(&temp);
      }
      let len = grid[y].len();
      if x < len - 1 {
         res.push_str(yeet_the_number(grid, x + 1, y).as_str());
      }
   }
   res
}

fn part_1(input: &str, _is_test: bool) -> String {
   let mut grid: Vec<Vec<char>> = input.lines().map(|s| s.chars().collect()).collect();
   let sz = grid.len();
   let mut res = 0;

   for y in 0..sz {
      for x in 0..sz {
         if issymbol(grid[y][x]) {
            if x > 0 {
               if y < sz - 1 {
                  res += (yeet_the_number(&mut grid, x - 1, y + 1))
                     .parse::<i64>()
                     .unwrap_or_default();
               }
               if y > 0 {
                  res += (yeet_the_number(&mut grid, x - 1, y - 1))
                     .parse::<i64>()
                     .unwrap_or_default();
               }
               res += (yeet_the_number(&mut grid, x - 1, y))
                  .parse::<i64>()
                  .unwrap_or_default();
            }
            if x < sz - 1 {
               if y < sz - 1 {
                  res += (yeet_the_number(&mut grid, x + 1, y + 1))
                     .parse::<i64>()
                     .unwrap_or_default();
               }
               if y > 0 {
                  res += (yeet_the_number(&mut grid, x + 1, y - 1))
                     .parse::<i64>()
                     .unwrap_or_default();
               }
               res += (yeet_the_number(&mut grid, x + 1, y))
                  .parse::<i64>()
                  .unwrap_or_default();
            }
            if y > 0 {
               res += (yeet_the_number(&mut grid, x, y - 1))
                  .parse::<i64>()
                  .unwrap_or_default();
            }
            if y < sz - 1 {
               res += (yeet_the_number(&mut grid, x, y + 1))
                  .parse::<i64>()
                  .unwrap_or_default();
            }
         }
      }
   }

   res.to_string()
}

fn part_2(input: &str, _is_test: bool) -> String {
   let mut grid: Vec<Vec<char>> = input.lines().map(|s| s.chars().collect()).collect();
   let sz = grid.len();
   let mut res = 0;

   for y in 0..sz {
      for x in 0..sz {
         if grid[y][x] == '*' {
            let mut ary = vec![0 as i64; 8];
            if x > 0 {
               if y < sz - 1 {
                  ary.push((yeet_the_number(&mut grid, x - 1, y + 1))
                     .parse::<i64>()
                     .unwrap_or_default());
               }
               if y > 0 {
                  ary.push((yeet_the_number(&mut grid, x - 1, y - 1))
                     .parse::<i64>()
                     .unwrap_or_default());
               }
               ary.push((yeet_the_number(&mut grid, x - 1, y))
                  .parse::<i64>()
                  .unwrap_or_default());
            }
            if x < sz - 1 {
               if y < sz - 1 {
                  ary.push((yeet_the_number(&mut grid, x + 1, y + 1))
                     .parse::<i64>()
                     .unwrap_or_default());
               }
               if y > 0 {
                  ary.push((yeet_the_number(&mut grid, x + 1, y - 1))
                     .parse::<i64>()
                     .unwrap_or_default());
               }
               ary.push((yeet_the_number(&mut grid, x + 1, y))
                  .parse::<i64>()
                  .unwrap_or_default());
            }
            if y > 0 {
               ary.push((yeet_the_number(&mut grid, x, y - 1))
                  .parse::<i64>()
                  .unwrap_or_default());
            }
            if y < sz - 1 {
               ary.push((yeet_the_number(&mut grid, x, y + 1))
                  .parse::<i64>()
                  .unwrap_or_default());
            }

            ary = ary.iter().filter(|e| **e > 0).copied().collect();
            if ary.len() == 2 {
               res += ary[0] * ary[1];
            }
         }
      }
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
