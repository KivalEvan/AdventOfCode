using System;
using System.IO;

namespace Utils;
public static class Input
{
   public struct Answers
   {
      public string Test1 { get; set; }
      public string Test2 { get; set; }
      public string Part1 { get; set; }
      public string Part2 { get; set; }
   }

   public static string GetInput(string path)
   {
      return File.ReadAllText(path);
   }

   public static Answers GetAnswers(string path)
   {
      File.ReadAllText(path);
      var answers = new Answers();
      answers.Test1 = "";
      answers.Test2 = "";
      answers.Part1 = "";
      answers.Part2 = "";

      return answers;
   }
}