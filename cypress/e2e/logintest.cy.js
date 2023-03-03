describe('LoginTest', () => { // test suite spec loginTest

  const loginpage = require('../PageObjects/loginpage.json')     //imports loginpage jsonfile data
  const env_var = require('../Test_Environment/env_variables.json') //imports env_variables jsonfile data


  let userdata // decalring variable
  
  before(()=>  {     //starting of before hook
  cy.fixture('LoginData').then((data) => {
  userdata = data //coping json data into the variable 'userdata'
  })
  }) //ending of before hook

  beforeEach(() => { //starting of beforeeach hook
    cy.visit(env_var.BaseURL)
  }) //ending of before each hook

  it('should log in successfully with valida data', () => {  // postive test case 
    
      cy.get(loginpage.username).type(userdata.username_valid)
      cy.get(loginpage.password).type(userdata.password_valid)
      cy.get(loginpage.submit).click()
      cy.wait(3000)
      // assert that login was successful
      cy.url().should('include', 'dashboard').debug() // write error log into console
      cy.pause() 
      cy.contains('Welcome').should('be.visible')
  })

  it('Should display error message with invalid credentials', () => { //negative test case
   
    
    cy.get(loginpage.username).type(userdata.username_invalid)
    cy.get(loginpage.password).type(userdata.password_invalid)    
    cy.get(loginpage.submit,{ timeout: 10000 }).click()
    // Assert that an error message is displayed
    cy.contains('Username and Password Wrong').should('be.visible')
    cy.scrollTo('bottom')
  })
  })