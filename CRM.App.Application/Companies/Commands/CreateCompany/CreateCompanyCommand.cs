using AutoMapper;
using CRM.App.Application.Common.Interfaces;
using CRM.App.Domain.Entities;
using CRM.App.Domain.Events;
using MediatR;

namespace CRM.App.Application.Companies.Commands.CreateCompany;

public record CreateCompanyCommand : IRequest<int>
{
    public string? Type { get; set; }
    public string? Name { get; set; }
    public string? Inn { get; set; }
    public string? Address { get; set; }
    public string? Ceo { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Contacts { get; set; }
}

public class CreateCompanyCommandHandler : IRequestHandler<CreateCompanyCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CreateCompanyCommandHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<int> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<Company>(request);
        entity.AddDomainEvent(new CompanyCreatedEvent(entity));

        _context.Companies.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
