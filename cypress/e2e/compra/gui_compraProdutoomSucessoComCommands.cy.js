/// <reference types="Cypress" />
import { user, productsNames, client } from '../../configurations/testData';

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {

  it('Fluxo da compra de produtos', () => {

    //realizando login
    cy.loginTeste(user.username, user.password)

    //ordenação de produtos de menor para maior valor
    cy.get('[data-test="product_sort_container"]').select('Price (low to high)')

    // Validação da ordenação dos produtos
    cy.validarOdenacao(productsNames)

    // Adicionando os produto ao carrinho
    cy.adicionarProdutosNoCarrinho(productsNames)

    //Checagem da quantidade de produtos adicionados ao carrinho
    cy.get('.shopping_cart_link').should('have.text', '3')

    //Acessando o carrinho
    cy.get('.shopping_cart_link').click()

    //Validando se os produtos estão realmente no carrinho
    cy.validarSeProdutosEstaoPresentes(productsNames)

    //Checkout
    cy.preencherFormulario(client)

    //Validar se os meus produtos são realmente os que estão no checkout
    cy.validarSeProdutosEstaoPresentes(productsNames)


    //checkar o valor total
    cy.get('.summary_total_label').should('have.text', 'Total: $36.69')

    //Finalizando o pedido
    cy.get('[data-test="finish"]').click()

    //validando finalização de pedido
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')

  });
});