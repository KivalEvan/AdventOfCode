---@generic T
---@param arr T[]
---@param val T
---@return boolean
local function contains(arr, val)
   for _, v in ipairs(arr) do
      if v == val then
         return true
      end
   end
   return false
end

---@generic T
---@param ary T[]
---@param fn fun(v: T, i?: number, ary?: T[]): boolean
---@return T[]
local function filter(ary, fn)
   local res = {}
   for i, v in ipairs(ary) do
      if fn(v, i, ary) then
         res[#res + 1] = v
      end
   end
   return res
end

---@generic T
---@param ary T[]
---@param el T
---@return number
local function index_of(ary, el)
   for i, v in ipairs(ary) do
      if v == el then
         return i
      end
   end
   return -1
end

---@param ary number[]
---@return number
local function min(ary)
   local m = ary[1]
   for _, v in ipairs(ary) do
      if v < m then
         m = v
      end
   end
   return m
end

---@param ary number[]
---@return number
local function max(ary)
   local m = ary[1]
   for _, v in ipairs(ary) do
      if v > m then
         m = v
      end
   end
   return m
end

return {
   contains = contains,
   filter = filter,
   index_of = index_of,
   min = min,
   max = max,
}
