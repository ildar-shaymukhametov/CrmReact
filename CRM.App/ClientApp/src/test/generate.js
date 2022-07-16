import { faker } from "@faker-js/faker";

export { buildUser, buildCompany };

function buildUser() {
  return {
    name: faker.internet.email(),
  };
}

function buildCompany(overrides) {
  return {
    id: faker.random.numeric(),
    name: faker.company.companyName(),
    createdAt: faker.date.past(),
    type: faker.company.companySuffix(),
    inn: faker.random.numeric(10),
    address: `${faker.address.city()}, ${faker.address.streetAddress()}`,
    ceo: faker.name.findName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    contacts: faker.internet.email(),
    ...overrides,
  };
}
