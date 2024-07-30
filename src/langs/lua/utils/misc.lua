---@param str string
---@return string[][]
local function to_grid(str)
   local grid = {}

   for line in str:gmatch('[^\n]+') do
      local row = {}
      for i = 1, #line do
         row[i] = line:sub(i, i)
      end
      grid[#grid + 1] = row
   end
   return grid
end

return {
   to_grid = to_grid
}
