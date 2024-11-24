export function AIChatbot() {
    const chatbot = document.createElement('div');
    chatbot.className = 'component';
    chatbot.innerHTML = `
        <h2>AI Chatbot</h2>
        <p>Ask questions and get support from our AI assistant.</p>
        <div id="chatWindow"></div>
    `;

    // Implement chatbot logic here

    return chatbot;
}
