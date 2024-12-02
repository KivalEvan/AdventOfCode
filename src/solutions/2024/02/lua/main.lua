local run = require('src.langs.lua.run')
local str = require('src.langs.lua.utils.str')

local options = {
   has_alternate = false,
   has_io = false,
}

local function killme(num)
   local incre = false
   local decre = false
   for i = 2, #num do
      local val = num[i] - num[i - 1]
      if val > 0 then
         incre = true
      end
      if val < 0 then
         decre = true
      end
      if incre and decre then
         return false
      end
      local change = math.abs(val)
      if change < 1 or change > 3 then
         return false
      end
   end
   return true
end

local function killme2(num)
   if killme(num) then
      return true
   end
   for i = 1, #num do
      local copy = {}
      for j = 1, #num do
         if i ~= j then
            copy[#copy + 1] = num[j]
         end
      end
      if killme(copy) then
         return true
      end
   end
   return false
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local lines = str.split(input, '\n')
   local count = 0
   for i = 1, #lines do
      local line = lines[i]
      local t = str.split(line, ' ')
      local num = {}
      for j = 1, #t do
         num[#num + 1] = tonumber(t[j])
      end
      if killme(num) then
         count = count + 1
      end
   end
   return tostring(count)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local lines = str.split(input, '\n')
   local count = 0
   for i = 1, #lines do
      local line = lines[i]
      local t = str.split(line, ' ')
      local num = {}
      for j = 1, #t do
         num[#num + 1] = tonumber(t[j])
      end
      if killme2(num) then
         count = count + 1
      end
   end
   return tostring(count)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
