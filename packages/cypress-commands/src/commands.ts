declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Types a value into a ui5-webcomponent that offers a typeable input field.
       *
       * @param {string} text Text that will be typed into the input.
       * @example cy.get('[ui5-input]').typeIntoUi5Input('Hello World');
       */
      typeIntoUi5Input(text: string, options?: Partial<TypeOptions>): Chainable<Element>;
      /**
       * Clears a value from ui5-webcomponent that offers a typeable input field.
       *
       * @example cy.get('[ui5-input]').clearUi5Input();
       */
      clearUi5Input(options?: Partial<ClearOptions>): Chainable<Element>;
      /**
       * Types a value with a delay into an ui5-webcomponent that offers a typeable input field.
       *
       * __Note:__ Use this command if you render a component that should show suggestions while typing (e.g. `ComboBox`) but the corresponding popover does not open.
       * This command waits for the appropriate delay (in ms), giving the web component time to define all necessary customElements and boot web components.
       * The delay time can vary from environment to environment.
       *
       * @param {string} text Text that will be typed into the input.
       * @param {number} [delay=500] Delay in ms to wait for the web-component to be ready. Default: 500
       * @example cy.get('[ui5-combobox]').typeIntoUi5InputWithDelay('Hello World', 1000);
       */
      typeIntoUi5InputWithDelay(text: string, delay?: number, options?: Partial<TypeOptions>): Chainable<Element>;

      /**
       * Types a value into `ui5-textarea`.
       * @param {string} text Text that will be typed into the text-area.
       * @example cy.get('[ui5-textarea]').typeIntoUi5TextArea('Hello World');
       */
      typeIntoUi5TextArea(text: string, options?: Partial<TypeOptions>): Chainable<Element>;

      /**
       * Toggles the state of a `ui5-checkbox`.
       * @example cy.get('[ui5-checkbox]').toggleUi5Checkbox();
       */
      toggleUi5Checkbox(): Chainable<Element>;

      /**
       * Toggles the state of a `ui5-switch`
       * @example cy.get('[ui5-switch]').toggleUi5Switch();
       */
      toggleUi5Switch(): Chainable<Element>;

      /**
       * Click on a `ui5-radio-button`
       * @example cy.get('[ui5-radio-button]').clickUi5RadioButton();
       */
      clickUi5RadioButton(): Chainable<Element>;

      /**
       * Close ui5-webcomponents popups like `ui5-dialog` or `ui5-popover` by pressing the "Escape" key.
       * @example cy.closeUi5PopupWithEsc()
       */
      closeUi5PopupWithEsc(): Chainable<Element>;

      /**
       * Click on a list item of the `List` component by text.
       * @param {string} text The text of the list item that should be clicked.
       * @example cy.clickUi5ListItemByText("List Item")
       */
      clickUi5ListItemByText(text: string): Chainable<Element>;

      /**
       * Click on an `ui5-option` of the `ui5-select` component by text.
       * @param text text of the ui5-option that should be clicked
       * @example cy.get('[ui5-select]').clickUi5SelectOptionByText('Option2');
       *
       * __Note:__ The select popover must be visible, otherwise the `change` event is not fired.
       */
      clickUi5SelectOptionByText(text: string, options?: Partial<ClickOptions>): Chainable<Element>;

      /**
       * Click on chained `ui5-option`.
       * @example cy.get('[ui5-option]').clickUi5SelectOption();
       *
       * __Note:__ The select popover must be visible, otherwise the `change` event is not fired.
       */
      clickUi5SelectOption(options?: Partial<ClickOptions>): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('typeIntoUi5Input', { prevSubject: 'element' }, (subject, text, options = {}) => {
  cy.wrap(subject)
    .findShadowInput()
    .type(text, { force: true, ...options });
});

Cypress.Commands.add('clearUi5Input', { prevSubject: 'element' }, (subject, text, options = {}) => {
  cy.wrap(subject)
    .findShadowInput()
    .clear({ force: true, ...options });
});

Cypress.Commands.add(
  'typeIntoUi5InputWithDelay',
  { prevSubject: 'element' },
  (subject, text, delay = 500, options = {}) => {
    cy.wrap(subject)
      .findShadowInput()
      .wait(delay)
      .type(text, { force: true, ...options });
  }
);

Cypress.Commands.add('typeIntoUi5TextArea', { prevSubject: 'element' }, (subject, text, options = {}) => {
  cy.wrap(subject)
    .shadow()
    .find('textarea')
    .type(text, { force: true, ...options });
});

Cypress.Commands.add('toggleUi5Checkbox', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).findShadowInput().click({ force: true });
});

Cypress.Commands.add('toggleUi5Switch', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).findShadowInput().click({ force: true });
});

Cypress.Commands.add('clickUi5RadioButton', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).findShadowInput().click({ force: true });
});

Cypress.Commands.add('closeUi5PopupWithEsc', () => {
  cy.get('body').type('{esc}', { force: true });
});

Cypress.Commands.add('clickUi5ListItemByText', (text) => {
  cy.contains(text).find('li').click({ force: true });
});

Cypress.Commands.add('clickUi5SelectOptionByText', { prevSubject: 'element' }, (subject, text, options = {}) => {
  cy.wrap(subject).then(async ($select) => {
    // @ts-expect-error: cannot set $select to use SelectDomRef
    const domRef = await $select.get(0).getStaticAreaItemDomRef();
    cy.wrap(domRef).contains(text).click(options);
  });
});

Cypress.Commands.add('clickUi5SelectOption', { prevSubject: 'element' }, (subject, options = {}) => {
  cy.wrap(subject).then(($option) => {
    // @ts-expect-error: cannot set $option to use OptionDomRef
    const domRef = $option.get(0).getDomRef();
    cy.wrap(domRef).click(options);
  });
});

export {};
