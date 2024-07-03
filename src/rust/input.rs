use std::io::prelude::*;
use std::fs::File;

pub fn get_input(path: &str) -> String {
   let mut f = File::open(path).unwrap();
   let mut s = String::new();
   f.read_to_string(&mut s).unwrap();
   s.trim_end().to_string()
}

pub fn get_answers(path: &str) -> (String, String, String, String) {
   let mut f = File::open(path).unwrap();
   let mut s = String::new();
   f.read_to_string(&mut s).unwrap();
   let v: Vec<&str> = s.trim_end().split('\n').collect();
   (v[0].to_string(), v[1].to_string(), v[2].to_string(), v[3].to_string())
}