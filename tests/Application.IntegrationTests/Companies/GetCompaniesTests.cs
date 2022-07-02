using CRM.App.Application.Companies.GetCompanies;
using CRM.App.Domain.Entities;

namespace CRM.App.Application.IntegrationTests.Companies;

public class GetCompaniesTests : BaseTest
{
    public GetCompaniesTests(BaseTestFixture fixture) : base(fixture) { }

    [Fact]
    public async Task Should_return_companies()
    {
        var user = await _fixture.RunAsDefaultUserAsync();

        var company = new Company
        {
            Type = Faker.Company.Suffix(),
            Name = Faker.Company.Name(),
            Inn = Faker.RandomNumber.Next(1_000_000_000, 9_999_999_999).ToString(),
            Address = $"{Faker.Address.City}, {Faker.Address.StreetAddress}",
            Ceo = Faker.Name.FullName(),
            Phone = Faker.Phone.Number(),
            Email = Faker.Internet.Email(),
            Contacts = Faker.Internet.FreeEmail()
        };
        await _fixture.AddAsync(company);

        var request = new GetCompaniesRequest();
        var result = await _fixture.SendAsync(request);

        Assert.Collection(result, x =>
        {
            Assert.Equal(company.Id, x.Id);
            Assert.Equal(company.CreatedAtUtc, BaseTestFixture.UtcNow);
            Assert.Equal(company.CreatedBy, user.Id);
        });
    }
}