let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false

let ( +/ ) = Int64.add
let ( -/ ) = Int64.sub
let ( */ ) = Int64.mul
let rec int64_pow x y = if y = 0L then 1L else x */ int64_pow x (y -/ 1L)

let part_1 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map (fun x ->
    let nums =
      x
      |> String.split_on_char ':'
      |> List.tl
      |> List.hd
      |> String.split_on_char '|'
      |> List.map (fun s ->
        s
        |> String.split_on_char ' '
        |> List.filter (fun s -> String.length s > 0)
        |> List.map int_of_string
        |> Array.of_list)
      |> Array.of_list
    in
    let rec loop (i : int) (j : int64) : int64 =
      if i >= Array.length nums.(0)
      then j
      else if Array.mem nums.(0).(i) nums.(1)
      then loop (i + 1) (j +/ 1L)
      else loop (i + 1) j
    in
    let res = loop 0 (-1L) in
    if res = -1L then 0L else int64_pow 2L res)
  |> List.fold_left ( +/ ) 0L
  |> Int64.to_string
;;

let part_2 (input : string) (_is_test : bool) : string =
  let lines = input |> String.split_on_char '\n' in
  let instances = Array.make (List.length lines) 1L in
  lines
  |> List.mapi (fun i x ->
    let nums =
      x
      |> String.split_on_char ':'
      |> List.tl
      |> List.hd
      |> String.split_on_char '|'
      |> List.map (fun s ->
        s
        |> String.split_on_char ' '
        |> List.filter (fun s -> String.length s > 0)
        |> List.map int_of_string
        |> Array.of_list)
      |> Array.of_list
    in
    let rec loop (i : int) (j : int) : int =
      if i >= Array.length nums.(0)
      then j
      else if Array.mem nums.(0).(i) nums.(1)
      then loop (i + 1) (j + 1)
      else loop (i + 1) j
    in
    let rec aggregate (j : int) : int =
      if j > 0
      then (
        instances.(i + j) <- instances.(i + j) +/ instances.(i);
        aggregate (j - 1))
      else j
    in
    aggregate (loop 0 0))
  |> ignore;
  instances |> Array.fold_left ( +/ ) 0L |> Int64.to_string
;;

let () = Aoc.run Sys.argv part_1 part_2 options
