val test : string -> string -> unit
val timer : (unit -> string) -> string * float

val run
  :  string array
  -> (string -> bool -> string)
  -> (string -> bool -> string)
  -> (string, bool) Hashtbl.t
  -> unit
