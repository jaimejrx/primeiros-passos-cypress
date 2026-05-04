import userData from '../fixtures/users/userData.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    loginButton: '[type="submit"]',
    sectionTitleTopBar: '.oxd-topbar-header-breadcrumb-module',
    dashboardGrid: '.orangehrm-dashboard-grid',
    wrongCredentialAlert: '[role="alert"]',
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: '[name="firstName"]',
    lastNameField: '[name="lastName"]',
    genericField: '.oxd-input--active',
    dateField: '[placeholder="yyyy-dd-mm"]',
    genericCombobox: '.oxd-select-text--arrow',
    secondItemCombobox: '.oxd-select-dropdown > :nth-child(3)',
    thirdItemCombobox: '.--selected',
    dateCloseButton: '.--close',
    submitButton: '[type="submit"]',
   }  
   
  it.only('User Info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
    // cy.get(selectorsList.genericField).eq(3).clear().type('NicknameTest') - campo excluido do site orangehrm
    cy.get(selectorsList.genericField).eq(3).clear().type('EmployeeId')
    cy.get(selectorsList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorsList.genericField).eq(5).clear().type('DriversLicenseTest')
    cy.get(selectorsList.genericField).eq(6).clear().type('2026-30-04')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitButton).eq(0).click({ force: true })
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get('.oxd-toast-close')

    cy.get(selectorsList.genericCombobox).eq(0).click({ force: true })
    cy.get(selectorsList.secondItemCombobox).click()
    cy.get(selectorsList.genericCombobox).eq(1).click({ force: true })
    cy.get(selectorsList.thirdItemCombobox).click()
    
    // cy.get(selectorsList.genericField).eq(8).clear().type('ssnNumberTest') - campo excluido do site orangehrm
    // cy.get(selectorsList.genericField).eq(9).clear().type('sinNumberTest') - campo excluido do site orangehrm
  })
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type('userData.userFail.username')
    cy.get(selectorsList.passwordField).type('userData.userFail.password')
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })  
})