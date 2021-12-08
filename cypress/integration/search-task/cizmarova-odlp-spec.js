describe("ODLP content check - desktop", () => {

    before(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("should check itinerary section", () => {
        cy.log("Return should be clickable")
        cy.get("[data-test=ResultsTabReturn]").click({ force: true })
        cy.log("All should be clickable")
        cy.get("[data-test=ResultsTabAll]").click({ force: true })
        cy.log("One way should be clickable")
        cy.get("[data-test=ResultsTabOneway]").click({ force: true })
    })

    it("should check Search menu", () => {
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
        cy.get("[class*=ExploreMap]").should("be.visible") //should be data but it's not on the page
        cy.contains("Explore the map")
        cy.get("[class*=ExploreMap] a:eq(0)").click()
    })

    it("should check footer section length", () => {
        cy.log('Check Company "Footer" section')
        cy.get("[data-test=FooterLinksColumn] a")
            .its("length")
            .should("be.at.least", 5)
    })
})


git push https://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@github.com/karolinacizmarova/snowyFoxx/workshopTaskDecember.git
