let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false

let ( */ ) = Int64.mul

let ohnomath (b : float) (c : float) : int64 =
  let epsilon = 0.001 in
  let mn = floor (((b +. sqrt (abs_float ((b *. b) -. (4. *. c)))) /. 2.) -. epsilon) in
  let mx = ceil (((b -. sqrt (abs_float ((b *. b) -. (4. *. c)))) /. 2.) +. epsilon) in
  Int64.of_float (mn -. mx +. 1.)
;;

let part_1 (input : string) (_is_test : bool) : string =
  let td =
    input
    |> String.split_on_char '\n'
    |> List.map (fun x ->
      x
      |> String.split_on_char ':'
      |> List.tl
      |> List.hd
      |> String.split_on_char ' '
      |> List.filter (fun s -> String.length s > 0)
      |> List.map float_of_string
      |> Array.of_list)
    |> Array.of_list
  in
  let rec loop (res : int64) (i : int) : int64 =
    if i >= Array.length td.(0)
    then res
    else loop (res */ ohnomath td.(0).(i) td.(1).(i)) (i + 1)
  in
  loop 1L 0 |> Int64.to_string
;;

let part_2 (input : string) (_is_test : bool) : string =
  let td =
    input
    |> String.split_on_char '\n'
    |> List.map (fun x ->
      x
      |> String.split_on_char ':'
      |> List.tl
      |> List.hd
      |> String.split_on_char ' '
      |> List.filter (fun s -> String.length s > 0)
      |> String.concat ""
      |> float_of_string)
    |> Array.of_list
  in
  ohnomath td.(0) td.(1) |> Int64.to_string
;;

let () = Aoc.run Sys.argv part_1 part_2 options
