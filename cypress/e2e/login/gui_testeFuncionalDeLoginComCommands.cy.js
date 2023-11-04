/// <reference types="Cypress"/>

import { user } from '../../configurations/testData';

describe('Teste Funcional de Login Com Commands', () => {

  it('Validado user incorreto', () => {
    cy.loginTeste('user incorreto', user.password)
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });
  it('Validando senha incorreta', () => {
    cy.loginTeste(user.username, 'senha incorreta')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });
  it('Deve realizar o login com sucesso', () => {
    cy.loginTeste(user.username, user.password)
    cy.get('.title').should('contain', 'Products')
  });
});