let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let make_sequences (game : string list) : int * int =
  ( int_of_string (List.hd game)
  , (String.get (List.tl game |> List.hd) 0 |> Char.code) mod 3 )
;;

let get_sequences (game : string) : (int * int) array =
  game
  |> String.split_on_char ':'
  |> List.tl
  |> List.hd
  |> String.to_seq
  |> Seq.map (fun c -> if c = ',' then ';' else c)
  |> String.of_seq
  |> String.split_on_char ';'
  |> List.map (fun x -> x |> String.trim |> String.split_on_char ' ' |> make_sequences)
  |> Array.of_list
;;

let rgb_p1 = [| 12; 13; 14 |]

let do_part_1 (idx : int) (cubes : (int * int) array) : int =
  let rec loop (i : int) : int =
    if i >= Array.length cubes
    then idx + 1
    else (
      let cube = cubes.(i) in
      let value = fst cube in
      let color = snd cube in
      if value > rgb_p1.(color) then 0 else loop (i + 1))
  in
  loop 0
;;

let part_1 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map get_sequences
  |> List.mapi do_part_1
  |> List.fold_left ( + ) 0
  |> string_of_int
;;

let do_part_2 cubes : int =
  let rec loop (i : int) (ary : int array) : int array =
    if i >= Array.length cubes
    then ary
    else (
      let cube = Array.get cubes i in
      let value = fst cube in
      let color = snd cube in
      if ary.(color) < value
      then (
        ary.(color) <- value;
        loop (i + 1) ary)
      else loop (i + 1) ary)
  in
  loop 0 [| 0; 0; 0 |] |> Array.fold_left ( * ) 1
;;

let part_2 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map get_sequences
  |> List.map do_part_2
  |> List.fold_left ( + ) 0
  |> string_of_int
;;

let () = Aoc.run Sys.argv part_1 part_2 options
