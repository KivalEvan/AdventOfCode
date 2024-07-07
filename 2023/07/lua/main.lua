local run = require('src.lua.run')
local str = require('src.lua.utils.str')
local array = require('src.lua.utils.array')

local options = {
   has_alternate = false,
   has_io = false,
}

local ranking = {
   ['A'] = 14,
   ['K'] = 13,
   ['Q'] = 12,
   ['J'] = 11,
   ['T'] = 10,
   ['9'] = 9,
   ['8'] = 8,
   ['7'] = 7,
   ['6'] = 6,
   ['5'] = 5,
   ['4'] = 4,
   ['3'] = 3,
   ['2'] = 2,
   ['1'] = 1,
}

local card_type = {
   ['HIGH_CARD'] = 1,
   ['ONE_PAIR'] = 2,
   ['TWO_PAIR'] = 3,
   ['THREE_OF_A_KIND'] = 4,
   ['FULL_HOUSE'] = 5,
   ['FOUR_OF_A_KIND'] = 6,
   ['FIVE_OF_A_KIND'] = 7,
}

local function sort_card(a, b)
   for i = 1, 5 do
      local x = a.cards:sub(i, i)
      local y = b.cards:sub(i, i)
      if x ~= y then
         return ranking[x] < ranking[y]
      end
   end
end

local function get_type(cards)
   local values = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 }
   for i = 1, 5 do
      local c = cards:sub(i, i)
      values[ranking[c]] = values[ranking[c]] + 1
   end
   if values[1] > 0 then
      local temp = values[1]
      values[1] = 0
      local idx = array.index_of(values, array.max(values))
      values[idx] = values[idx] + temp
   end

   values = array.filter(values, function(v) return v > 0 end)
   if #values == 1 then return card_type['FIVE_OF_A_KIND'] end
   if #values == 4 then return card_type['ONE_PAIR'] end
   if #values == 5 then return card_type['HIGH_CARD'] end

   local mn = 5
   local mx = 0
   for _, v in ipairs(values) do
      if mn > v then
         mn = v
      end
      if mx < v then
         mx = v
      end
   end

   if mn == 1 then
      if mx == 4 then
         return card_type['FOUR_OF_A_KIND']
      end
      if mx == 3 then
         return card_type['THREE_OF_A_KIND']
      end
      if mx == 2 then
         return card_type['TWO_PAIR']
      end
   end
   return card_type['FULL_HOUSE']
end

local function parse_input(input, joker)
   local groups = {
      {},
      {},
      {},
      {},
      {},
      {},
      {},
   }

   for line in input:gmatch('[^\n]+') do
      local temp = str.split(line, ' ')
      if joker then
         temp[1] = temp[1]:gsub('J', '1')
      end
      local p = {
         cards = temp[1],
         value = tonumber(temp[2]),
      }
      local t = get_type(temp[1])
      groups[t][#groups[t] + 1] = p
   end

   return groups
end

local function solve(input, joker)
   local groups = parse_input(input, joker)
   local res = 0
   local i = 1

   for _, group in ipairs(groups) do
      table.sort(group, sort_card)
      for _, pair in ipairs(group) do
         res = res + pair.value * i
         i = i + 1
      end
   end

   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   return solve(input, false)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   return solve(input, true)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
