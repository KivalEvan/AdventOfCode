namespace Core;

public static class Input
{
   public record struct Answers
   {
      public required string Test1 { get; set; }
      public required string Test2 { get; set; }
      public required string Part1 { get; set; }
      public required string Part2 { get; set; }
   }

   public static string GetInput(string path)
   {
      return File.ReadAllText(path).TrimEnd();
   }

   public static Answers GetAnswers(string path)
   {
      string text = File.ReadAllText(path);
      string[] ary = text.Split('\n');
      Answers answers = new()
      {
         Test1 = ary[0],
         Part1 = ary[1],
         Test2 = ary[2],
         Part2 = ary[3]
      };

      return answers;
   }
}
