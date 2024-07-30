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

let perform
  (tag : string)
  (func : string -> bool -> string)
  (path : string)
  (has_io : bool)
  : string
  =
  Printf.printf "\n\\ %s\n" tag;
  let is_test = tag |> String.starts_with ~prefix:"Test" in
  let input, elapsedIo =
    timer (fun () -> if has_io then path else Input.get_input path)
  in
  let result, elapsedPart = timer (fun () -> func input is_test) in
  print_endline " -- Time Taken (ms):\n | IO > PART > ALL";
  Printf.printf
    " | %.3f > %.3f > %.3f\n"
    (elapsedIo *. 1000.0)
    (elapsedPart *. 1000.0)
    ((elapsedIo +. elapsedPart) *. 1000.0);
  Printf.printf "/ Result: %s\n" result;
  result
;;

let bench
  (tag : string)
  (func : string -> bool -> string)
  (path : string)
  (it : int)
  (has_io : bool)
  : unit
  =
  Printf.printf "\nBenchmarking %s (ms) min..max avg\n" tag;
  let is_test = tag |> String.starts_with ~prefix:"Test" in
  let times_io = Array.init it (fun _ -> 0.0) in
  let times_part = Array.init it (fun _ -> 0.0) in
  let times_overall = Array.init it (fun _ -> 0.0) in
  for i = 0 to it - 1 do
    let input, elapsed_io =
      timer (fun () -> if has_io then path else Input.get_input path)
    in
    let _, elapsed_part = timer (fun () -> func input is_test) in
    times_io.(i) <- elapsed_io;
    times_part.(i) <- elapsed_part;
    times_overall.(i) <- elapsed_io +. elapsed_part
  done;
  let mn = Array.fold_left min Float.max_float times_io in
  let mx = Array.fold_left max 0.0 times_io in
  let avg = Array.fold_left ( +. ) 0.0 times_io /. float_of_int it in
  Printf.printf "IO: %.3f .. %.3f - %.3f\n" (mn *. 1000.0) (mx *. 1000.0) (avg *. 1000.0);
  let mn = Array.fold_left min Float.max_float times_part in
  let mx = Array.fold_left max 0.0 times_part in
  let avg = Array.fold_left ( +. ) 0.0 times_part /. float_of_int it in
  Printf.printf "Part: %.3f .. %.3f - %.3f\n" (mn *. 1000.0) (mx *. 1000.0) (avg *. 1000.0);
  let mn = Array.fold_left min Float.max_float times_overall in
  let mx = Array.fold_left max 0.0 times_overall in
  let avg = Array.fold_left ( +. ) 0.0 times_overall /. float_of_int it in
  Printf.printf
    "Overall: %.3f .. %.3f - %.3f\n"
    (mn *. 1000.0)
    (mx *. 1000.0)
    (avg *. 1000.0)
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
  let has_io = Hashtbl.find options "has_io" in
  let path = args.(1) in
  let path_answers = path ^ "/answers.txt" in
  let path_input_test1 = path ^ "/test1.txt" in
  let path_input_test2 =
    if has_alternate then path ^ "/test2.txt" else path_input_test1
  in
  let path_input_main = path ^ "/input.txt" in
  let it_bench = if Array.length args > 2 then int_of_string args.(2) else 0 in
  if it_bench > 0
  then (
    bench "Test 1" part_1 path_input_test1 it_bench has_io;
    bench "Part 1" part_1 path_input_main it_bench has_io;
    bench "Test 2" part_2 path_input_test2 it_bench has_io;
    bench "Part 2" part_2 path_input_main it_bench has_io)
  else (
    let answers = Input.get_answers path_answers in
    perform "Test 1" part_1 path_input_test1 has_io |> test answers.(0);
    perform "Part 1" part_1 path_input_main has_io |> test answers.(1);
    perform "Test 2" part_2 path_input_test2 has_io |> test answers.(2);
    perform "Part 2" part_2 path_input_main has_io |> test answers.(3))
;;
