import { buildUsuarioAdministrador } from '../../../support/factories/usuario';
import * as UsuariosRequest from '../../api/usuarios/requests/usuarios.request';

describe('Frontend - Login', () => {
  const usuario = buildUsuarioAdministrador();

  before(() => {
    UsuariosRequest.cadastrarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Deve realizar login com sucesso na interface gráfica', () => {
    cy.visit('/login');

    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type(usuario.password);
    cy.get('[data-testid="entrar"]').click();

    cy.url().should('include', '/home');
    cy.get('h1').invoke('text').should('match', /bem\s+vindo/i);
    cy.get('h1').should('contain', usuario.nome);
  });

  it('Deve exibir mensagem de erro ao informar senha incorreta', () => {
    cy.visit('/login');

    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type('SenhaIncorretaParaEsteTeste!99');
    cy.get('[data-testid="entrar"]').click();

    cy.url().should('include', '/login');
    cy.get('[role="alert"]').should('be.visible').and('contain', 'inválidos');
  });
});
