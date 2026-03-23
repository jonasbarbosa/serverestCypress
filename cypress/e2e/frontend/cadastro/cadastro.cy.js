import { buildUsuarioAdministrador } from '../../../support/factories/usuario';

describe('Frontend - Cadastro de usuário', () => {
  it('Deve cadastrar administrador pela interface e acessar a área administrativa', () => {
    const usuario = buildUsuarioAdministrador();

    cy.visit('/cadastrarusuarios');

    cy.get('[data-testid="nome"]').type(usuario.nome);
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="password"]').type(usuario.password);
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();

    cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso');

    cy.url({ timeout: 15000 }).should('include', '/admin/home');
    cy.get('h1').invoke('text').should('match', /bem\s+vindo/i);
    cy.get('h1').should('contain', usuario.nome);
  });
});
