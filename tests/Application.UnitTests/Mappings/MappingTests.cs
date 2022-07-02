using System.Reflection;
using System.Runtime.Serialization;
using AutoMapper;
using CRM.App.Application.Common.Mappings;
using CRM.App.Application.Companies.Commands.CreateCompany;
using CRM.App.Domain.Entities;

namespace CRM.App.Application.UnitTests.Mappings;

public class MappingTests
{
    private readonly IConfigurationProvider _configuration;
    private readonly IMapper _mapper;

    public MappingTests()
    {
        _configuration = new MapperConfiguration(config => config.AddMaps(Assembly.GetAssembly(typeof(MappingProfile))));
        _mapper = _configuration.CreateMapper();
    }

    [Fact]
    public void Should_have_valid_configuration()
    {
        _configuration.AssertConfigurationIsValid();
    }

    [Theory]
    [InlineData(typeof(CreateCompanyCommand), typeof(Company))]
    public void Should_support_mapping_from_source_to_destination(Type source, Type destination)
    {
        var instance = GetInstanceOf(source);

        _mapper.Map(instance, source, destination);
    }

    private object GetInstanceOf(Type type)
    {
        if (type.GetConstructor(Type.EmptyTypes) != null)
        {
            return Activator.CreateInstance(type)!;
        }

        // Type without parameterless constructor
        return FormatterServices.GetUninitializedObject(type);
    }
}
