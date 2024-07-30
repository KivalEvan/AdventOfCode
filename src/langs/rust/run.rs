mod input;
pub mod options;

fn test(result: &String, expected: &String) {
   if expected == "" {
      return;
   }
   if result != expected {
      println!("Expected {} but got {}", expected, result);
      panic!("Test failed");
   }
}

fn timer<F: Fn() -> String>(cb: F) -> (String, u128) {
   let now = std::time::Instant::now();
   let result = cb();
   (result, now.elapsed().as_micros())
}

fn perform(tag: &str, fn_part: fn(&str, bool) -> String, path: &str, has_io: bool) -> String {
   println!("\n\\ {}", tag);
   let is_test = tag.starts_with("Test");
   let (input, elapsed_io) = timer(|| {
      if has_io {
         path.to_string()
      } else {
         input::get_input(path)
      }
   });
   let (result, elapsed_part) = timer(|| fn_part(&input, is_test));

   println!(" -- Time taken (ms):");
   println!(" | IO > PART > ALL");
   println!(
      " | {:.3} > {:.3} > {:.3}",
      elapsed_io as f64 / 1000.0,
      elapsed_part as f64 / 1000.0,
      (elapsed_io + elapsed_part) as f64 / 1000.0
   );
   println!(" / Result: {}", result);
   result
}

fn bench(tag: &str, fn_part: fn(&str, bool) -> String, path: &str, it: i32, has_io: bool) {
   let is_test = tag.starts_with("Test");

   let mut times_io: Vec<u128> = vec![0; it as usize];
   let mut times_part: Vec<u128> = vec![0; it as usize];
   let mut times_all: Vec<u128> = vec![0; it as usize];

   for i in 0..it {
      let (input, elapsed_io) = timer(|| {
         if has_io {
            path.to_string()
         } else {
            input::get_input(path)
         }
      });
      let (_, elapsed_part) = timer(|| fn_part(&input, is_test));
      times_io[i as usize] = elapsed_io;
      times_part[i as usize] = elapsed_part;
      times_all[i as usize] = elapsed_io + elapsed_part;
   }
   println!("\nBenchmarking {} (ms) min..max avg", tag);
   let min = times_io.iter().min().unwrap().to_owned() as f64 / 1000.0;
   let max = times_io.iter().max().unwrap().to_owned() as f64 / 1000.0;
   let avg = times_io.iter().sum::<u128>() as f64 / it as f64 / 1000.0;
   println!("IO: {} .. {} - {}", min, max, avg);
   let min = times_part.iter().min().unwrap().to_owned() as f64 / 1000.0;
   let max = times_part.iter().max().unwrap().to_owned() as f64 / 1000.0;
   let avg = times_part.iter().sum::<u128>() as f64 / it as f64 / 1000.0;
   println!("Part: {} .. {} - {}", min, max, avg);
   let min = times_all.iter().min().unwrap().to_owned() as f64 / 1000.0;
   let max = times_all.iter().max().unwrap().to_owned() as f64 / 1000.0;
   let avg = times_all.iter().sum::<u128>() as f64 / it as f64 / 1000.0;
   println!("Overall: {} .. {} - {}", min, max, avg);
}

pub fn run(
   args: Vec<&str>,
   part_1: fn(&str, bool) -> String,
   part_2: fn(&str, bool) -> String,
   options: options::SolutionOptions,
) {
   let path_answers = [args[1], "/answers.txt"].join("");
   let path_input_test_1 = [args[1], "/test1.txt"].join("");
   let path_input_test_2 = if options.has_alternate {
      [args[1], "/test2.txt"].join("")
   } else {
      path_input_test_1.clone()
   };
   let path_input_main = [args[1], "/input.txt"].join("");

   let it_bench = if args.len() > 2 {
      args[2].parse::<i32>().unwrap()
   } else {
      0
   };
   if it_bench > 0 {
      bench(
         "Test 1",
         part_1,
         &path_input_test_1,
         it_bench,
         options.has_io,
      );
      bench("Part 1", part_1, &path_input_main, it_bench, options.has_io);
      bench(
         "Test 2",
         part_2,
         &path_input_test_2,
         it_bench,
         options.has_io,
      );
      bench("Part 2", part_2, &path_input_main, it_bench, options.has_io);
      return;
   }

   let answers = input::get_answers(&path_answers);
   let result = perform("Test 1", part_1, &path_input_test_1, options.has_io);
   test(&result, &answers.0);
   let result = perform("Part 1", part_1, &path_input_main, options.has_io);
   test(&result, &answers.1);
   let result = perform("Test 2", part_2, &path_input_test_2, options.has_io);
   test(&result, &answers.2);
   let result = perform("Part 2", part_2, &path_input_main, options.has_io);
   test(&result, &answers.3);
}
