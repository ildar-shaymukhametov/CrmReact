namespace CRM.App.Application.IntegrationTests;

[Collection("Database")]
public abstract class BaseTest : IAsyncLifetime
{
    protected readonly BaseTestFixture _fixture;

    public BaseTest(BaseTestFixture fixture)
    {
        _fixture = fixture;
    }

#pragma warning disable CS1998
    public async Task DisposeAsync()
    {
    }
#pragma warning restore CS1998

    public async Task InitializeAsync()
    {
        await _fixture.ResetState();
    }
}
