export const cadastrarUsuario = (payload) => {
  return cy.env(['apiUrl']).then(({ apiUrl }) =>
    cy.request({
      method: 'POST',
      url: `${apiUrl}usuarios`,
      failOnStatusCode: false,
      body: payload,
    })
  );
};