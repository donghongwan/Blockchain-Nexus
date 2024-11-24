describe("Frontend Tests", function () {
    it("should load the homepage", function () {
        cy.visit("/");
        cy.contains("Quantum Nexus DAO").should("be.visible");
    });

    it("should navigate to the proposals page", function () {
        cy.visit("/");
        cy.get('a[href="#proposals"]').click();
        cy.url().should("include", "#proposals");
        cy.contains("Submit a Proposal").should("be.visible");
    });

    it("should submit a proposal", function () {
        cy.visit("#proposals");
        cy.get("textarea").type("New Proposal");
        cy.get("input[type='file']").attachFile("example.txt");
        cy.get("button[type='submit']").click();
        cy.contains("Proposal submitted successfully!").should("be.visible");
    });
});
