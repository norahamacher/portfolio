describe('Portfolio App', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            '/portfolio/data.json',
            { fixture: 'fakeProjects.json' }
        ).as('getProjects');

        cy.visit('/');


    });

    it("shows Nora's Projects heading", () => {
        cy.contains("Nora's Projects").should('be.visible');
    });

    it('shows project cards from data.json', () => {
        cy.get('#card-container [data-cy="card"]').should('have.length.at.least', 1);
        cy.get('#card-container [data-cy="card"]').first().within(() => {
            cy.get('h3').should('exist');
        });
    });

    it('shows Filters button and can open filter menu', () => {
        cy.get('[data-cy="filters-menu"').should('not.exist');
        cy.contains(/Filters \(\d+ projects?\)/).should('be.visible').click();
        cy.get('[data-cy="filters-menu"').should('exist');
    });

    it("shows filter options and can apply a filter", () => {
        cy.contains(/Filters \(\d+ projects?\)/).click();
        cy.get('[data-cy="filters-menu"]').should('be.visible');
        cy.get('[data-cy="filters-anchor"] [data-cy="tag"]').should('not.exist');
        //click a filterButton
        cy.get('[data-cy="filter-button"]').first().contains("Workplace1").should('be.visible');
        cy.get('[data-cy="filter-button"]').first().click();
        cy.get('[data-cy="filters-anchor"] [data-cy="tag"]').should('exist');
        cy.get('[data-cy="filters-anchor"] [data-cy="tag"]').contains("Workplace1").should("be.visible");
    });

    it('shows project cards filtered by Workplace1', () => {
        cy.contains(/Filters \(\d+ projects?\)/).click();
        cy.get('[data-cy="filter-button"]').first().contains("Workplace1").click();
        cy.get('#card-container [data-cy="card"]').should('have.length.at.least', 1);
        cy.get('#card-container [data-cy="card"]').first().within(() => {
            cy.get('h3').should('exist');
            cy.get('[data-cy="tag"]').should('contain', 'Workplace1');
        });
    });

});