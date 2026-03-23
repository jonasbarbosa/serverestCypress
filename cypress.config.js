const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev/',
    allowCypressEnv: false,
    env: {
      apiUrl: 'https://serverest.dev/',
    },
    video: false,
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: 'cypress/results/junit-[hash].xml',
      toConsole: false,
    },
  },
});