import { Navbar } from './components/Navbar.js';
import { ProposalForm } from './components/ProposalForm.js';
import { VotingDashboard } from './components/VotingDashboard.js';
import { NFTGallery } from './components/NFTGallery.js';
import { ReputationDashboard } from './components/ReputationDashboard.js';
import { CommunityForum } from './components/CommunityForum.js';
import { AnalyticsDashboard } from './components/AnalyticsDashboard.js';
import { AIChatbot } from './components/AIChatbot.js';
import { UserProfile } from './components/UserProfile.js';

const app = document.getElementById('app');

function renderComponent(component) {
    app.innerHTML = ''; // Clear previous content
    app.appendChild(component);
}

// Initial render
renderComponent(Navbar());

// Example of routing logic
window.onhashchange = () => {
    const hash = window.location.hash.substring(1);
    switch (hash) {
        case 'proposals':
            renderComponent(ProposalForm());
            break;
        case 'voting':
            renderComponent(VotingDashboard());
            break;
        case 'nft':
            renderComponent(NFTGallery());
            break;
        case 'reputation':
            renderComponent(ReputationDashboard());
            break;
        case 'forum':
            renderComponent(CommunityForum());
            break;
        case 'analytics':
            renderComponent(AnalyticsDashboard());
            break;
        case 'chat':
            renderComponent(AIChatbot());
            break;
        case 'profile':
            renderComponent(UserProfile());
            break;
        default:
            renderComponent(Navbar());
            break;
    }
};

// Handle initial load
window.onload = () => {
    if (!window.location.hash) {
        window.location.hash = '#home';
    }
};
