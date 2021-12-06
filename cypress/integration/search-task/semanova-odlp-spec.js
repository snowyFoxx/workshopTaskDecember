describe("ODLP content check - desktop", () => {

    before(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("should check One-way, Return and All buttons", () => {
        cy.log('Feliz Navidad .. prospero ano y felicidad :)')
        cy.get("[data-test=ResultsTabOneway]").click()
        cy.get("[data-test=Results-oneWay]").should('be.visible')

        cy.log('tab "Return" should be clickable')
        cy.get("[data-test=ResultsTabReturn]").click()
        cy.get("[data-test=Results-return]").should('be.visible')

        cy.log('tab "All" should be clickable')
        cy.get("[data-test=ResultsTabAll]").click()
        cy.get("[data-test=Results-oneWay]").should('be.visible')
        cy.get("[data-test=Results-return]").should('be.visible')

    })

    it("should check if search filters are visible", () => {

        cy.log("Search by stops")
        cy.get("[data-test=FilterByStops]")
            .should("contain", 'Search by stops')
            .should('be.visible')
            .within(() => {
                cy.get('ul').children().should('have.length', 3)
            })

        cy.log("Search by carrier")
        cy.get("[data-test=FilterByCarrier]")
            .should("contain", 'Search by carrier')
            .should('be.visible')
            .within(() => {
                cy.get('ul').children().should('have.length', 8)
            })

        cy.log("Search by price")
        cy.get("[data-test=FilterByPrice]")
            .should('contain', 'Search by price')
            .should('be.visible')
            .within(() => {
                cy.get('ul').children().should("have.length", 3)
            })

        cy.log("Search by departure date")
        cy.get("[data-test=FilterByDate]")
            .should('contain', 'Search by departure date')
            .should('be.visible')
            .within(() => {
                cy.get('ul').children().should('have.length', 4)
            })
    })

    it("should check Map section", () => {
        cy.log("Map on the right should be visible")
        cy.get("img").should("be.visible")

        cy.log('Button "Explore the map" should be visible')
        cy.get('a[href*="search/map"]').should('be.visible')
    })

    it("should have footer section", () => {
        cy.log('Check Company "Footer" section')
        cy.get("[data-test=FooterLinksColumn] a")
            .its("length")
            .should("be.at.least", 5)
    })
})
