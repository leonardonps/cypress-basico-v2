/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach( function(){
        cy.visit('./src/index.html')      
    })
   
    it('verifica o título da aplicação', function(){
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
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

      cy.get('[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
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
        .type('leonardosilvaail.com')
        .should('have.value', 'leonardosilvaail.com')

      cy.get('[id="open-text-area"]')
        .should('be.visible')
        .type('Teste',
        {delay: 0})
        .should('have.value', 'Teste')

      cy.get('[type="submit"]').contains('Enviar').click()

      cy.get('[class="error"]').should('be.visible')
    })

    it('valida que, se um valor não-númerico for digitado, o valor do campo telefone continuará vazio', function(){
        cy.get('[id="phone"]')
        .type('teste letras')
        .should('have.text', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',
    function(){
      
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
      
      cy.get('#phone-checkbox').check()
        

      cy.get('[id="open-text-area"]')
      .should('be.visible')
      .type('Teste',
      {delay: 0})
      .should('have.value', 'Teste')

      cy.get('[type="submit"]').contains('Enviar').click()

      cy.get('[class="error"]').should('be.visible')
      
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      
      cy.get('[id="firstName"]')
        .should('be.visible')  
        .type('Leonardo')
        .should('have.value', 'Leonardo')
        .clear()
        .should('have.value', '')
    
      cy.get('[id="lastName"]')
        .should('be.visible')
        .type('Silva')
        .should('have.value', 'Silva')
        .clear()
        .should('have.value', '')

      cy.get('[id="email"]')
        .should('be.visible')
        .type('leonardosilva@gmail.com')
        .should('have.value', 'leonardosilva@gmail.com')
        .clear()
        .should('have.value', '')

      cy.get('[id="phone"]')
        .should('be.visible')
        .type('912345678')
        .should('have.value', '912345678')
        .clear()
        .should('have.value', '')
      
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      
      cy.get('[type="submit"]').contains('Enviar').click()
      cy.get('[class="error"]').should('be.visible')

    })

    it('envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('[class="success"]').should('be.visible')
    })

    it('seleciona um produto - Youtube - por seu texto', function(){
      cy.get('[id="product"]')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto - Mentoria - por seu valor', function(){
      cy.get('[id="product"]')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto - Blog - por seu índice', function(){
      cy.get('[id="product"]')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function(){
      cy.get('input[value="feedback"]')
        .check()
        .should('be.checked')
    })

    it('marca cada tipo de atendimento', function(){
/*       cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked')
      
      cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked')

      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked') */

      // Forma mais correta
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio)
            .check()
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]').check()
      cy.get('input[type="checkbox"][value="phone"]')
        .uncheck()
        .last()
        .uncheck()
        .should('not.be.checked');
    })

    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('C:/Users/ldonas/Downloads/Leonardo do Nascimento Peixoto da Silva[806].pdf')
        .then(function(input) {
          expect(input[0].files[0].name).to.equal('Leonardo do Nascimento Peixoto da Silva[806].pdf')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]', { action: 'drag-drop'})
        .should('not.have.value')
        .selectFile('C:/Users/ldonas/Downloads/Leonardo do Nascimento Peixoto da Silva[806].pdf')
        .then(function(input) {
          expect(input[0].files[0].name).to.equal('Leonardo do Nascimento Peixoto da Silva[806].pdf')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type = "file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
    })

    it('acessa página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
        .click()
      cy.get('h1[id="title"]')
        .should('have.text', 'CAC TAT - Política de privacidade')
    })

    it.only('testa a página da política de privacidade de forma independente', function(){
      cy.visit("./src/privacy.html")
    })


})