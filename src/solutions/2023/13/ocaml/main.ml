let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let part_1 (input : string) (_is_test : bool) : string = input
let part_2 (input : string) (_is_test : bool) : string = input
let () = Aoc.run Sys.argv part_1 part_2 options
