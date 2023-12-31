/// <reference types="Cypress" />
import { validarSenhaIncorreta } from './components/validarSenhaIncorreta.js';
import { validarUserIncorreto } from './components/validarUserIncorreto.js';
import { logarComSucesso } from './components/logarComSucesso.js';

testeFuncionalDeLogin();

function testeFuncionalDeLogin(params) {
  describe('Teste Funcional de Login', () => {
    it('Validado user incorreto', () => {
      validarUserIncorreto()
    });
    it('Validando senha incorreta', () => {
      validarSenhaIncorreta()
    });
    it('Realizar Login', () => {
      logarComSucesso()
    });
  });
}

export { testeFuncionalDeLogin }