#!/usr/local/bin/lua

local run = require('src.lua.run')
local array = require('src.lua.utils.array')
local misc = require('src.lua.utils.misc')

local options = {
   has_alternate = false,
   has_io = false,
}

local function is_symbol(c)
   return (c == '*' or c == '$' or c == '=' or c == '#' or c == '%' or
      c == '/' or c == '&' or c == '+' or c == '-' or c == '@')
end

local function is_num(c)
   return c >= '0' and c <= '9'
end

local function yeet_the_number(grid, x, y)
   local res = ''
   if is_num(grid[y][x]) then
      res = grid[y][x]
      grid[y][x] = '.'
      if x > 1 then
         res = yeet_the_number(grid, x - 1, y) .. res
      end
      if x < #grid[y] then
         res = res .. yeet_the_number(grid, x + 1, y)
      end
   end
   return res
end

local function try_parse_int(s)
   if s == '' then
      return 0
   end
   return tonumber(s)
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local grid = misc.to_grid(input)
   local res = 0

   for y = 1, #grid do
      for x = 1, #grid[y] do
         if is_symbol(grid[y][x]) then
            if x > 1 then
               if y < #grid then
                  res = res + try_parse_int(yeet_the_number(grid, x - 1, y + 1))
               end
               if y > 1 then
                  res = res + try_parse_int(yeet_the_number(grid, x - 1, y - 1))
               end
               res = res + try_parse_int(yeet_the_number(grid, x - 1, y))
            end
            if x < #grid[y] then
               if y < #grid then
                  res = res + try_parse_int(yeet_the_number(grid, x + 1, y + 1))
               end
               if y > 1 then
                  res = res + try_parse_int(yeet_the_number(grid, x + 1, y - 1))
               end
               res = res + try_parse_int(yeet_the_number(grid, x + 1, y))
            end
            if y < #grid then
               res = res + try_parse_int(yeet_the_number(grid, x, y + 1))
            end
            if y > 1 then
               res = res + try_parse_int(yeet_the_number(grid, x, y - 1))
            end
         end
      end
   end

   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local grid = misc.to_grid(input)
   local res = 0

   for y = 1, #grid do
      for x = 1, #grid[y] do
         if grid[y][x] == '*' then
            local ary = { 0, 0, 0, 0, 0, 0, 0, 0 }
            if x > 1 then
               if y < #grid then
                  ary[1] = try_parse_int(yeet_the_number(grid, x - 1, y + 1))
               end
               if y > 1 then
                  ary[2] = try_parse_int(yeet_the_number(grid, x - 1, y - 1))
               end
               ary[3] = try_parse_int(yeet_the_number(grid, x - 1, y))
            end
            if x < #grid[y] then
               if y < #grid then
                  ary[4] = try_parse_int(yeet_the_number(grid, x + 1, y + 1))
               end
               if y > 1 then
                  ary[5] = try_parse_int(yeet_the_number(grid, x + 1, y - 1))
               end
               ary[6] = try_parse_int(yeet_the_number(grid, x + 1, y))
            end
            if y < #grid then
               ary[7] = try_parse_int(yeet_the_number(grid, x, y + 1))
            end
            if y > 1 then
               ary[8] = try_parse_int(yeet_the_number(grid, x, y - 1))
            end
            ary = array.filter(ary, function(val) return val ~= 0 end)
            if #ary == 2 then
               res = res + ary[1] * ary[2]
            end
         end
      end
   end

   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
