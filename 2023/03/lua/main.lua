#!/usr/local/bin/lua

local run = require('src.lua.run')

local options = {
   has_alternate = false,
   has_io = false,
}

local function issymbol(c)
   return (c == '*' or c == '$' or c == '=' or c == '#' or c == '%' or
      c == '/' or c == '&' or c == '+' or c == '-' or c == '@')
end

local function isnum(c)
   return c >= '0' and c <= '9'
end

local function yeetthenumber(grid, x, y)
   local res = ''
   if isnum(grid[y][x]) then
      res = grid[y][x]
      grid[y][x] = '.'
      if x > 1 then
         res = yeetthenumber(grid, x - 1, y) .. res
      end
      if x < #grid[y] then
         res = res .. yeetthenumber(grid, x + 1, y)
      end
   end
   return res
end

local function tryparseint(s)
   if s == '' then
      return 0
   end
   return tonumber(s)
end

local function togrid(input)
   local grid = {}

   for line in input:gmatch('[^\r\n]+') do
      local row = {}
      for i = 1, #line do
         row[i] = line:sub(i, i)
      end
      grid[#grid + 1] = row
   end
   return grid
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local grid = togrid(input)
   local res = 0

   for y = 1, #grid do
      for x = 1, #grid[y] do
         if issymbol(grid[y][x]) then
            if x > 1 then
               if y < #grid then
                  res = res + tryparseint(yeetthenumber(grid, x - 1, y + 1))
               end
               if y > 1 then
                  res = res + tryparseint(yeetthenumber(grid, x - 1, y - 1))
               end
               res = res + tryparseint(yeetthenumber(grid, x - 1, y))
            end
            if x < #grid[y] then
               if y < #grid then
                  res = res + tryparseint(yeetthenumber(grid, x + 1, y + 1))
               end
               if y > 1 then
                  res = res + tryparseint(yeetthenumber(grid, x + 1, y - 1))
               end
               res = res + tryparseint(yeetthenumber(grid, x + 1, y))
            end
            if y < #grid then
               res = res + tryparseint(yeetthenumber(grid, x, y + 1))
            end
            if y > 1 then
               res = res + tryparseint(yeetthenumber(grid, x, y - 1))
            end
         end
      end
   end

   return tostring(res)
end

local function filterzero(values)
   local newAry = {}

   for i = 1, #values do
      if values[i] ~= 0 then
         newAry[#newAry + 1] = values[i]
      end
   end
   return newAry
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local grid = togrid(input)
   local res = 0

   for y = 1, #grid do
      for x = 1, #grid[y] do
         if grid[y][x] == '*' then
            local ary = { 0, 0, 0, 0, 0, 0, 0, 0 }
            if x > 1 then
               if y < #grid then
                  ary[1] = tryparseint(yeetthenumber(grid, x - 1, y + 1))
               end
               if y > 1 then
                  ary[2] = tryparseint(yeetthenumber(grid, x - 1, y - 1))
               end
               ary[3] = tryparseint(yeetthenumber(grid, x - 1, y))
            end
            if x < #grid[y] then
               if y < #grid then
                  ary[4] = tryparseint(yeetthenumber(grid, x + 1, y + 1))
               end
               if y > 1 then
                  ary[5] = tryparseint(yeetthenumber(grid, x + 1, y - 1))
               end
               ary[6] = tryparseint(yeetthenumber(grid, x + 1, y))
            end
            if y < #grid then
               ary[7] = tryparseint(yeetthenumber(grid, x, y + 1))
            end
            if y > 1 then
               ary[8] = tryparseint(yeetthenumber(grid, x, y - 1))
            end
            ary = filterzero(ary)
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
