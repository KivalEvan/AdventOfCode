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
   local total = 0
   local len = input:find('\n')
   local buffer = {}
   for i = 1, len - 1 do
      buffer[i] = 0
   end
   buffer[input:find('S')] = 1

   for i = 1, #input do
      local c = input:sub(i, i)
      if c == '^' then
         local x = i % len
         if buffer[x] > 0 then
            total = total + 1
         end
         buffer[x - 1] = buffer[x-1] + buffer[x]
         buffer[x + 1] = buffer[x+1] + buffer[x]
         buffer[x] = 0
      end
   end

   if p2 then
      total = 0
      for _, v in pairs(buffer) do
         total = total + v
      end
   end
   
   return tostring(total)
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