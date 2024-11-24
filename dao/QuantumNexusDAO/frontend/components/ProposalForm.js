export function ProposalForm() {
    const form = document.createElement('div');
    form.className = 'component';
    form.innerHTML = `
        <h2>Submit a Proposal</h2>
        <form id="proposalForm">
            <textarea placeholder="Enter your proposal..." required></textarea>
            <input type="file" id="fileUpload" />
            <button type="submit">Submit</button>
        </form>
    `;

    form.querySelector('#proposalForm').onsubmit = (e) => {
        e.preventDefault();
        // Handle proposal submission logic here
        alert(' Proposal submitted successfully!');
    };

    return form;
}
