using CRM.App.Application.Companies.Queries.GetCompanies;

namespace CRM.App.Application.IntegrationTests.Companies.Queries;

public class GetCompaniesTests : BaseTest
{
    public GetCompaniesTests(BaseTestFixture fixture) : base(fixture) { }

    [Fact]
    public async Task Should_return_companies()
    {
        var user = await _fixture.RunAsDefaultUserAsync();

        var company = Faker.Builders.Company();
        await _fixture.AddAsync(company);

        var request = new GetCompaniesQuery();
        var result = await _fixture.SendAsync(request);

        Assert.Collection(result, x => Assert.Equal(company.Id, x.Id));
    }
}