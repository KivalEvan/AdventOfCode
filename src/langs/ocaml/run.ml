type solutionwrapper =
  { tag : string
  ; func : string -> bool -> string
  ; path : string
  ; test : string
  ; iteration : int
  ; options : (string, bool) Hashtbl.t
  ; mutable result : string
  ; elapsed : float array
  ; bench : float array array
  }

let get_solution
  (tag : string)
  (func : string -> bool -> string)
  (path : string)
  (test : string)
  (iteration : int)
  (options : (string, bool) Hashtbl.t)
  : solutionwrapper
  =
  { tag
  ; func
  ; path
  ; test
  ; iteration
  ; options
  ; result = ""
  ; elapsed = Array.init 3 (fun _ -> 0.0)
  ; bench = Array.make_matrix 3 3 0.0
  }
;;

let test (expected : string) (actual : string) : unit =
  if actual <> expected
  then (
    Printf.printf "Expected %s but received %s\n" expected actual;
    failwith "Test failed")
  else ()
;;

let timer fn =
  let start = Sys.time () in
  let res = fn () in
  let stop = Sys.time () in
  res, stop -. start
;;

let print_result (solution : solutionwrapper) : solutionwrapper =
  if solution.iteration = 1
  then (
    Printf.printf "\n%s: (ms) IO > Part > Overall\n" solution.tag;
    Printf.printf
      "Timer: %.3f > %.3f > %.3f\n"
      solution.bench.(0).(2)
      solution.bench.(1).(2)
      solution.bench.(2).(2))
  else (
    Printf.printf "\n%s: (ms) min..max avg\n" solution.tag;
    Printf.printf
      "IO: %.3f .. %.3f - %.3f\n"
      solution.bench.(0).(0)
      solution.bench.(0).(1)
      solution.bench.(0).(2);
    Printf.printf
      "Part: %.3f .. %.3f - %.3f\n"
      solution.bench.(1).(0)
      solution.bench.(1).(1)
      solution.bench.(1).(2);
    Printf.printf
      "Overall: %.3f .. %.3f - %.3f\n"
      solution.bench.(2).(0)
      solution.bench.(2).(1)
      solution.bench.(2).(2));
  Printf.printf "Result: %s\n" solution.result;
  solution
;;

let execute (solution : solutionwrapper) : solutionwrapper =
  let is_test = solution.tag |> String.starts_with ~prefix:"Test" in
  let input, elapsedIo =
    timer (fun () ->
      if Hashtbl.find solution.options "has_io"
      then solution.path
      else Input.get_input solution.path)
  in
  let result, elapsedPart = timer (fun () -> solution.func input is_test) in
  solution.result <- result;
  solution.elapsed.(0) <- elapsedIo;
  solution.elapsed.(1) <- elapsedPart;
  solution
;;

let perform (solution : solutionwrapper) : solutionwrapper =
  let times_io = Array.init solution.iteration (fun _ -> 0.0) in
  let times_part = Array.init solution.iteration (fun _ -> 0.0) in
  let times_overall = Array.init solution.iteration (fun _ -> 0.0) in
  for i = 0 to solution.iteration - 1 do
    let _ = execute solution in
    times_io.(i) <- solution.elapsed.(0);
    times_part.(i) <- solution.elapsed.(1);
    times_overall.(i) <- solution.elapsed.(0) +. solution.elapsed.(1)
  done;
  solution.bench.(0).(0) <- Array.fold_left min Float.max_float times_io *. 1000.0;
  solution.bench.(0).(1) <- Array.fold_left max 0.0 times_io *. 1000.0;
  solution.bench.(0).(2)
  <- Array.fold_left ( +. ) 0.0 times_io /. float_of_int solution.iteration *. 1000.0;
  solution.bench.(1).(0) <- Array.fold_left min Float.max_float times_part *. 1000.0;
  solution.bench.(1).(1) <- Array.fold_left max 0.0 times_part *. 1000.0;
  solution.bench.(1).(2)
  <- Array.fold_left ( +. ) 0.0 times_part /. float_of_int solution.iteration *. 1000.0;
  solution.bench.(2).(0) <- Array.fold_left min Float.max_float times_overall *. 1000.0;
  solution.bench.(2).(1) <- Array.fold_left max 0.0 times_overall *. 1000.0;
  solution.bench.(2).(2)
  <- Array.fold_left ( +. ) 0.0 times_overall /. float_of_int solution.iteration *. 1000.0;
  solution
;;

let run
  (args : string array)
  (part_1 : string -> bool -> string)
  (part_2 : string -> bool -> string)
  (options : (string, bool) Hashtbl.t)
  : unit
  =
  if Array.length args < 2 then failwith "No input";
  let has_alternate = Hashtbl.find options "has_alternate" in
  let path = args.(1) in
  let path_answers = path ^ "/answers.txt" in
  let path_input_test1 = path ^ "/test1.txt" in
  let path_input_test2 =
    if has_alternate then path ^ "/test2.txt" else path_input_test1
  in
  let path_input_main = path ^ "/input.txt" in
  let iteration = if Array.length args > 2 then int_of_string args.(2) else 0 in
  let answers = Input.get_answers path_answers in
  let (solutions : solutionwrapper array) =
    Array.make
      4
      { tag = ""
      ; func = (fun _ _ -> "")
      ; path = ""
      ; test = ""
      ; iteration = 0
      ; options = Hashtbl.create 128
      ; result = ""
      ; elapsed = Array.make 3 0.0
      ; bench = Array.make_matrix 3 3 0.0
      }
  in
  solutions.(0)
  <- get_solution "Test 1" part_1 path_input_test1 answers.(0) iteration options;
  solutions.(1)
  <- get_solution "Part 1" part_1 path_input_main answers.(1) iteration options;
  solutions.(2)
  <- get_solution "Test 2" part_2 path_input_test2 answers.(2) iteration options;
  solutions.(3)
  <- get_solution "Part 2" part_2 path_input_main answers.(3) iteration options;
  for i = 0 to 3 do
    let _ = perform solutions.(i) in
    ()
  done;
  for i = 0 to 3 do
    let _ = print_result solutions.(i) in
    test solutions.(i).result solutions.(i).test
  done
;;
