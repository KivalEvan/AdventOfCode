package core

import java.io.File

data class Answers(
   val test1: String,
   val part1: String,
   val test2: String,
   val part2: String
)

fun getInput(path: String): String {
   return File(path).readText()
}

fun getAnswer(path: String): Answers {
   return File(path).readLines().map { it.trim() }.chunked(4).map { Answers(it[0], it[1], it[2], it[3]) }.first()
}