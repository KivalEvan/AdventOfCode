local run = require('src.lua.run')
local str = require('src.lua.utils.str')
local array = require('src.lua.utils.array')

local options = {
   has_alternate = false,
   has_io = false,
}

---@param input string
---@return number[][]
local function parse_input(input)
   local nums = {}
   local idx = input:find(':') + 1
   for i, line in ipairs(str.split(input:sub(idx, #input), '|')) do
      local t = str.split(line, ' ')
      local num = {}
      for j = 1, #t do
         if t[j] ~= '' then
            num[#num + 1] = tonumber(t[j])
         end
      end
      nums[#nums + 1] = num
   end
   return nums
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local res = 0
   for line in input:gmatch('[^\n]+') do
      local nums = parse_input(line)
      local j = -1
      for i = 1, #nums[1] do
         if array.contains(nums[2], nums[1][i]) then
            j = j + 1
         end
      end
      if j ~= -1 then
         res = res + 2 ^ j
      end
   end
   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local lines = {}
   for line in input:gmatch('[^\n]+') do
      lines[#lines + 1] = line
   end

   local instances = {}
   for i = 1, #lines do
      instances[i] = 1
   end
   local res = 0

   for i = 1, #lines do
      local line = lines[i]
      local nums = parse_input(line)
      local j = 0
      for k = 1, #nums[1] do
         if array.contains(nums[2], nums[1][k]) then
            j = j + 1
         end
      end
      while j > 0 do
         instances[i + j] = instances[i + j] + instances[i]
         j = j - 1
      end
   end

   for i = 1, #instances do
      res = res + instances[i]
   end

   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()