package core

fun timer (fn: () -> String): Pair<String, Long> {
   val start = System.nanoTime()
   val result = fn()
   val end = System.nanoTime()
   return Pair(result, end - start)
}

fun perform (tag: String, fn: (String, Boolean) -> String, path: String, hasIo: Boolean = false): String {
   println("\\ $tag")
   val isTest = tag.startsWith("Test")

   val (input, elapsedIo) = timer { hasIo ? path : Input.getInput(path) }
   val (output, elapsedPart) = timer { fn(input, isTest) }
   
   println(" -- Time taken (ms):")
   println(" | IO > PART > ALL")
   println(" | " + (elapsedIo / 1_000_000) + " > " + (elapsedPart / 1_000_000) + " > " + (elapsedIo + elapsedPart) / 1_000_000)
   println("/ Result: " + output)
   
   return output
}

fun bench (tag: String, fn: (String, Boolean) -> String, path: String, it: Int, hasIo: Boolean = false) {
   val isTest = tag.startsWith("Test")
   
   val timesIo = mutableListOf<Float>()
   val timesPart = mutableListOf<Float>()
   val timesOverall = mutableListOf<Float>()

   for (i in 1..it) {
      val (input, elapsedIo) = timer { hasIo ? path : Input.getInput(path) }
      val (output, elapsedPart) = timer { fn(input, isTest) }

      timesIo.add(elapsedIo / 1_000_000)
      timesPart.add(elapsedPart / 1_000_000)
      timesOverall.add((elapsedIo + elapsedPart) / 1_000_000)
   }

   var min, max, avg
   println("\nBenchmarking " + tag + " (ms) min..max avg")

   min = timesIo.min()
   max = timesIo.max()
   avg = timesIo.sum() / timesIo.size
   println("IO: " + min + " .. " + max + " - " + avg)

   min = timesPart.min()
   max = timesPart.max()
   avg = timesPart.sum() / timesPart.size
   println("Part: " + min + " .. " + max + " - " + avg)

   min = timesOverall.min()
   max = timesOverall.max()
   avg = timesOverall.sum() / timesOverall.size
   println("Overall: " + min + " .. " + max + " - " + avg)
}

fun run (
   args: Array<String>,
   part1: (String, Boolean) -> String,
   part2: (String, Boolean) -> String,
   options: SolutionOptions
) {
   if (args.isEmpty()) {
      println("Usage: java -jar <jar> <path> <path> <tag>")
      return
   }

   val pathAnswers = args[0] + "/answers.txt"
   val pathInputTest1 = args[0] + "/test1.txt"
   val pathInputTest2 = args[0] + (options.hasAlternate ? "/test2.txt" : "/test1.txt")
   val pathInputMain = args[0] + "/input.txt"

   val itBench = args[1]
   if (itBench != "0") {
      bench("Test 1", part1, pathInputTest1, itBench.toInt(), options.hasIo)
      bench("Part 1", part1, pathInputMain, itBench.toInt(), options.hasIo)
      bench("Test 2", part2, pathInputTest2, itBench.toInt(), options.hasIo)
      bench("Part 2", part2, pathInputMain, itBench.toInt(), options.hasIo)
      return
   }

   val answers = getAnswers(pathAnswers)
   val result
   result = perform("Test 1", part1, answers.test1, options.hasIo)
   test(result, answers.part1)
   result = perform("Part 1", part1, answers.part1, options.hasIo)
   test(result, answers.part1)
   result = perform("Test 2", part2, answers.test2, options.hasIo)
   test(result, answers.part2)
   result = perform("Part 2", part2, answers.part2, options.hasIo)
   test(result, answers.part2)
}