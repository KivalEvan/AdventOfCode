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
   local dial = 50
   local zero = 0
   for line in input:gmatch('[^\n]+') do
      local newDial = tonumber(line:sub(2), 10)
      if line:sub(0, 1) == 'L' then
         newDial = newDial * -1
      end
      newDial = dial + newDial

      if p2 then
         zero = zero + math.floor(math.abs(newDial) / 100)
         if dial ~= 0 and newDial <= 0 then
            zero = zero + 1
         end
         dial = newDial % 100
      else
         dial = newDial
         if dial % 100 == 0 then
            zero = zero + 1
         end
      end
   end

   return tostring(zero)
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
