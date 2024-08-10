local run = require('src.langs.lua.run')
local misc = require('src.langs.lua.utils.misc')

local options = {
   has_alternate = true,
   has_io = false,
}

local function match_criteria(criteria, c)
   for i = 1, #criteria do
      if string.sub(criteria, i, i) == c then
         return true
      end
   end
   return false
end

local function find_start(grid)
   for y = 1, #grid do
      for x = 1, #grid[y] do
         if grid[y][x] == 'S' then
            return { x, y }
         end
      end
   end
end

local function go_up(grid, x, y)
   local criteria = 'S7F|'
   return y > 1 and match_criteria(criteria, grid[y - 1][x])
end

local function go_down(grid, x, y)
   local criteria = 'SLJ|'
   return y < #grid and match_criteria(criteria, grid[y + 1][x])
end

local function go_left(grid, x, y)
   local criteria = 'SLF-'
   return x > 1 and match_criteria(criteria, grid[y][x - 1])
end

local function go_right(grid, x, y)
   local criteria = 'S7J-'
   return x < #grid[y] and match_criteria(criteria, grid[y][x + 1])
end

local function look_up(grid, x, y)
   local c = grid[y][x]
   local res = {}
   if (c == '|') then
      if (go_up(grid, x, y)) then
         res[#res + 1] = { x, y - 1 }
      end
      if (go_down(grid, x, y)) then
         res[#res + 1] = { x, y + 1 }
      end
   end
   if (c == '-')
   then
      if (go_left(grid, x, y)) then
         res[#res + 1] = { x - 1, y }
      end
      if (go_right(grid, x, y)) then
         res[#res + 1] = { x + 1, y }
      end
   end
   if (c == 'L')
   then
      if (go_up(grid, x, y)) then
         res[#res + 1] = { x, y - 1 }
      end
      if (go_right(grid, x, y)) then
         res[#res + 1] = { x + 1, y }
      end
   end
   if (c == 'J')
   then
      if (go_up(grid, x, y)) then
         res[#res + 1] = { x, y - 1 }
      end
      if (go_left(grid, x, y)) then
         res[#res + 1] = { x - 1, y }
      end
   end
   if (c == '7')
   then
      if (go_down(grid, x, y)) then
         res[#res + 1] = { x, y + 1 }
      end
      if (go_left(grid, x, y)) then
         res[#res + 1] = { x - 1, y }
      end
   end
   if (c == 'F')
   then
      if (go_down(grid, x, y)) then
         res[#res + 1] = { x, y + 1 }
      end
      if (go_right(grid, x, y)) then
         res[#res + 1] = { x + 1, y }
      end
   end
   if (c == 'S')
   then
      if (go_up(grid, x, y)) then
         res[#res + 1] = { x, y - 1 }
      end
      if (go_down(grid, x, y)) then
         res[#res + 1] = { x, y + 1 }
      end
      if (go_left(grid, x, y)) then
         res[#res + 1] = { x - 1, y }
      end
      if (go_right(grid, x, y)) then
         res[#res + 1] = { x + 1, y }
      end
   end
   return res
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local grid = misc.to_grid(input)
   local visited = {}

   for y = 1, #grid do
      visited[y] = {}
      for x = 1, #grid[1] do
         visited[y][x] = false
      end
   end

   local res = 0
   local queue = {}
   queue[#queue + 1] = find_start(grid)
   while #queue > 0 do
      local current = table.remove(queue, #queue)
      local found = look_up(grid, current[1], current[2])
      for _, f in ipairs(found) do
         if not visited[f[2]][f[1]] then
            visited[f[2]][f[1]] = true
            queue[#queue + 1] = f
            res = res + 1
         end
      end
   end

   return tostring(res / 2)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local grid = misc.to_grid(input)
   local visited = {}

   for y = 1, #grid * 3 do
      visited[y] = {}
      for x = 1, #grid[1] * 3 do
         visited[y][x] = false
      end
   end

   local queue = {}
   queue[#queue + 1] = find_start(grid)
   while #queue > 0 do
      local current = table.remove(queue, #queue)
      local found = look_up(grid, current[1], current[2])
      for _, f in ipairs(found) do
         visited[(f[2] - 1) * 3 + 2 + current[2] - f[2]][(f[1] - 1) * 3 + 2 + current[1] - f[1]] = true
         if not visited[(f[2] - 1) * 3 + 2][(f[1] - 1) * 3 + 2] then
            visited[(f[2] - 1) * 3 + 2][(f[1] - 1) * 3 + 2] = true
            queue[#queue + 1] = f
         end
      end
   end

   queue[#queue + 1] = { 1, 1 }
   while #queue > 0 do
      local current = table.remove(queue, #queue)
      if not visited[current[2]][current[1]] then
         visited[current[2]][current[1]] = true
         for ud = -1, 1 do
            for lr = -1, 1 do
               if not (current[2] + ud < 1 or current[2] + ud > #visited or current[1] + lr < 1 or current[1] + lr > #visited[1] or visited[current[2] + ud][current[1] + lr]) then
                  queue[#queue + 1] = { current[1] + lr, current[2] + ud }
               end
            end
         end
      end
   end

   local res = 0
   for y = 1, #grid do
      for x = 1, #grid[1] do
         if not visited[(y - 1) * 3 + 2][(x - 1) * 3 + 2] then
            res = res + 1
         end
      end
   end

   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
