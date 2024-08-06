from src.langs.python.input import get_answers, get_input
from typing import Callable, Dict, List
from dataclasses import dataclass
import os.path
import time

@dataclass
class SolutionWrapper:
   tag: str
   func: Callable[[str, bool], str]
   path: str
   test: str
   iteration: int
   options: Dict
   result: str = None
   elapsed: List[int] = None
   bench: List[List[int]] = None

def print_result(solution: SolutionWrapper) -> SolutionWrapper:
   if solution.iteration == 1:
      print(f'\n{solution.tag}: (ms) IO > Part > Overall')
      print(f'Timer: {round(solution.bench[0][2], 3)} > {round(solution.bench[1][2], 3)} > {round(solution.bench[2][2], 3)}')
   else:
      print(f'\n{solution.tag}: (ms) min..max avg')
      print(f'IO: {round(solution.bench[0][0], 3)} .. {round(solution.bench[0][1], 3)} - {round(solution.bench[0][2], 3)}')
      print(f'Part: {round(solution.bench[1][0], 3)} .. {round(solution.bench[1][1], 3)} - {round(solution.bench[1][2], 3)}')
      print(f'Overall: {round(solution.bench[2][0], 3)} .. {round(solution.bench[2][1], 3)} - {round(solution.bench[2][2], 3)}')
   print(f'Result: {solution.result}')
      
   return solution
   
def test(result: str, expected: str):
   if expected == '':
      return
   if result != expected:
      print(f'Expected {expected}, got {result}')
      raise Exception('Test failed')

def execute(solution: SolutionWrapper) -> SolutionWrapper:
   is_test = solution.tag.startswith('Test')
   start = 0
   end = 0
   elapsed_io = 0
   elapsed_part = 0
   
   start = time.perf_counter_ns()
   input = solution.path if solution.options.get('has_io') else get_input(solution.path)
   end = time.perf_counter_ns()
   elapsed_io = (end - start) / 1_000_000
   
   start = time.perf_counter_ns()
   result = solution.func(input, is_test)
   end = time.perf_counter_ns()
   elapsed_part = (end - start) / 1_000_000
   
   solution.result = result
   solution.elapsed = [elapsed_io, elapsed_part]
   
   return solution

def perform(solution: SolutionWrapper) -> SolutionWrapper:
   elapsed_io = []
   elapsed_part = []
   elapsed_overall = []
   
   for i in range(solution.iteration):
      execute(solution)
      elapsed_io.append(solution.elapsed[0])
      elapsed_part.append(solution.elapsed[1])
      elapsed_overall.append(elapsed_io[i] + elapsed_part[i])
   
   solution.bench = [
      [min(elapsed_io), max(elapsed_io), sum(elapsed_io) / len(elapsed_io)],
      [min(elapsed_part), max(elapsed_part), sum(elapsed_part) / len(elapsed_part)],
      [min(elapsed_overall), max(elapsed_overall), sum(elapsed_overall) / len(elapsed_overall)]
   ]
   
   return solution

def run(args: List[str], part1: Callable[[str, bool], str], part2: Callable[[str, bool], str], options: Dict):
   path = args[1]
   path_answers = os.path.join(path, 'answers.txt')
   path_input_test1 = os.path.join(path, 'test1.txt')
   path_input_test2 = os.path.join(path, ('test2.txt' if options.get('has_alternate') else 'test1.txt'))
   path_input_main = os.path.join(path, 'input.txt')
   iteration = int(args[2]) if len(args) > 2 else 1
   
   answers = get_answers(path_answers)
   solutions = [
      SolutionWrapper(tag='Test 1', func=part1, path=path_input_test1, test=answers.get('test1'), iteration=iteration, options=options),
      SolutionWrapper(tag='Part 1', func=part1, path=path_input_main, test=answers.get('part1'), iteration=iteration, options=options),
      SolutionWrapper(tag='Test 2', func=part2, path=path_input_test2, test=answers.get('test2'), iteration=iteration, options=options),
      SolutionWrapper(tag='Part 2', func=part2, path=path_input_main, test=answers.get('part2'), iteration=iteration, options=options)
   ]
   
   for solution in solutions:
      perform(solution)
   
   for solution in solutions:
      print_result(solution)
      test(solution.result, solution.test)
   
   return