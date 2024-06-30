local Input = require('src.lua.input')

local function timer(fn)
   local start = os.clock()
   local result = fn()
   local end_ = os.clock()
   return result, end_ - start
end

---@param result string
---@param expected string
---@return nil
local function test(result, expected)
   if expected == '' then
      return
   end
   if result ~= expected then
      print(string.format('Expected %s, got %s', expected, result))
      error('Test failed')
   end
end

---@param tag string
---@param func function
---@param path string
---@param has_io boolean
---@return string
local function perform(tag, func, path, has_io)
   print(string.format("\n\\ %s", tag))
   local is_test = tag:sub(1, 4) == "Test"

   local input, elapsedIo = timer(function()
      return has_io and path or Input.get_input(path)
   end)
   local result, elapsedPart = timer(function()
      return func(input, is_test)
   end)

   print(string.format(" -- Time taken (ms):"))
   print(string.format(" | IO > PART > ALL\n | %.3f > %.3f > %.3f", elapsedIo * 1000,
      elapsedPart * 1000, (elapsedIo + elapsedPart) * 1000))
   print(string.format(" / Result: %s", result))
   return result
end

local function min(xdd)
   local z = math.huge
   for _, v in ipairs(xdd) do
      if v < z then
         z = v
      end
   end
   return z
end

local function max(xdd)
   local z = -math.huge
   for _, v in ipairs(xdd) do
      if v > z then
         z = v
      end
   end
   return z
end

local function sum(xdd)
   local z = 0
   for _, v in ipairs(xdd) do
      z = z + v
   end
   return z
end

local function avg(xdd)
   return sum(xdd) / #xdd
end

---@param tag string
---@param func function
---@param path string
---@param iterations number
---@param has_io boolean
---@return nil
local function bench(tag, func, path, iterations, has_io)
   print(string.format("\nBenchmarking %s (ms) min..max avg", tag))
   local is_test = tag:sub(1, 4) == "Test"

   local timesIo = {}
   local timesPart = {}
   local timesOverall = {}

   for i = 1, iterations do
      local input, elapsedIo = timer(function()
         return has_io and path or Input.get_input(path)
      end)
      local result, elapsedPart = timer(function()
         return func(input, is_test)
      end)

      timesIo[i] = elapsedIo
      timesPart[i] = elapsedPart
      timesOverall[i] = elapsedIo + elapsedPart
   end

   local mn, mx, av

   mn = min(timesIo) * 1000
   mx = max(timesIo) * 1000
   av = avg(timesIo) * 1000
   print(string.format("IO: %.3f .. %.3f - %.3f", mn, mx, av))

   mn = min(timesPart) * 1000
   mx = max(timesPart) * 1000
   av = avg(timesPart) * 1000
   print(string.format("Part: %.3f .. %.3f - %.3f", mn, mx, av))

   mn = min(timesOverall) * 1000
   mx = max(timesOverall) * 1000
   av = avg(timesOverall) * 1000
   print(string.format("Overall: %.3f .. %.3f - %.3f", mn, mx, av))
end

---@param args string[]
---@param part_1 function
---@param part_2 function
---@param options table
---@return nil
local function run(args, part_1, part_2, options)
   if #args == 0 then
      print("Usage: lua main.lua [path] [iterations]")
      return
   end

   local path_answers = args[1] .. "/answers.txt"
   local path_input_test1 = args[1] .. "/test1.txt"
   local path_input_test2 = options.has_alternate and args[1] .. "/test2.txt" or path_input_test1
   local path_input_main = args[1] .. "/input.txt"

   local iterations = tonumber(args[2]) or 0
   if iterations > 0 then
      bench("Test 1", part_1, path_input_test1, iterations, options.has_io)
      bench("Part 1", part_1, path_input_main, iterations, options.has_io)
      bench("Test 2", part_2, path_input_test2, iterations, options.has_io)
      bench("Part 2", part_2, path_input_main, iterations, options.has_io)
      return
   end

   local answers = Input.get_answers(path_answers)
   local result
   result = perform("Test 1", part_1, path_input_test1, options.has_io)
   test(result, answers.test1)
   result = perform("Part 1", part_1, path_input_main, options.has_io)
   test(result, answers.part_1)
   result = perform("Test 2", part_2, path_input_test2, options.has_io)
   test(result, answers.test2)
   result = perform("Part 2", part_2, path_input_main, options.has_io)
   test(result, answers.part_2)
end

return run
