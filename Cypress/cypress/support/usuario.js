Cypress.Commands.add('Cria_usuario', (usuario) => {
  cy.api({
    method: 'POST',
    url: Cypress.config('baseUrl') + '/usuarios',
    body: usuario
  }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('Usuario gerado com sucesso')
      Cypress.env('id_usuario', response.body._id)
  })
})

Cypress.Commands.add('Lista_usuario', () => {
  cy.api({
      method: 'GET',
      url: `${Cypress.config('baseUrl') + '/usuarios'}`
  }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Listagem de todos os usuarios realizada')}
  )})

Cypress.Commands.add('Lista_usuario_ID', () => {
  cy.api({
      method: 'GET',
      url: `${Cypress.config('baseUrl') + '/usuarios'}/${Cypress.env('id_usuario')}`
  }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Usuario encontrado')}
)})
Cypress.Commands.add('Exclui_usuario', () => {
  cy.api({
      method: 'DELETE',
      url: `${Cypress.config('baseUrl') + '/usuarios'}/${Cypress.env('id_usuario')}`
  }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Usuario excluído')}
)})
Cypress.Commands.add('Atlz_usuario', (user) => {
  cy.api({
    method: 'PUT',
    url: `${Cypress.config('baseUrl') + '/usuarios'}/${Cypress.env('id_usuario')}`,
    body: user
  }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Dados do usuario atualizados')
  })
})
Cypress.Commands.add('Atlz_Parc_usuario', (user) => {
  cy.api({
    method: 'PATCH',
    url: `${Cypress.config('baseUrl') + '/usuarios'}/${Cypress.env('id_usuario')}`,
    body: user
  }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq('Dados do usuario atualizados')
  })
})