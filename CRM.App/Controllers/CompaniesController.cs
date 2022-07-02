using CRM.App.Application.Companies.GetCompanies;
using Microsoft.AspNetCore.Mvc;

namespace CRM.App.Controllers;

public class CompaniesController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<CompanyVm[]>> Get()
    {
        return await Mediator.Send(new GetCompaniesRequest());
    }
}