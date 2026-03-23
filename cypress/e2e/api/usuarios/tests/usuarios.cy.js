import { buildUsuarioAdministrador } from '../../../../support/factories/usuario';
import * as UsuariosRequest from '../requests/usuarios.request';

describe('API - Usuários (cadastro)', () => {
  it('Deve cadastrar um novo usuário administrador com sucesso', () => {
    const usuario = buildUsuarioAdministrador();

    UsuariosRequest.cadastrarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id').that.is.a('string').and.not.be.empty;
    });
  });

  it('Deve rejeitar cadastro quando o e-mail já estiver em uso', () => {
    const usuario = buildUsuarioAdministrador();

    UsuariosRequest.cadastrarUsuario(usuario).then((primeiro) => {
      expect(primeiro.status).to.eq(201);
    });

    UsuariosRequest.cadastrarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });
});
