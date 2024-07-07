local run = require('src.lua.run')
local str = require('src.lua.utils.str')

local options = {
   has_alternate = false,
   has_io = false,
}

local function parse_input(input, single)
   local parsed = {}
   input = input:gsub('\n\n', '|')
   for line in input:gmatch('[^|]+') do
      parsed[#parsed + 1] = line
   end

   local header = {}
   for i, v in ipairs(str.split(str.split(parsed[1], ':')[2], ' ')) do
      if #v > 0 then
         header[#header + 1] = tonumber(v)
      end
   end

   local seed_ranges = {}
   if single then
      for _, v in ipairs(header) do
         seed_ranges[#seed_ranges + 1] = { min = v, max = v }
      end
   else
      for i = 1, #header, 2 do
         seed_ranges[#seed_ranges + 1] = { min = header[i], max = header[i] + header[i + 1] }
      end
   end

   local src_to_dest_ranges = {}
   for i = 2, #parsed do
      local tr = {}
      local v = parsed[i]
      local w = str.split(v, '\n')
      for j = 2, #w do
         local z = str.split(w[j], ' ')
         local r = {}

         local dest = tonumber(z[1])
         local src = tonumber(z[2])
         local inc = tonumber(z[3])

         r.source = { min = src, max = src + inc - 1 }
         r.destination = { min = dest, max = dest + inc - 1 }

         tr[#tr + 1] = r
      end

      src_to_dest_ranges[#src_to_dest_ranges + 1] = tr
   end

   return seed_ranges, src_to_dest_ranges
end

local function find_range(groups, r)
   for _, g in ipairs(groups) do
      if g.source.min <= r.min and
          r.min <= g.source.max and
          r.max >= g.source.min and
          g.source.max >= r.max then
         return g
      end
   end
end

local function solve(input, single)
   local seed_ranges, src_to_dest_ranges = parse_input(input, single)

   for _, groups in ipairs(src_to_dest_ranges) do
      for _, g in ipairs(groups) do
         for i = 1, #seed_ranges do
            local r = seed_ranges[i]
            if r.min < g.source.min and g.source.min < r.max then
               seed_ranges[#seed_ranges + 1] = { min = r.min, max = g.source.min - 1 }
               r.min = g.source.min
            end
            if r.min < g.source.max and g.source.max < r.max then
               seed_ranges[#seed_ranges + 1] = { min = g.source.max + 1, max = r.max }
               r.max = g.source.max
            end
         end
      end
      for i = 1, #seed_ranges do
         local r = seed_ranges[i]
         local found = find_range(groups, r)
         if found == nil then
            goto continue
         end
         local diff = found.destination.min - found.source.min
         r.min = r.min + diff
         r.max = r.max + diff
         ::continue::
      end
   end

   local res = math.huge

   for _, r in ipairs(seed_ranges) do
      if res > r.min then
         res = r.min
      end
   end

   return tostring(res)
end

---@param input string
---@param is_test boolean
---@return string
local function part_1(input, is_test)
   return solve(input, true)
end

---@param input string
---@param is_test boolean
---@return string
local function part_2(input, is_test)
   return solve(input, false)
end

local function main()
   run(arg, part_1, part_2, options)
end

main()
