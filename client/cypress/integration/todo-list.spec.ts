import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the name filter and check that it returned correct elements', () => {
    // Filter for owner 'Lynn Ferguson'
    cy.get('#todo-owner-input').type('Blanche');

    // All of the list items should have the name we are filtering by
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
    // Filter for companies that contain 'ti'
    cy.get('#todo-owner-input').type('B');

    // Go through each of the cards that are being shown and get the companies
    page.getTodoListItems().find('.todos-list-owner')
      // We should see these owners
      .should('contain.text', 'Owner: Blanche')
      .should('contain.text', 'Owner: Barry')
      .should('contain.text', 'Owner: Roberta')
      // We shouldn't see these owners
      .should('not.contain.text', 'Owner: Dawn')
      .should('not.contain.text', 'Owner: Fry')
      .should('not.contain.text', 'Owner: Workman');
  });
});
