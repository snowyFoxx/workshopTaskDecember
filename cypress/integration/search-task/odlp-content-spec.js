describe("ODLP content check - desktop", () => {

    beforeEach(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it('should check "Return", "One-Way", "All" filters', () => {
        cy.log("Return should be clickable")
        cy.get("[data-test=ResultsTabReturn]").click({ force: true })
        cy.log("Return should be clickable")
        cy.get("[data-test=ResultsTabAll]").click({ force: true })
        cy.log("Return should be clickable")
        cy.get("[data-test=ResultsTabOneway]").click({ force: true })
    })

    it("should check visibility of filters on the left", () => {
        cy.log("Search by stops")
        cy.get("[data-test=FiltersDesktop] [data-test=FilterByStops]")
        cy.log("Search by carrier")
        cy.get("[data-test=FiltersDesktop] [data-test=FilterByCarrier]")
        cy.log("Search by price")
        cy.get("[data-test=FiltersDesktop] [data-test=FilterByPrice]")
        cy.log("Search by departure date")
        cy.get("[data-test=FiltersDesktop] [data-test=FilterByDate]")
    })

    it("should check Map section", () => {
        cy.log("Map on the right and button should be visible")
        cy.get("[class*=ExploreMap]").should("be.visible")
        cy.contains("Explore the map")
    })

    it("should have footer section", () => {
        cy.log('Check Company "Footer" section')
        cy.get("[data-test=FooterLinksColumn] a")
            .its("length")
            .should("equal", 6)
    })
})
