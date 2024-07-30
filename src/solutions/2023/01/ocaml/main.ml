let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" true;;
Hashtbl.add options "has_io" false

let is_digit = function
  | '0' .. '9' -> true
  | _ -> false
;;

let fetch_num_p1 (s : string) : int =
  let nums = s |> String.to_seq |> Seq.filter is_digit |> Array.of_seq in
  int_of_string (String.make 1 nums.(0) ^ String.make 1 nums.(Array.length nums - 1))
;;

let part_1 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map fetch_num_p1
  |> List.fold_left ( + ) 0
  |> string_of_int
;;

let get_num (s : string) : char =
  if String.starts_with ~prefix:"zero" s
  then '0'
  else if String.starts_with ~prefix:"one" s
  then '1'
  else if String.starts_with ~prefix:"two" s
  then '2'
  else if String.starts_with ~prefix:"three" s
  then '3'
  else if String.starts_with ~prefix:"four" s
  then '4'
  else if String.starts_with ~prefix:"five" s
  then '5'
  else if String.starts_with ~prefix:"six" s
  then '6'
  else if String.starts_with ~prefix:"seven" s
  then '7'
  else if String.starts_with ~prefix:"eight" s
  then '8'
  else if String.starts_with ~prefix:"nine" s
  then '9'
  else ' '
;;

let rec fetch_num s i r : char =
  if s <> ""
  then (
    let c = String.get s i in
    let d = String.sub s i (String.length s - i) |> get_num in
    if is_digit c
    then c
    else if is_digit d
    then d
    else fetch_num s (if r then i - 1 else i + 1) r)
  else ' '
;;

let fetch_num_p2 (s : string) : int =
  let first : char = fetch_num s 0 false in
  let last : char = fetch_num s (String.length s - 1) true in
  int_of_string (String.make 1 first ^ String.make 1 last)
;;

let part_2 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map fetch_num_p2
  |> List.fold_left ( + ) 0
  |> string_of_int
;;

let () = Aoc.run Sys.argv part_1 part_2 options
