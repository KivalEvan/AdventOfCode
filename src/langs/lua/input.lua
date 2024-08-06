---@param path string
---@return string
local function get_input(path)
   local file = io.open(path, "r")
   if not file then
      return ""
   end
   local lines = {}
   for line in file:lines() do
      table.insert(lines, line)
   end
   file:close()
   return table.concat(lines, "\n")
end

---@param path string
---@return table
local function get_answers(path)
   local file = io.open(path, "r")
   if not file then
      return {}
   end
   local lines = {}
   for line in file:lines() do
      table.insert(lines, line)
   end
   file:close()
   return {
      test1 = lines[1],
      part1 = lines[2],
      test2 = lines[3],
      part2 = lines[4],
   }
end

return {
   get_input = get_input,
   get_answers = get_answers
}