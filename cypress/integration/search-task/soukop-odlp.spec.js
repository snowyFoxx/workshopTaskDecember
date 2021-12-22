describe("ODLP content check - desktop", () => {

    before(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("should check if modes are switching", () => {
        cy.log("Return should be clickable")
        cy.get("[data-test=ResultsTabReturn]").click({ force: true })
        cy.get("[data-test=Results-return]").should('be.visible')

        cy.log("All modes should be clickable")
        cy.get("[data-test=ResultsTabAll]").click({ force: true })
        cy.get("[data-test=Results-return]").should('be.visible')
        cy.get("[data-test=Results-oneWay]").should('be.visible')

        cy.log("Oneway should be clickable")
        cy.get("[data-test=ResultsTabOneway]").click({ force: true })
        cy.get("[data-test=Results-oneWay]").should('be.visible')
    })

    it("should check search filters", () => {
        cy.log("Search by stops")
        cy.get("[data-test=FilterByStops]").should("exist")

        cy.log("Search by carrier")
        cy.get("[data-test=FilterByCarrier]").should("exist")

        cy.log("Search by price")
        cy.get("[data-test=FilterByPrice]").should("exist")

        cy.log("Search by departure date")
        cy.get("[data-test=FilterByDate]").should("exist")
    })

    it("should check Map section", () => {
        cy.log("Map on the right and button should be visible")
        cy.get("img").should("be.visible")

        cy.contains("Explore the map")
        cy.get("[data-test=HeaderLinks] a:eq(0)").click()  // this ain't looking right
    })

    it("should have footer section", () => {
        cy.log('Check Company "Footer" section')
        cy.get("[data-test=FooterLinksColumn] a")
            .its("length")
            .should("be.at.least", 5)
    })
})
