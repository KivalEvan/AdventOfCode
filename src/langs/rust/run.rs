mod input;
pub mod options;

struct SolutionWrapper {
   tag: String,
   func: fn(&str, bool) -> String,
   path: String,
   test: String,
   iteration: usize,
   options: options::SolutionOptions,
   result: String,
   elapsed: [u128; 2],
   bench: [[f64; 3]; 3],
}

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

fn print_result(solution: &SolutionWrapper) -> &SolutionWrapper {
   if solution.iteration == 1 {
      println!("\n{}: (ms) IO > Part > Overall", solution.tag);
      println!(
         "Timer: {:.3} > {:.3} > {:.3}",
         solution.bench[0][2], solution.bench[1][2], solution.bench[2][2]
      );
   } else {
      println!("\n{}: (ms) min..max avg", solution.tag);
      println!(
         "IO: {} .. {} - {}",
         solution.bench[0][0], solution.bench[0][1], solution.bench[0][2]
      );
      println!(
         "Part: {} .. {} - {}",
         solution.bench[1][0], solution.bench[1][1], solution.bench[1][2]
      );
      println!(
         "Overall: {} .. {} - {}",
         solution.bench[2][0], solution.bench[2][1], solution.bench[2][2]
      );
   }
   println!("Result: {}", solution.result);

   solution
}

fn execute(solution: &mut SolutionWrapper) -> &SolutionWrapper {
   let is_test = solution.tag.starts_with("Test");
   let (input, elapsed_io) = timer(|| {
      if solution.options.has_io {
         solution.path.to_string()
      } else {
         input::get_input(&solution.path)
      }
   });
   let (result, elapsed_part) = timer(|| (solution.func)(&input, is_test));

   solution.result = result;
   solution.elapsed = [elapsed_io, elapsed_part];

   solution
}

fn perform(solution: &mut SolutionWrapper) -> &SolutionWrapper {
   let mut times_io: Vec<u128> = vec![0; solution.iteration as usize];
   let mut times_part: Vec<u128> = vec![0; solution.iteration as usize];
   let mut times_all: Vec<u128> = vec![0; solution.iteration as usize];

   for i in 0..solution.iteration {
      execute(solution);
      times_io[i] = solution.elapsed[0];
      times_part[i] = solution.elapsed[1];
      times_all[i] = solution.elapsed[0] + solution.elapsed[1];
   }

   let min = times_io.iter().min().unwrap().to_owned() as f64 / 1000.0;
   let max = times_io.iter().max().unwrap().to_owned() as f64 / 1000.0;
   let avg = times_io.iter().sum::<u128>() as f64 / solution.iteration as f64 / 1000.0;
   solution.bench[0] = [min, max, avg];

   let min = times_part.iter().min().unwrap().to_owned() as f64 / 1000.0;
   let max = times_part.iter().max().unwrap().to_owned() as f64 / 1000.0;
   let avg = times_part.iter().sum::<u128>() as f64 / solution.iteration as f64 / 1000.0;
   solution.bench[1] = [min, max, avg];

   let min = times_all.iter().min().unwrap().to_owned() as f64 / 1000.0;
   let max = times_all.iter().max().unwrap().to_owned() as f64 / 1000.0;
   let avg = times_all.iter().sum::<u128>() as f64 / solution.iteration as f64 / 1000.0;
   solution.bench[2] = [min, max, avg];

   solution
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
   let iteration = if args.len() > 2 {
      args[2].parse::<usize>().unwrap()
   } else {
      1
   };

   let answers = input::get_answers(&path_answers);
   let mut solutions: [SolutionWrapper; 4] = [
      SolutionWrapper {
         tag: "Test 1".to_string(),
         func: part_1,
         path: path_input_test_1.clone(),
         test: answers.0,
         iteration,
         options: options.clone(),
         result: String::new(),
         elapsed: [0, 0],
         bench: [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
      },
      SolutionWrapper {
         tag: "Test 1".to_string(),
         func: part_1,
         path: path_input_main.clone(),
         test: answers.1,
         iteration,
         options: options.clone(),
         result: String::new(),
         elapsed: [0, 0],
         bench: [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
      },
      SolutionWrapper {
         tag: "Test 2".to_string(),
         func: part_2,
         path: path_input_test_2.clone(),
         test: answers.2,
         iteration,
         options: options.clone(),
         result: String::new(),
         elapsed: [0, 0],
         bench: [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
      },
      SolutionWrapper {
         tag: "Test 2".to_string(),
         func: part_2,
         path: path_input_main.clone(),
         test: answers.3,
         iteration,
         options: options.clone(),
         result: String::new(),
         elapsed: [0, 0],
         bench: [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
      },
   ];

   solutions
      .iter_mut()
      .map(|ele| perform(ele))
      .for_each(|ele| {
         print_result(ele);
         test(&ele.result, &ele.test);
      });

   return;
}
