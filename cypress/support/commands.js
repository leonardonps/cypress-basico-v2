// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('[id="firstName"]')
        .should('be.visible')  
        .type('Leonardo')
        .should('have.value', 'Leonardo')
        
    cy.get('[id="lastName"]')
        .should('be.visible')
        .type('Silva')
        .should('have.value', 'Silva')

    cy.get('[id="email"]')
        .should('be.visible')
        .type('leonardosilva@gmail.com')
        .should('have.value', 'leonardosilva@gmail.com')

    cy.get('[id="open-text-area"]')
        .should('be.visible')
        .type('Preciso de ajuda. Pode me ajudar? This original Lorem Ipsum Latin text is 249 words long (1,740 characters). Note that the famous paragraph from this text is actually this series of words cut out and re-arranged from the above text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        {delay: 0})
        .should('have.value', 'Preciso de ajuda. Pode me ajudar? This original Lorem Ipsum Latin text is 249 words long (1,740 characters). Note that the famous paragraph from this text is actually this series of words cut out and re-arranged from the above text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')

    cy.get('[type="submit"]').contains('Enviar').click()
})