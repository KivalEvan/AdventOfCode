let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" false;;
Hashtbl.add options "has_io" false;;

let solve (input : string) (_ : bool) (p2 : bool) : string =
  input
  |> String.split_on_char '\n'
  |> List.fold_left
       (fun acc line ->
          let res = ref 0 in
          let len = String.length line in
          let start = ref 0 in
          let max = if p2 then 12 else 2 in
          let bytes = Bytes.of_string line in
          for digit = 0 to max - 1 do
            let marked = ref 0 in
            let n = ref 0 in
            let t = max - 1 - digit in
            let l = len - t in
            for it = !start to l - 1 do
              let parsed = Bytes.get_int8 bytes it - 48 in
              if !n < parsed
              then (
                marked := it;
                n := parsed)
            done;
            start := !marked + 1;
            res := !res + (!n * int_of_float (10. ** float_of_int (max - 1 - digit)))
          done;
          acc + !res)
       0
  |> string_of_int
;;

let part_1 (input : string) (_is_test : bool) : string = solve input true false
let part_2 (input : string) (_is_test : bool) : string = solve input true true
let () = Aoc.run Sys.argv part_1 part_2 options
