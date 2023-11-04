/// <reference types="Cypress"/>

Cypress.Commands.add('preencherFormulario', (client) => {
  cy.get('[data-test="checkout"]').click()
  cy.get('[data-test="firstName"]').type(client.firstName)
  cy.get('[data-test="lastName"]').type(client.lastName)
  cy.get('[data-test="postalCode"]').type(client.postalCode)
  cy.get('[data-test="continue"]').click()

})

Cypress.Commands.add('validarSeProdutosEstaoPresentes', (productsNames) => {
  cy.get('.cart_list > :nth-child(3)').should('contain', productsNames[0])
  cy.get('.cart_list > :nth-child(4)').should('contain', productsNames[1])
  cy.get('.cart_list > :nth-child(5)').should('contain', productsNames[2])
})

Cypress.Commands.add('validarOdenacao', (productsNames) => {
  cy.get(':nth-child(1) > .inventory_item_description').should('contain', productsNames[0])
  cy.get(':nth-child(2) > .inventory_item_description').should('contain', productsNames[1])
  cy.get(':nth-child(3) > .inventory_item_description').should('contain', productsNames[2])
})

Cypress.Commands.add('adicionarProdutosNoCarrinho', (productsNames) => {
  productsNames.forEach(productName => {
    cy.contains(productName).click()
    cy.get('.btn_primary').click()
    cy.get('[data-test="back-to-products"]').click()
  });
})