local run = require('src.lua.run')
local str = require "src.lua.utils.str"

local options = {
   has_alternate = false,
   has_io = false,
}

local function gcd(a, b)
   if b == 0 then
      return a
   end
   return gcd(b, a % b)
end

local function lcm(a, b)
   return (a * b) / gcd(a, b);
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local lines = str.split(input, '\n')
   local instructions = {}

   for i = 1, #lines[1] do
      local c = string.sub(lines[1], i, i)
      if c == "L" then
         instructions[#instructions + 1] = 0
      else
         instructions[#instructions + 1] = 1
      end
   end

   local maps = {}
   for i = 2, #lines do
      local chunks = str.split(lines[i], '=')
      local dest = string.sub(chunks[1], 1, 3)
      local lr = str.split(string.sub(chunks[2], 3, #chunks[2] - 1), ',')
      maps[dest] = { lr[1], string.sub(lr[2], 2) }
   end

   local i = 0
   local nav = "AAA"
   while true do
      local m = maps[nav]
      nav = m[instructions[(i % #instructions) + 1] + 1]
      i = i + 1
      if nav == "ZZZ" then
         break
      end
   end

   return tostring(i)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local lines = str.split(input, '\n')
   local instructions = {}

   for i = 1, #lines[1] do
      local c = string.sub(lines[1], i, i)
      if c == "L" then
         instructions[#instructions + 1] = 0
      else
         instructions[#instructions + 1] = 1
      end
   end

   local maps = {}
   local navs = {}
   for i = 2, #lines do
      local chunks = str.split(lines[i], '=')
      local dest = string.sub(chunks[1], 1, 3)
      local lr = str.split(string.sub(chunks[2], 3, #chunks[2] - 1), ',')
      maps[dest] = { lr[1], string.sub(lr[2], 2) }

      if string.sub(dest, 3, 3) == "A" then
         navs[#navs + 1] = dest
      end
   end

   local res = 1
   for j = 1, #navs do
      local i = 0
      while true do
         local m = maps[navs[j]]
         navs[j] = m[instructions[(i % #instructions) + 1] + 1]
         i = i + 1
         if string.sub(navs[j], 3, 3) == "Z" then
            break
         end
      end
      res = lcm(res, i)
   end

   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
