using AutoMapper;
using AutoMapper.QueryableExtensions;
using CRM.App.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRM.App.Application.Companies.GetCompanies;

public record GetCompaniesRequest : IRequest<CompanyVm[]>;

public class GetCompaniesRequestHandler : IRequestHandler<GetCompaniesRequest, CompanyVm[]>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetCompaniesRequestHandler(IApplicationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<CompanyVm[]> Handle(GetCompaniesRequest request, CancellationToken cancellationToken)
    {
        return await _dbContext.Companies
            .AsNoTracking()
            .ProjectTo<CompanyVm>(_mapper.ConfigurationProvider)
            .ToArrayAsync();
    }
}