local run = require('src.langs.lua.run')
local str = require('src.langs.lua.utils.str')

local options = {
   has_alternate = false,
   has_io = false,
}

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local l = {}
   local r = {}
   for line in input:gmatch('[^\n]+') do
      local pair = str.split(line, '   ')
      l[#l + 1] = pair[1]
      r[#r + 1] = pair[2]
   end

   table.sort(l)
   table.sort(r)

   local sum = 0
   for i = 1, #l do
      sum = sum + math.abs(l[i] - r[i])
   end

   return tostring(sum)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local l = {}
   local hashmap = {}
   for line in input:gmatch('[^\n]+') do
      local pair = str.split(line, '   ')
      l[#l + 1] = pair[1]
      if (hashmap[pair[1]] == nil) then hashmap[pair[1]] = 0 end
      if (hashmap[pair[2]] == nil)then hashmap[pair[2]] = 0 end
      hashmap[pair[2]] = hashmap[pair[2]] + 1
   end

   local sum = 0
   for i = 1, #l do
      sum = sum + l[i] * hashmap[l[i]]
   end

   return tostring(sum)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
