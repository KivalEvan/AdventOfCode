let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let get_direction (c : char) : int = if c = 'R' then 1 else -1

let parse_input (input : string) : int list =
  input
  |> String.split_on_char '\n'
  |> List.map (fun line ->
    (String.sub line 1 (String.length line - 1) |> int_of_string)
    * (String.get line 0 |> get_direction))
;;

let modulo x y =
  let r = x mod y in
  if r < 0 then r + y else r
;;

let solve (input : string) (_ : bool) (p2 : bool) : string =
  let dial = ref 50 in
  parse_input input
  |> List.map (fun num ->
    if p2
    then (
      let newDial = !dial + num in
      let zero = (abs newDial / 100) + if !dial != 0 && newDial <= 0 then 1 else 0 in
      dial := modulo newDial 100;
      zero)
    else (
      dial := !dial + num;
      if modulo !dial 100 == 0 then 1 else 0))
  |> List.fold_left ( + ) 0
  |> string_of_int
;;

let part_1 (input : string) (_is_test : bool) : string = solve input true false
let part_2 (input : string) (_is_test : bool) : string = solve input true true
let () = Aoc.run Sys.argv part_1 part_2 options
