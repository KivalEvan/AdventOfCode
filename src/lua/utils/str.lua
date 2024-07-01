---@param str string
---@param sep string
---@return string[]
local function split(str, sep)
   if sep == nil then
      sep = "%s"
   end
   local t = {};
   local i = 1
   for s in string.gmatch(str, "([^" .. sep .. "]+)") do
      t[i] = s
      i = i + 1
   end
   return t
end

---@param str string
---@param substr string
---@return boolean
local function starts_with(str, substr)
   return string.sub(str, 1, #substr) == substr
end

---@param str string
---@param substr string
---@return boolean
local function ends_with(str, substr)
   return string.sub(str, -#substr) == substr
end

---@param str string
---@param substr string
---@return number
local function index_of(str, substr)
   return string.find(str, substr, 1, true)[1]
end

---@param str string
---@param substr string
---@return number
local function last_index_of(str, substr)
   return string.find(str, substr, -1, true)[1]
end

return {
   split = split,
   starts_with = starts_with,
   ends_with = ends_with,
   index_of = index_of,
   last_index_of = last_index_of
}
