export const realizarLogin = (email, password) => {
  return cy.env(['apiUrl']).then(({ apiUrl }) =>
    cy.request({
      method: 'POST',
      url: `${apiUrl}login`,
      failOnStatusCode: false,
      body: {
        email: email,
        password: password,
      },
    })
  );
};
