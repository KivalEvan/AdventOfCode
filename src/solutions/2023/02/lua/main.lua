local run = require('src.langs.lua.run')
local str = require('src.langs.lua.utils.str')

local options = {
   has_alternate = false,
   has_io = false,
}

local function parse_input(input)
   local results = {}
   for line in input:gmatch('[^\n]+') do
      local cubes = {}
      for _, c in ipairs(str.split(str.split(line, ':')[2]:gsub(',', ';'), ';')) do
         local lmao = str.split(c:gsub('^%s*(.-)%s*$', '%1'), ' ')
         local val = tonumber(lmao[1])
         local col = (lmao[2]:sub(1, 1):byte() % 3) + 1
         cubes[#cubes + 1] = { val, col }
      end

      results[#results + 1] = cubes
   end

   return results
end

local rgb_p1 = { 12, 13, 14 }

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local parsed = parse_input(input)

   local res = 0
   for i = 1, #parsed do
      local cubes = parsed[i]
      local found = false
      for j = 1, #cubes do
         local cube = cubes[j]
         if cube[1] > rgb_p1[cube[2]] then
            found = true
         end
      end
      if not found then
         res = res + i
      end
   end
   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local parsed = parse_input(input)

   local res = 0
   for i = 1, #parsed do
      local cubes = parsed[i]
      local rgb = { 0, 0, 0 }
      for j = 1, #cubes do
         local cube = cubes[j]
         rgb[cube[2]] = math.max(rgb[cube[2]], cube[1])
      end

      res = res + rgb[1] * rgb[2] * rgb[3]
   end
   return tostring(res)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
