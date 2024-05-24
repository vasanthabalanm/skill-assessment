using System.Numerics;

namespace SkillAssessment.Service.AddQuestionService
{

    public class CalculateServiceTest : BasicCalculator
    {
        public static void Calculation()
        {
            AdvanceCalculator a  = new AdvanceCalculator();
            Console.WriteLine("Addition Of Two Numbers ", a.Add(10, 5));
        }
    }

    public class AdvanceCalculator : BasicCalculator 
    {
        public int Add(int a, int b)
        {
            Console.WriteLine("Base Class Add Method Called");
            int c;
            c=Add(a, b);
            Console.WriteLine(c);
           return c;
        }
    }

    public class BasicCalculator
    {
        public int Add(int a, int b)
        {
            Console.WriteLine(a);
            Console.WriteLine(b);
            return a + b;

        }
    }
}
