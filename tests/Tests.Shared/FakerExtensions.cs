namespace Faker;

public static class Date
{
    public static DateTime RandomDateTime()
    {
        var year = Random.Shared.Next(1990, 2022);
        var month = Random.Shared.Next(1, 13);
        var day = Random.Shared.Next(1, DateTime.DaysInMonth(year, month) + 1);
        var hour = Random.Shared.Next(1, 24);
        var minute = Random.Shared.Next(1, 60);
        var second = Random.Shared.Next(1, 60);

        return new DateTime(year, month, day, hour, minute, second);
    }

    public static DateTime RandomDateTimeUtc()
    {
        return RandomDateTime().ToUniversalTime();
    }
}
