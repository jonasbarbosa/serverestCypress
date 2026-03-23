import { faker } from '@faker-js/faker';

export function buildUsuarioAdministrador(overrides = {}) {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: 'true',
    ...overrides,
  };
}
