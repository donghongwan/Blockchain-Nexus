export function NFTGallery() {
    const gallery = document.createElement('div');
    gallery.className = 'component';
    gallery.innerHTML = `
        <h2>NFT Gallery</h2>
        <p>Explore, trade, and auction NFTs.</p>
        <div id="nftItems"></div>
    `;

    // Fetch and display NFTs logic here

    return gallery;
}
