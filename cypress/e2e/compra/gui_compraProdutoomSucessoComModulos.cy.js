/// <reference types="Cypress" />
import { logarComSucesso } from '../login/components/logarComSucesso';

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {

  it('Fluxo da compra de produtos', () => {

    logarComSucesso()

    //ordenação de produtos de menor para maior valor
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)')

    const productsNames = ['Sauce Labs Onesie', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']

    // Validação da ordenação dos produtos
    cy.get(':nth-child(1) > .inventory_item_description').should('contain', productsNames[0])
    cy.get(':nth-child(2) > .inventory_item_description').should('contain', productsNames[1])
    cy.get(':nth-child(3) > .inventory_item_description').should('contain', productsNames[2])

    // Adicionando os produto ao carrinho
    productsNames.forEach(productName => {
      cy.contains(productName).click()
      cy.get('.btn_primary').click()
      cy.get('[data-test="back-to-products"]').click()
    });

    //Checagem da quantidade de produtos adicionados ao carrinho
    cy.get('.shopping_cart_link').should('have.text', '3')

    //Acessando o carrinho
    cy.get('.shopping_cart_link').click()

    //Validando se os produtos estão realmente no carrinho
    cy.get('.cart_list > :nth-child(3)').should('contain', productsNames[0])
    cy.get('.cart_list > :nth-child(4)').should('contain', productsNames[1])
    cy.get('.cart_list > :nth-child(5)').should('contain', productsNames[2])

    //Checkout
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Fulano')
    cy.get('[data-test="lastName"]').type('de Tal')
    cy.get('[data-test="postalCode"]').type('16200-000')
    cy.get('[data-test="continue"]').click()

    //Validar se os meus produtos são realmente os que estão no checkout
    cy.get('.cart_list > :nth-child(3)').should('contain', productsNames[0])
    cy.get('.cart_list > :nth-child(4)').should('contain', productsNames[1])
    cy.get('.cart_list > :nth-child(5)').should('contain', productsNames[2])

    //checkar o valor total
    cy.get('.summary_total_label').should('have.text', 'Total: $36.69')

    //Finalizando o pedido
    cy.get('[data-test="finish"]').click()

    //validando finalização de pedido
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')

  });
});