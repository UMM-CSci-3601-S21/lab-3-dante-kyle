import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for owner 'Blanche'
    cy.get('#todo-owner-input').type('Blanche');

    // All of the list items should have the owner we are filtering by
    page.getTodoListItems().each(e => {
      cy.wrap(e).find('.todos-list-owner').should('have.text', 'Owner: Blanche');
    });

    // (We check this two ways to show multiple ways to check this)
    page.getTodoListItems().find('.todos-list-owner').each($el =>
      expect($el.text()).to.equal('Owner: Blanche')
    );
  });

  it('Should type something in the status filter and check that it returned correct elements', () => {
    // Filter for todos based on status
    cy.get('#todo-status-input').type('true');

    // All of the todo list items should have the status being filtered by
    page.getTodoListItems().find('.todos-list-status').each($card => {
      cy.wrap($card).should('have.text', 'Completion Status: true');
    });
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'homework'
    cy.get('#todo-category-input').type('homework');

    // All of the user cards should have the company we are filtering by
    page.getTodoListItems().find('.todos-list-category').each($card => {
      cy.wrap($card).should('have.text', 'Category: homework');
    });
  });

  it('Should type something partial in the owner filter and check that it returned correct elements', () => {
    // Filter for owners that contain 'B'
    cy.get('#todo-owner-input').type('B');

    page.getTodoListItems().find('.todos-list-owner');

    cy.get('.todos-list-owner').should('contain.text', 'B');
  });

  it('Should type something partial in the status filter and check that it returned correct elements', () => {
    // Filter for owners that contain 'ru'
    cy.get('#todo-status-input').type('ru');

    page.getTodoListItems().find('.todos-list-status');

    cy.get('.todos-list-status').should('contain.text', 'ru');
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    // Filter for categories that contain 'w'
    cy.get('#todo-category-input').type('w');

    page.getTodoListItems().find('.todos-list-category');

    cy.get('.todos-list-category').should('contain.text', 'w');
  });

  it('Should type something partial in the body filter and check that it returned correct elements', () => {
    // Filter for companies that contain 'ipsum'
    cy.get('#todo-body-input').type('ipsum');

    // Go through each of the list items that are being shown and get the bodies.
    page.getTodoListItems().find('.todos-list-body');
      // We should see todos with 'ipsum' in there
    cy.get('.todos-list-body').should('contain.text', 'ipsum');
  });
});
