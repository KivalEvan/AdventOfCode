local run = require('src.langs.lua.run')

local options = {
   has_alternate = false,
   has_io = false,
}

---@param input string
---@param is_test boolean
---@param p2 boolean
---@return string
local function solve(input, is_test, p2)
   local res = 0
   for line in input:gmatch('[^\n]+') do
      local le = #line
      local start = 1
      local max = 2
      if (p2) then max = 12 end

      for digit = 1, max do
         local marked = 0
         local n = 0
         local t = max - digit
         local l = le - t
         for i = start, l do
            local parsed = line:sub(i, i):byte() - 48
            if (n < parsed) then
               n = parsed
               marked = i
            end
         end

         start = marked + 1
         res = res + n * (10 ^ t)
      end
   end

   return string.format("%d", res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   return solve(input, is_test, false)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   return solve(input, is_test, true)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()