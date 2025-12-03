let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let solve (input : string) (is_test : bool) (p2 : bool) : string = ""
let part_1 (input : string) (_is_test : bool) : string = solve input true false
let part_2 (input : string) (_is_test : bool) : string = solve input true true
let () = Aoc.run Sys.argv part_1 part_2 options
