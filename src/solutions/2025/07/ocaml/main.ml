let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let solve (input : string) (_ : bool) (p2 : bool) : string =
  let total = ref 0 in
  let len = String.index input '\n' in
  let buffer = Array.make 141 0 in
  buffer.(String.index input 'S') <- 1;
  for i = 0 to String.length input - 1 do
    if input.[i] == '^'
    then (
      let x = i mod (len + 1) in
      if buffer.(x) > 0 then total := !total + 1;
      buffer.(x - 1) <- buffer.(x - 1) + buffer.(x);
      buffer.(x + 1) <- buffer.(x + 1) + buffer.(x);
      buffer.(x) <- 0)
  done;
  if p2 then string_of_int (Array.fold_left ( + ) 0 buffer) else string_of_int !total
;;

let part_1 (input : string) (_is_test : bool) : string = solve input true false
let part_2 (input : string) (_is_test : bool) : string = solve input true true
let () = Aoc.run Sys.argv part_1 part_2 options
