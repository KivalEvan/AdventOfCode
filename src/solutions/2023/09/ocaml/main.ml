let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false

let ( +/ ) = Int64.add
let ( -/ ) = Int64.sub

let difference ary sz =
  for i = 0 to sz - 1 do
    ary.(i) <- ary.(i + 1) -/ ary.(i)
  done;
  ary
;;

let rec extrapolate ary sz =
  let z = sz - 1 in
  let last = ary.(z) in
  if z = 0 then last else extrapolate (difference ary z) z +/ last
;;

let part_1 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map (fun x ->
    x |> String.split_on_char ' ' |> List.map Int64.of_string |> Array.of_list)
  |> List.map (fun x -> extrapolate x (Array.length x))
  |> List.fold_left ( +/ ) 0L
  |> Int64.to_string
;;

let part_2 (input : string) (_is_test : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.map (fun x ->
    x |> String.split_on_char ' ' |> List.map Int64.of_string |> List.rev |> Array.of_list)
  |> List.map (fun x -> extrapolate x (Array.length x))
  |> List.fold_left ( +/ ) 0L
  |> Int64.to_string
;;

let () = Aoc.run Sys.argv part_1 part_2 options
