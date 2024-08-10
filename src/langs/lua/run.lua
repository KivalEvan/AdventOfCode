local Input = require('src.langs.lua.input')

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

---@param solution table
---@return table
local function print_result(solution)
   if solution.iteration == 1 then
      print(string.format("\n%s: (ms) IO > Part > Overall", solution.tag))
      print(string.format("Timer: %.3f > %.3f > %.3f", solution.bench[1][3],
         solution.bench[2][3], solution.bench[3][3]))
   else
      print(string.format("\n%s: (ms) min..max avg", solution.tag))
      print(string.format("IO: %.3f .. %.3f - %.3f", solution.bench[1][1], solution.bench[1][2], solution.bench[1][3]))
      print(string.format("Part: %.3f .. %.3f - %.3f", solution.bench[2][1], solution.bench[2][2], solution.bench[2][3]))
      print(string.format("Overall: %.3f .. %.3f - %.3f", solution.bench[3][1], solution.bench[3][2],
         solution.bench[3][3]))
   end
   print(string.format("Result: %s", solution.result))

   return solution
end

---@param solution table
---@return table
local function execute(solution)
   local is_test = solution.tag:sub(1, 4) == "Test"

   local input, elapsedIo = timer(function()
      return solution.has_io and solution.path or Input.get_input(solution.path)
   end)
   local result, elapsedPart = timer(function()
      return solution.func(input, is_test)
   end)

   solution.result = result
   solution.elapsed = { elapsedIo, elapsedPart }

   return solution
end

---@param solution table
---@return table
local function perform(solution)
   local timesIo = {}
   local timesPart = {}
   local timesOverall = {}

   for i = 1, solution.iteration / 2 do
      execute(solution)
   end

   for i = 1, solution.iteration do
      execute(solution)
      timesIo[i] = solution.elapsed[1]
      timesPart[i] = solution.elapsed[2]
      timesOverall[i] = solution.elapsed[1] + solution.elapsed[2]
   end

   solution.bench = { { 0, 0, 0 }, { 0, 0, 0 }, { 0, 0, 0 } }

   solution.bench[1][1] = min(timesIo) * 1000
   solution.bench[1][2] = max(timesIo) * 1000
   solution.bench[1][3] = avg(timesIo) * 1000

   solution.bench[2][1] = min(timesPart) * 1000
   solution.bench[2][2] = max(timesPart) * 1000
   solution.bench[2][3] = avg(timesPart) * 1000

   solution.bench[3][1] = min(timesOverall) * 1000
   solution.bench[3][2] = max(timesOverall) * 1000
   solution.bench[3][3] = avg(timesOverall) * 1000

   return solution
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

   local answers = Input.get_answers(path_answers)
   local solutions = {
      { tag = "Test 1", path = path_input_test1, func = part_1, test=answers.test1, iteration = iterations, options = options },
      { tag = "Part 1", path = path_input_main,  func = part_1, test=answers.part1, iteration = iterations, options = options },
      { tag = "Test 2", path = path_input_test2, func = part_2, test=answers.test2, iteration = iterations, options = options },
      { tag = "Part 2", path = path_input_main,  func = part_2, test=answers.part2, iteration = iterations, options = options }
   }

   for _, solution in ipairs(solutions) do
      perform(solution)
   end

   for _, solution in ipairs(solutions) do
      print_result(solution)
      test(solution.result, solution.test)
   end
end

return run
