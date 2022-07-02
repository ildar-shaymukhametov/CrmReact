using CRM.App.Application.Common.Exceptions;
using CRM.App.Application.Companies.Commands.CreateCompany;
using CRM.App.Domain.Entities;

namespace CRM.App.Application.IntegrationTests.Companies;

public class CreateCompanyTests : BaseTest
{
    public CreateCompanyTests(BaseTestFixture fixture) : base(fixture) { }

    [Fact]
    public async Task Should_require_minimum_fields()
    {
        var command = new CreateCompanyCommand();
        await Assert.ThrowsAsync<ValidationException>(() => _fixture.SendAsync(command));
    }

    [Fact]
    public async Task Should_create_company()
    {
        var user = await _fixture.RunAsDefaultUserAsync();

        var data = Faker.Builders.Company();
        var command = new CreateCompanyCommand
        {
            Address = data.Address,
            Ceo = data.Ceo,
            Contacts = data.Contacts,
            Email = data.Email,
            Inn = data.Inn,
            Name = data.Name,
            Phone = data.Phone,
            Type = data.Type
        };

        var companyId = await _fixture.SendAsync(command);
        var company = await _fixture.FindAsync<Company>(companyId);

        Assert.NotNull(company);
        Assert.Equal(companyId, company!.Id);
        Assert.Equal(BaseTestFixture.UtcNow, company.CreatedAtUtc);
        Assert.Equal(user.Id, company.CreatedBy);
    }
}