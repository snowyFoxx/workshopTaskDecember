describe("ODLP content check - desktop", () => {

    before(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("Check itinerary types switching", () => {
        cy.get("[data-test=ResultsTabReturn]")
            .contains(/Return/i)
            .click()
        cy.get("[data-test=ShowMoreButton]").should ("be.visible")
            .and("contain", "Show more return flights")

        cy.get("[data-test=ShowMoreButton]").should ("be.visible")
        cy.get("[data-test=ResultsTabAll]")
            .contains(/All/i)
            .click()
        cy.get("[data-test=ShowMoreButton]").should ("be.visible")
        cy.get("[data-test=ShowMoreButton]:eq(0)").should ("be.visible")
            .and("contain", "Show more one-way flights")
        cy.get("[data-test=ShowMoreButton]:eq(1)").should ("be.visible")
            .and("contain", "Show more return flights")

        cy.get("[data-test=ResultsTabOneway]")
            .contains(/One-way/i)
            .click()
        cy.get("[data-test=ShowMoreButton]").should ("be.visible")
            .and("contain", "Show more one-way flights")
    })

    it("Check filter headings", () => {
        cy.get("[data-test=FiltersDesktop]")
        cy.get("[data-test=FilterByStops]").should("exist")
            .contains(/Search by stops/i)
        cy.get("[data-test=FilterByCarrier]").should("exist")
            .contains(/Search by carrier/i)
        cy.get("[data-test=FilterByPrice]").should("exist")
            .contains(/Search by price/i)
        cy.get("[data-test=FilterByDate]").should("exist")
            .contains(/Search by departure date/i)
    })

    it("Check Map on the right and button", () => {
        cy.get("[class*=ExploreMap] [class*=ImagePlaceholderstyled]:eq(0)").should("be.visible")
        cy.get("[class*=ExploreMap] [class*=ButtonPrimitiveContentChildren]").should("contain","Explore the map")
        cy.get('[class*=ExploreMapstyled]:eq(0) a')
            .should('have.attr', 'href')
            .and('include', '/en/search/map/london-united-kingdom/malaga-spain?internaltracking=1');
    })

    it("Check Company footer section", () => {
        cy.get("[data-test=FooterLinksColumn] a")
            .its("length")
            .should("equal", 6)
        cy.get("[data-test=FooterLinksColumn] div").then($div => {
            const message = $div.text();
            expect($div, message).to.contain("CompanyTerms & ConditionsTerms of UseKiwi.com GuaranteePrivacy PolicyMedia RoomSecurity")
        })
    })
})
