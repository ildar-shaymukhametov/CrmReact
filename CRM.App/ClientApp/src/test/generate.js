import { faker } from "@faker-js/faker";

export { buildUser, buildCompany };

function buildUser() {
  return {
    name: faker.internet.email(),
  };
}

function buildCompany(overrides) {
  return {
    id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    no: faker.random.numeric(),
    createdAt: faker.date.past(),
    ...overrides,
  };
}
