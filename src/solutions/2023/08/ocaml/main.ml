let options = Hashtbl.create 128;;

Hashtbl.add options "has_alternate" true;;
Hashtbl.add options "has_io" false;;

let ( +/ ) = Int64.add
let ( */ ) = Int64.mul
let ( // ) = Int64.div

let rec gcd (a : int64) (b : int64) =
  if b = Int64.of_int 0 then a else gcd b (Int64.rem a b)
;;

let lcm a b = a */ b // gcd a b

let part_1 (input : string) (_is_test : bool) : string =
  let lines = input |> String.split_on_char '\n' in
  let instructions =
    lines
    |> List.hd
    |> String.to_seq
    |> Seq.map (fun x -> if x = 'L' then 0 else 1)
    |> Array.of_seq
  in
  let maps = Hashtbl.create 128 in
  lines
  |> List.tl
  |> List.filter (( <> ) "")
  |> List.iter (fun x ->
    let parts = String.split_on_char '=' x in
    let dest = List.nth parts 0 |> String.trim in
    let lr = List.nth parts 1 |> String.split_on_char ',' |> List.map String.trim in
    Hashtbl.add
      maps
      dest
      [| String.sub (List.nth lr 0) 1 3; String.sub (List.nth lr 1) 0 3 |]);
  let rec loop (i : int64) (nav : string) : int64 =
    let m = Hashtbl.find maps nav in
    let idx = Int64.to_int i mod Array.length instructions in
    let next = m.(instructions.(idx)) in
    let nexti = i +/ 1L in
    if next = "ZZZ" then nexti else loop nexti next
  in
  loop 0L "AAA" |> Int64.to_string
;;

let part_2 (input : string) (_is_test : bool) : string =
  let lines = input |> String.split_on_char '\n' in
  let instructions =
    lines
    |> List.hd
    |> String.to_seq
    |> Seq.map (fun x -> if x = 'L' then 0 else 1)
    |> Array.of_seq
  in
  let maps = Hashtbl.create 128 in
  let navs = ref [||] in
  lines
  |> List.tl
  |> List.filter (( <> ) "")
  |> List.iter (fun x ->
    let parts = String.split_on_char '=' x in
    let dest = List.nth parts 0 |> String.trim in
    let lr = List.nth parts 1 |> String.split_on_char ',' |> List.map String.trim in
    Hashtbl.add
      maps
      dest
      [| String.sub (List.nth lr 0) 1 3; String.sub (List.nth lr 1) 0 3 |];
    if String.get dest 2 = 'A' then navs := Array.append !navs [| dest |] else ());
  let rec loop (res : int64) (i : int) : int64 =
    if i = Array.length !navs
    then res
    else (
      let rec whileloop (j : int) : int =
        let m = Hashtbl.find maps !navs.(i) in
        let idx = j mod Array.length instructions in
        !navs.(i) <- m.(instructions.(idx));
        let nextj = j + 1 in
        if String.get !navs.(i) 2 = 'Z' then nextj else whileloop nextj
      in
      loop (lcm res (Int64.of_int (whileloop 0))) (i + 1))
  in
  loop 1L 0 |> Int64.to_string
;;

let () = Aoc.run Sys.argv part_1 part_2 options
