import { buildUsuarioAdministrador } from '../../../../support/factories/usuario';
import * as LoginRequest from '../requests/login.request';
import * as UsuariosRequest from '../../usuarios/requests/usuarios.request';

describe('API - Login', () => {
  it('Deve autenticar usuário cadastrado e retornar token de autorização', () => {
    const usuario = buildUsuarioAdministrador();

    UsuariosRequest.cadastrarUsuario(usuario).then((cadastro) => {
      expect(cadastro.status).to.eq(201);
      expect(cadastro.body.message).to.eq('Cadastro realizado com sucesso');
    });

    LoginRequest.realizarLogin(usuario.email, usuario.password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body.authorization).to.be.a('string').and.match(/^Bearer\s+.+/);
    });
  });
});
