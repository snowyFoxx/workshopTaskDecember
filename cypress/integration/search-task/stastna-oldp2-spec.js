describe("ODLP content check - desktop", () => {

    before(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("should check switching between different ticket types", () => {
        cy.log("'Return' type can be selected")
        cy.get("[data-test=ResultsTabReturn]").click()
        cy.get("[data-test=Results-return]").should("be.visible")
        cy.get("[data-test=ShowMoreButton]").should("have.text", "Show more return flights")
            .and("have.attr", "href", "/en/search/results/london-united-kingdom/malaga-spain/anytime?transport=aircraft%2Ctrain%2Cbus")
        //A question here - Now I am not sure if we should avoid checking links or not. I recall Barca speaking about it but can't remember if she said we should AVOID is or we should
        //check the urls rather than the actual buttons...

        cy.log("'One way' type can be selected'")
        cy.get("[data-test=ResultsTabOneway]").click()
        cy.get("[data-test=Results-oneWay]").should("be.visible")
        cy.get("[data-test=ShowMoreButton]").should("have.text", "Show more one-way flights")
            .and("have.attr", "href", "/en/search/results/london-united-kingdom/malaga-spain/anytime/no-return?transport=aircraft%2Ctrain%2Cbus")

        cy.log(" 'All' type can be selected")
        cy.get("[data-test=ResultsTabAll]").click()
        cy.get("[data-test=Results-oneWay]").should("be.visible")
        cy.get("[data-test=Results-return]").should("be.visible")
        cy.get("[data-test=ShowMoreButton]").should("have.length", 2)
            .and("have.attr", "href","/en/search/results/london-united-kingdom/malaga-spain/anytime/no-return?transport=aircraft%2Ctrain%2Cbus", "/en/search/results/london-united-kingdom/malaga-spain/anytime?transport=aircraft%2Ctrain%2Cbus" )
    })

    it("should check different filters availability", () => {
        cy.log(" 'Search by stops' is available")
        cy.get("[data-test=FilterByStops]").should("be.visible")

        cy.log(" 'Search by carrier' is available")
        cy.get("[data-test=FilterByCarrier]").should("be.visible")

        cy.log(" 'Search by price' is available")
        cy.get("[data-test=FilterByPrice]").should("be.visible")

        cy.log(" 'Search by departure date' is available")
        cy.get("[data-test=FilterByDate]").should("be.visible")
    })

    it("should check the 'Explore the map' section", () => {
        cy.log("Map and the 'Explore the map' button are visible")
        cy.get("[class*=ExploreMap]").should("be.visible")
        cy.contains("Explore the map")
        cy.get("[data-test=HeaderLinks] a:eq(0)").click({force: true})
        //no idea how to correct this. :( Not good with classes..  Perhaps something with the cy.contains because it is not a validation?
    })

    it("should check the footer information", () => {
        cy.log("Check the 'Company' section in the footer")
        cy.get("[data-test=FooterLinksColumn] a").its("length").should("be.at.least", 5)
        //I haven't changes anything here. What was i supposed to change here?
    })
})