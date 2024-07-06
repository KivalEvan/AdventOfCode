let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false

let ( +/ ) = Int64.add
let ( */ ) = Int64.mul

let is_symbol c =
  match c with
  | '*' | '$' | '=' | '#' | '%' | '/' | '&' | '+' | '-' | '@' -> true
  | _ -> false
;;

let is_num c = c >= '0' && c <= '9'

let to_grid (str : string) : char array array =
  str
  |> String.split_on_char '\n'
  |> List.map (fun x -> x |> String.to_seq |> Array.of_seq)
  |> Array.of_list
;;

let rec yeet_the_number (grid : char array array) (res : string) (x : int) (y : int)
  : string
  =
  if is_num grid.(y).(x)
  then (
    let c = String.make 1 grid.(y).(x) in
    grid.(y).(x) <- '.';
    let left = if x > 0 then yeet_the_number grid res (x - 1) y else "" in
    let right =
      if x < Array.length grid.(y) - 1 then yeet_the_number grid res (x + 1) y else ""
    in
    left ^ c ^ right)
  else res
;;

let start_to_yeet (grid : char array array) (x : int) (y : int) : int64 =
  if x < 0 || x >= Array.length grid.(y) || y < 0 || y >= Array.length grid
  then 0L
  else (
    let n = yeet_the_number grid "" x y in
    if n = "" then 0L else Int64.of_string n)
;;

let grid_enum = [| -1, -1; 0, -1; 1, -1; -1, 0; 1, 0; -1, 1; 0, 1; 1, 1 |]

let part_1 (input : string) (_is_test : bool) : string =
  let grid = to_grid input in
  let height = Array.length grid in
  let width = Array.length grid.(0) in
  let rec loop_y (x : int) (y : int) (res : int64) : int64 =
    let rec loop_x (x : int) (y : int) (res : int64) : int64 =
      if x = width
      then res
      else if is_symbol grid.(y).(x)
      then
        loop_x
          (x + 1)
          y
          (grid_enum
           |> Array.fold_left
                (fun res (dx, dy) -> res +/ start_to_yeet grid (x + dx) (y + dy))
                res)
      else loop_x (x + 1) y res
    in
    if y = height then res else loop_y x (y + 1) (loop_x 0 y res)
  in
  loop_y 0 0 0L |> Int64.to_string
;;

let part_2 (input : string) (_is_test : bool) : string =
  let grid = to_grid input in
  let height = Array.length grid in
  let width = Array.length grid.(0) in
  let rec loop_y (x : int) (y : int) (res : int64) : int64 =
    let rec loop_x (x : int) (y : int) (res : int64) : int64 =
      if x = width
      then res
      else if grid.(y).(x) = '*'
      then (
        let ary =
          Array.make 8 0L
          |> Array.mapi (fun i _ ->
            start_to_yeet grid (x + fst grid_enum.(i)) (y + snd grid_enum.(i)))
          |> Array.to_seq
          |> Seq.filter (fun x -> x <> 0L)
          |> Array.of_seq
        in
        if Array.length ary = 2
        then loop_x (x + 1) y (res +/ (ary.(0) */ ary.(1)))
        else loop_x (x + 1) y res)
      else loop_x (x + 1) y res
    in
    if y = height then res else loop_y x (y + 1) (loop_x 0 y res)
  in
  loop_y 0 0 0L |> Int64.to_string
;;

let () = Aoc.run Sys.argv part_1 part_2 options
