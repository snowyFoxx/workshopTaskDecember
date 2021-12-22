describe("ODLP content check - desktop", () => {

    beforeEach(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("should switch modes in results tab", () => {
        cy.log("Return mode can be selected")
        cy.get("[data-test=ResultsTabReturn]").click({force: true})
        cy.get("[data-test=Results-return] [data-test=ItineraryTile]").should("be.visible")
        cy.get("[data-test=ShowMoreButton]").should("have.text", "Show more return flights")

        cy.log("One-way mode can be selected")
        cy.get("[data-test=ResultsTabOneway]").click({force: true})
        cy.get("[data-test=Results-oneWay] [data-test=ItineraryTile]").should("be.visible")
        cy.get("[data-test=ShowMoreButton]").should("have.text", "Show more one-way flights")

        cy.log("'All' mode can be selected")
        cy.get("[data-test=ResultsTabAll]").click({force: true})
        cy.get("[data-test=Results-return] [data-test=ItineraryTile]").should("be.visible")
        cy.get("[data-test=Results-oneWay] [data-test=ItineraryTile]").should("be.visible")
        cy.get("[data-test=ShowMoreButton]").should("have.length", 2)
    })

    it("should check filters visibility", () => {
        cy.log("Stops filter is visible")
        cy.get("[data-test=FilterByStops]").children().should("have.length", 3)
        cy.get("[data-test=FiltersLink]").contains("Nonstop").should("be.visible")
        cy.get("[data-test=FiltersLink]").contains("Up to 1 stop").should("be.visible")
        cy.get("[data-test=FiltersLink]").contains("Up to 2 stops").should("be.visible")

        cy.log("Carrier filter is visible")
        cy.get("[data-test=FilterByCarrier]").should("be.visible")
        cy.get("[data-test=FilterByCarrier] [data-test=FiltersLink]")
            .its("length")
            .should("be.at.least", 1)

        cy.log("Price filter is visible")
        cy.get("[data-test=FilterByPrice]").should("be.visible")
        cy.get("[data-test=FilterByPrice] [data-test=FiltersLink]")
            .its("length")
            .should("be.at.least", 1)

        cy.log("Search by departure date is visible")
        cy.get("[data-test=FilterByDate] [data-test=FiltersLink]")
            .its("length")
            .should("be.at.least", 3)
        cy.get("[data-test=FilterByDate] [data-test=FiltersLink]:eq(0)")
            .should("be.visible")
            .and("contain", "Depart this week")
        cy.get("[data-test=FilterByDate] [data-test=FiltersLink]:eq(1)")
            .should("be.visible")
            .and("contain", "Depart next week")
        cy.get("[data-test=FilterByDate] [data-test=FiltersLink]:eq(2)")
            .should("be.visible")
            .and("contain", "Depart this month")
    })

    it("should check visibility of map & footer sections", () => {
        cy.log("Map image and map button are visible")
        cy.get("[class*=ExploreMap]").should("be.visible") //tried with .find('img') but it's flaky =(
        cy.contains("Explore the map").should("be.visible")

        cy.log('"Company" section is visible in footer')
        cy.get("[data-test=FooterLinksColumn] a").should('have.length', 6) //static data
        cy.get("[data-test=FooterLinksColumn] a:eq(0)")
            .should("be.visible")
            .and("contain", "Terms & Conditions")
        cy.get("[data-test=FooterLinksColumn] a:eq(5)")
            .should("be.visible")
            .and("contain", "Security")
    })
})

