namespace Core;

public readonly record struct SolutionOptions
{
   public readonly bool HasAlternate { get; init; }
   public readonly bool HasIO { get; init; }
}
