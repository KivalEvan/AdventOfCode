#!/usr/local/bin/lua

local run = require('src.lua.run')
local str = require('src.lua.utils.str')

local options = {
   has_alternate = true,
   has_io = false,
}

local function is_num(c)
   return c >= '0' and c <= '9'
end

local function get_num(s)
   local c = s:sub(1, 1)
   if is_num(c) then
      return tonumber(c)
   end
   c = s
   if str.starts_with(c, 'zero') then
      return '0'
   end
   if str.starts_with(c, 'one') then
      return '1'
   end
   if str.starts_with(c, 'two') then
      return '2'
   end
   if str.starts_with(c, 'three') then
      return '3'
   end
   if str.starts_with(c, 'four') then
      return '4'
   end
   if str.starts_with(c, 'five') then
      return '5'
   end
   if str.starts_with(c, 'six') then
      return '6'
   end
   if str.starts_with(c, 'seven') then
      return '7'
   end
   if str.starts_with(c, 'eight') then
      return '8'
   end
   if str.starts_with(c, 'nine') then
      return '9'
   end
   return nil
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local lines = {}
   for line in input:gmatch('[^\n]+') do
      table.insert(lines, line)
   end
   local res = 0

   for i = 1, #lines do
      local line = lines[i]
      local first, last

      for j = 1, #line do
         local c = line:sub(j, j)
         if is_num(c) then
            first = c
            break
         end
      end
      for j = #line, 1, -1 do
         local c = line:sub(j, j)
         if is_num(c) then
            last = c
            break
         end
      end

      res = res + tonumber(first .. last)
   end

   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local lines = {}
   for line in input:gmatch('[^\n]+') do
      table.insert(lines, line)
   end
   local res = 0

   for i = 1, #lines do
      local line = lines[i]
      local first, last

      for j = 1, #line do
         local c = get_num(line:sub(j, #line))
         if c ~= nil then
            first = c
            break
         end
      end
      for j = #line, 1, -1 do
         local c = get_num(line:sub(j, #line))
         if c ~= nil then
            last = c
            break
         end
      end

      res = res + tonumber(first .. last)
   end

   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
