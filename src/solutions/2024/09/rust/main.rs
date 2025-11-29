extern crate aoc_core;
use std::{env, iter::FromIterator};

fn get_options() -> aoc_core::options::SolutionOptions {
   aoc_core::options::SolutionOptions {
      ..Default::default()
   }
}

struct Disk {
   size: u64,
   free: u64,
   moved: u64,
   space: Vec<u64>,
}

fn solve(input: &str, p2: bool) -> String {
   let mut disks = Vec::new();
   let chars = input.chars().collect::<Vec<char>>();
   for i in 0..chars.len() {
      if i % 2 == 1 {
         continue;
      }
      let mut disk = Disk {
         size: chars[i].to_digit(10).unwrap() as u64,
         free: 0,
         space: Vec::new(),
         moved: 0,
      };
      if i + 1 == input.len() {
         disks.push(disk);
      } else {
         disk.free = chars[i + 1].to_digit(10).unwrap() as u64;
         disks.push(disk);
      }
   }

   let mut left = 0;
   let mut right = disks.len() - 1;
   let mut first_pos = 0;
   if p2 {
      while left < right {
         if disks[left].free >= disks[right].size {
            for _ in 0..disks[right].size {
               disks[left].space.push(right as u64);
            }
            disks[left].free -= disks[right].size;
            disks[right].moved += disks[right].size;
            disks[right].size = 0;
            left = first_pos;
            right-= 1;
         } else {
            left+= 1;
         }

         if disks[first_pos].free == 0 {
            first_pos = left;
         }

         if left == right {
            left = first_pos;
            right-= 1;
         }
      }
   } else {
      while left < right {
         if disks[left].free > 0 && disks[right].size > 0 {
            disks[left].space.push(right as u64);
            disks[left].free-=1;
            disks[right].size-=1;
         }

         if disks[right].size == 0 {
            right-=1;
         }
         if disks[left].free == 0 {
            left+=1;
         }
      }
   }

   let mut total = 0;
   let mut pos = 0;
   for i in 0..disks.len() {
      pos += disks[i].moved;
      for _ in 0..disks[i].size {
         total += pos * i as u64;
         pos+= 1;
      }
      for j in 0..disks[i].space.len() {
         total += pos * disks[i].space[j];
         pos += 1;
      }
      pos += disks[i].free;
   }

   return total.to_string();
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
