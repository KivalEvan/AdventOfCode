let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false

let ( +/ ) = Int64.add
let ( */ ) = Int64.mul

let get_ranking c =
  match c with
  | 'A' -> 13
  | 'K' -> 12
  | 'Q' -> 11
  | 'J' -> 10
  | 'T' -> 9
  | '9' -> 8
  | '8' -> 7
  | '7' -> 6
  | '6' -> 5
  | '5' -> 4
  | '4' -> 3
  | '3' -> 2
  | '2' -> 1
  | '1' -> 0
  | _ -> 0
;;

let high_card = 0
let one_pair = 1
let two_pair = 2
let three_of_a_kind = 3
let full_house = 4
let four_of_a_kind = 5
let five_of_a_kind = 6

let get_type (cards : string) : int =
  let values = Array.make 14 0 in
  for i = 0 to 4 do
    values.(get_ranking cards.[i]) <- values.(get_ranking cards.[i]) + 1
  done;
  let _ =
    if values.(0) > 0
    then (
      let temp = values.(0) in
      values.(0) <- 0;
      let mx = values |> Array.fold_left max 0 in
      let idx = values |> Array.find_index (fun v -> v = mx) in
      if Option.is_some idx
      then values.(Option.get idx) <- values.(Option.get idx) + temp
      else ())
    else ()
  in
  let new_values = values |> Array.to_list |> List.filter (fun v -> v > 0) in
  if List.length new_values = 1
  then five_of_a_kind
  else if List.length new_values = 4
  then one_pair
  else if List.length new_values = 5
  then high_card
  else (
    let mn = List.fold_left min 5 new_values in
    let mx = List.fold_left max 0 new_values in
    if mn = 1
    then if mx = 2 then two_pair else if mx = 3 then three_of_a_kind else four_of_a_kind
    else full_house)
;;

let parse_input (input : string) (joker : bool) =
  let cards =
    input
    |> String.split_on_char '\n'
    |> List.map (fun line ->
      let line = String.split_on_char ' ' line |> Array.of_list in
      let cards =
        if joker
        then
          line.(0)
          |> String.to_seq
          |> Seq.map (fun c -> if c = 'J' then '1' else c)
          |> String.of_seq
        else line.(0)
      in
      cards, Int64.of_string line.(1))
  in
  let groups = Array.make 7 [] in
  cards
  |> List.iter (fun (cards, value) ->
    let idx = get_type cards in
    groups.(idx) <- (cards, value) :: groups.(idx));
  groups
;;

let solve (input : string) (joker : bool) : string =
  let groups = parse_input input joker in
  let rec loop
    (i : int)
    (groups : (string * int64) list array)
    (count : int64)
    (res : int64)
    : int64
    =
    if i = 7
    then res
    else (
      let g =
        groups.(i)
        |> List.sort (fun (c1, _) (c2, _) ->
          let res = ref 0 in
          for j = 0 to 4 do
            let x = get_ranking (String.get c1 j) in
            let y = get_ranking (String.get c2 j) in
            if x <> y && !res = 0 then res := x - y else ()
          done;
          !res)
      in
      let rec loop2 (x : int) (count : int64) (res : int64) =
        if List.length g = x
        then count, res
        else loop2 (x + 1) (count +/ 1L) (res +/ ((List.nth g x |> snd) */ count))
      in
      let new_count, new_res = loop2 0 count res in
      loop (i + 1) groups new_count new_res)
  in
  loop 0 groups 1L 0L |> Int64.to_string
;;

let part_1 (input : string) (_is_test : bool) : string = solve input false
let part_2 (input : string) (_is_test : bool) : string = solve input true
let () = Aoc.run Sys.argv part_1 part_2 options
