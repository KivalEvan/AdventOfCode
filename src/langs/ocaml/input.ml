let get_input path = In_channel.with_open_bin path In_channel.input_all |> String.trim

let get_answers path =
  In_channel.with_open_bin path In_channel.input_all
  |> String.split_on_char '\n'
  |> Array.of_list
;;
