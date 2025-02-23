import { SelectMenuOption } from './index';
import { cypressPassThroughTestsFactory } from '@/cypress/support/utils';

describe('SelectMenuOption', () => {
  it('Basic Test (generated)', () => {
    cy.mount(<SelectMenuOption />);
    cy.get('[ui5-select-menu-option]').should('exist');
  });

  cypressPassThroughTestsFactory(SelectMenuOption);
});
