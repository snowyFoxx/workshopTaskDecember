// What type of tests are these? Smoke? Integration? When are they ran?
// Based on what are they written? Test cases?
// Why are tests divided in this way? Depending on the test cases and test suite I'd combine at least some of the tests to one.
describe("ODLP content check - desktop", () => {

    beforeEach(() => {
        cy.log("Accept cookies")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("/en/cheap-flights/london-united-kingdom/malaga-spain/")
    })

    it("Results page ResultsTabReturn buttons", () => {
        cy.log("Return button is clickable")
        cy.get("[data-test=ResultsTabReturn]").click({ force: true }).should('have.css', 'color', 'rgb(37, 42, 49)')
        cy.log("All button is clickable")
        cy.get("[data-test=ResultsTabAll]").click({ force: true }).should('have.css', 'color', 'rgb(37, 42, 49)')
        cy.log("One-way button is clickable")
        cy.get("[data-test=ResultsTabOneway]").click({ force: true }).should('have.css', 'color', 'rgb(37, 42, 49)')
    })

    it("Results page filter", () => {
        cy.log("Search by stops has 0, 1 or 2 stops correct filter links")
        cy.get("[data-test=FilterByStops]").within(() =>{
            cy.contains('Nonstop')
                .invoke('attr', 'href')
                .should('contain', 'stopNumber=0')
            cy.contains('Up to 1 stop')
                .invoke('attr', 'href')
                .should('contain', 'stopNumber=1')
            cy.contains('Up to 2 stops')
                .invoke('attr', 'href')
                .should('contain', 'stopNumber=2')
        })
        cy.log("Search by carrier has at least 1 carrier link")
        // I'm assuming that the options here can change and are dependant on results from some service. Depending on the test case, I would mock them if needed.
        cy.get('[data-test=FilterByCarrier] [data-test=FiltersLink]')
            .its('length')
            .should('be.at.least', 1)
        cy.log("Search by price has at least 1 option")
        // Assuming that number of options and amounts is unknown
        cy.get("[data-test=FilterByPrice] [data-test=FiltersLink]")
            .its('length')
            .should('be.at.least', 1)
        cy.log("Search by departure date has 4 filter links")
        cy.get("[data-test=FilterByDate]").within(() =>{
            cy.contains('Depart this week').should('have.attr', 'href')
            cy.contains('Depart next week').should('have.attr', 'href')
            cy.contains('Depart this month').should('have.attr', 'href')
            cy.contains('Depart in').should('have.attr', 'href')
        })
    })

    it("Result page maps", () => {
        // Ask devs to add data-test attributes
        cy.log("Map on the right and button is visible")
        cy.get("[class*=ExploreMap]").should("be.visible")
        cy.log('Explore the map button has correct link')
        cy.contains("Explore the map")
            .invoke('attr', 'href')
            .should('contain', '/en/search/map/london-united-kingdom/malaga-spain')
        //what? cy.get("[data-test=HeaderLinks] a:eq(0)").click()
    })

    it("Company Footer section", () => {
        cy.log('Company "Footer" section has at least 5 links')
        // Not clear what is the benefit of checking number of links on a data test attribute (that might be added to other links) instead of checking the content and links themselves
        cy.get("[data-test=FooterLinksColumn] a")
            .its("length")
            .should("be.at.least", 5)
    })
})
