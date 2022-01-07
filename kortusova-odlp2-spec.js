describe("ODLP content check - desktop", () => {

    before(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("Check itinerary types switching", () => {
        cy.log("Switch to return flights")
        cy.get("[data-test=ResultsTabReturn]").click({force:true})

        cy.log("Check visibility of 'return flights' button")
        cy.get("[data-test=Results-return] [data-test=ShowMoreButton]").should ("be.visible")

        cy.log("Switch to all flights")
        cy.get("[data-test=ResultsTabAll]").click({force:true})

        cy.log("Check visibility of 'one-way' and 'return flights' buttons")
        cy.get("[data-test=Results-oneWay] [data-test=ShowMoreButton]").should ("be.visible")
        cy.get("[data-test=Results-return] [data-test=ShowMoreButton]").should ("be.visible")

        cy.log("Switch to one-way flights")
        cy.get("[data-test=ResultsTabOneway]").click({force:true})

        cy.log("Check visibility of 'one-way' button")
        cy.get("[data-test=Results-oneWay] [data-test=ShowMoreButton]").should ("be.visible")
    })

    it("Check filter headings and content of links", () => {
        cy.log("Visibility of 'Search by stops'")
        cy.get("[data-test=FilterByStops]").should("be.visible")

        cy.log("Visibility of 'Search by carrier'")
        cy.get("[data-test=FilterByCarrier]").should("be.visible")

        cy.log("Visibility of 'Search by price'")
        cy.get("[data-test=FilterByPrice]").should("be.visible")

        cy.log("Visibility of 'Search by departure date'")
        cy.get("[data-test=FilterByDate]").should("be.visible")

        cy.log("Filters links contain 'search/results/'")
        cy.get("[data-test=FiltersLink]").each(link => {
            expect(link.attr("href")).to.contain("/search/results/")
        })
    })

    it("Check map on the right and button underneath", () => {
        cy.log("Map should be visible")
        cy.get("[class*=ExploreMap] img").scrollIntoView().should("be.visible")

        cy.log("Button 'Explore the map' should be visible and contain link")
        cy.get("[class*=ExploreMap] a").should("be.visible")
            .and("have.attr", "href")
            .and("include", "/en/search/map/");
    })

    it("Check that titles in Company footer section contain correct links", () => {
        cy.get("[data-test=FooterLinksColumn] a").within((el) => {
            cy.contains("Terms & Conditions").should('have.attr', 'href', "/en/pages/content/legal")
            cy.contains("Terms of Use").should('have.attr', 'href', "/en/pages/content/terms")
            cy.contains("Kiwi.com Guarantee").should('have.attr', 'href', "/en/pages/guarantee")
            cy.contains("Privacy Policy").should('have.attr', 'href', "/en/pages/content/privacy")
            cy.contains("Media Room").should('have.attr', 'href', "https://media.kiwi.com")
            cy.contains("Security").should('have.attr', 'href', "/en/pages/security")
        })
    })
})
