let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let ( +/ ) = Int64.add
let ( -/ ) = Int64.sub
let is_num c = c >= '0' && c <= '9'

let parse_input (input : string) (single : bool) =
  let parsed = String.split_on_char '\n' input in
  let header =
    List.hd parsed
    |> String.split_on_char ':'
    |> List.tl
    |> List.hd
    |> String.split_on_char ' '
    |> List.filter (( <> ) "")
    |> List.map Int64.of_string
  in
  let seed_ranges =
    if single
    then List.map (fun x -> x, x) header
    else
      List.tl header
      |> List.mapi (fun i _ ->
        List.nth header i, List.nth header i +/ List.nth header (i + 1))
      |> List.filteri (fun i _ -> i mod 2 = 0)
  in
  let src_to_dest_ranges = Array.make 7 [] in
  let rec loop (i : int) (idx : int) =
    if i >= List.length parsed
    then ()
    else if List.nth parsed i = ""
    then loop (i + 1) (idx + 1)
    else (
      let line = List.nth parsed i in
      if is_num (String.get line 0)
      then (
        let nums =
          String.split_on_char ' ' line |> List.map Int64.of_string |> Array.of_list
        in
        let dest = nums.(0), nums.(0) +/ nums.(2) -/ 1L in
        let src = nums.(1), nums.(1) +/ nums.(2) -/ 1L in
        src_to_dest_ranges.(idx) <- (src, dest) :: src_to_dest_ranges.(idx);
        loop (i + 1) idx)
      else loop (i + 1) idx)
  in
  loop 3 0;
  Array.of_list seed_ranges, src_to_dest_ranges
;;

let solve (input : string) (single : bool) : string =
  let seed_ranges, src_to_dest_ranges = parse_input input single in
  let seed_ranges = ref seed_ranges in
  src_to_dest_ranges
  |> Array.iter (fun (groups : ((int64 * int64) * (int64 * int64)) list) ->
    groups
    |> List.iter (fun ((src, _) : (int64 * int64) * (int64 * int64)) ->
      let new_seeds = ref [] in
      !seed_ranges
      |> Array.iteri (fun i ((mn, mx) : int64 * int64) ->
        if mn < fst src && fst src < mx
        then (
          new_seeds := (mn, fst src -/ 1L) :: !new_seeds;
          !seed_ranges.(i) <- fst src, mx)
        else ();
        if mn < snd src && snd src < mx
        then (
          new_seeds := (snd src +/ 1L, mx) :: !new_seeds;
          !seed_ranges.(i) <- mn, snd src)
        else ());
      seed_ranges := !new_seeds |> Array.of_list |> Array.append !seed_ranges);
    !seed_ranges
    |> Array.iteri (fun i ((mn, mx) : int64 * int64) ->
      let found =
        groups
        |> List.find_opt (fun ((src, _) : (int64 * int64) * (int64 * int64)) ->
          fst src <= mn && mn <= snd src && mx >= fst src && snd src >= mx)
      in
      if Option.is_some found
      then (
        let content = Option.get found in
        let diff = fst (snd content) -/ fst (fst content) in
        !seed_ranges.(i) <- mn +/ diff, mx +/ diff)
      else ()));
  !seed_ranges
  |> Array.map (fun r -> fst r)
  |> Array.fold_left min Int64.max_int
  |> Int64.to_string
;;

let part_1 (input : string) (_is_test : bool) : string = solve input true
let part_2 (input : string) (_is_test : bool) : string = solve input false
let () = Aoc.run Sys.argv part_1 part_2 options
