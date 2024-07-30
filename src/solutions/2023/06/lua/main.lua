local run = require('src.langs.lua.run')
local str = require('src.langs.lua.utils.str')

local options = {
   has_alternate = false,
   has_io = false,
}

local function ohnomath(b, c)
   local pepsilon = 0.001
   local mn = math.floor((b + math.sqrt(b * b - 4 * c)) / 2 - pepsilon)
   local mx = math.ceil((b - math.sqrt(b * b - 4 * c)) / 2 + pepsilon)
   return mn - mx + 1
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   local lines = str.split(input, '\n')

   local td = {}
   for i = 1, #lines do
      local line = lines[i]
      local ary = {}
      for _, v in ipairs(str.split(str.split(line, ':')[2], ' ')) do
         if #v > 0 then
            ary[#ary + 1] = tonumber(v)
         end
      end
      td[#td + 1] = ary
   end
   
   local res = 1
   for i = 1, #td[1] do
      res = res * ohnomath(td[1][i], td[2][i])
   end

   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   local lines = str.split(input, '\n')

   local td = {}
   for i = 1, #lines do
      td[#td + 1] = tonumber(table.concat(str.split(str.split(lines[i], ':')[2], ' '), ''))
   end
   
   return tostring(ohnomath(td[1], td[2]))
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
