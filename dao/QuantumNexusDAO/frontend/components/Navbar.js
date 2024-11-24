export function Navbar() {
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <a href="#home">Home</a>
        <a href="#proposals">Proposals</a>
        <a href="#voting">Voting</a>
        <a href="#nft">NFT Gallery</a>
        <a href="#reputation">Reputation</a>
        <a href="#forum">Community Forum</a>
        <a href="#analytics">Analytics</a>
        <a href="#chat">Chat</a>
        <a href="#profile">Profile</a>
    `;
    return nav;
}
