namespace SkillAssessment.GlobalException
{
    public static class CustomException
    {
        public static Dictionary<string, string> ExceptionMessages { get; } =
            new Dictionary<string, string>
            {
            { "NoId", "Id is not matched.Try Again" },
            { "CantEmpty", "This Entry cannot be null" },
            { "NoUpdate", "No value is Updated" },
            { "Image", "There is no image" }
            };
    }
}