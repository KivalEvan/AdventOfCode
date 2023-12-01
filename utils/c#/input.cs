public static class Input
{
   public struct Answers
   {
      public string Test1 { get; set; }
      public string Test2 { get; set; }
      public string Part1 { get; set; }
      public string Part2 { get; set; }
   }

   public string GetInput(string path)
   {
      return "";
   }

   public Answers GetAnswers(string path)
   {
      return new Answers();
   }
}