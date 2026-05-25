describe('Store_API', () => {
  it('Criar Usuario',()=>{
    cy.fixture('usuario').then(function(usuario){
      const user = usuario.user;
      cy.Cria_usuario(user)
    })
  })
  it('Busca Usuario',()=>{
      cy.Lista_usuario()
  })
  it('Busca Usuario ID',()=>{
    cy.Lista_usuario_ID()
  })
  it('Atualiza Usuario',()=>{
    cy.fixture('usuario').then(function(usuario){
      const user = usuario.atlz_usuario;
      cy.Atlz_usuario(user)
    })
  })
  it('Atualiza Usuario Parcialmente',()=>{
    cy.fixture('usuario').then(function(usuario){
      const user = usuario.atlz_parc;
      cy.Atlz_Parc_usuario(user)
    })
  })
  it('Exclui Usuario',()=>{
    cy.Exclui_usuario()
  })
})