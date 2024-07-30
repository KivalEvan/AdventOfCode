local run = require('src.langs.lua.run')
local str = require('src.langs.lua.utils.str')

local options = {
   has_alternate = false,
   has_io = false,
}

local function difference(ary, sz)
   for i = 1, sz do
      ary[i] = ary[i + 1] - ary[i]
   end
   return ary
end

local function extrapolate(ary, n)
   n = n - 1
   local last = ary[n + 1]
   if n == 1 then
      return last
   end
   return extrapolate(difference(ary, n), n) + last
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local lines = str.split(input, '\n')
   
   local res = 0
   for i = 1, #lines do
      local line = str.split(lines[i], ' ')
      local nums = {}

      for j = 1, #line do
         nums[#nums + 1] = tonumber(line[j])
      end
      res = res + extrapolate(nums, #nums)
   end

   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local lines = str.split(input, '\n')
   
   local res = 0
   for i = 1, #lines do
      local line = str.split(lines[i], ' ')
      local nums = {}

      for j = 1, #line do
         nums[#nums + 1] = tonumber(line[#line + 1 - j])
      end
      res = res + extrapolate(nums, #nums)
   end

   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
