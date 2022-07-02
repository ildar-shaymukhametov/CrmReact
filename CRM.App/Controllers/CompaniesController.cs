using CRM.App.Application.Companies.Queries.GetCompanies;
using Microsoft.AspNetCore.Mvc;

namespace CRM.App.Controllers;

public class CompaniesController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<CompanyDto[]>> Get()
    {
        return await Mediator.Send(new GetCompaniesQuery());
    }
}