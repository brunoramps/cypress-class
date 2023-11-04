/// <reference types="Cypress" />
import { logarComSucesso } from '../login/components/logarComSucesso';

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {

  it('Fluxo da compra de produtos', () => {

    logarComSucesso()
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
  });
});