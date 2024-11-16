const Oracle = require('../../src/interoperability/oracle');

describe('Oracle', () => {
    let oracle;

    beforeEach(() => {
        oracle = new Oracle();
    });

    test('should register a price feed', () => {
        const mockPriceFeed = { fetchPrice: jest.fn().mockResolvedValue(100) };
        oracle.registerPriceFeed('ETH', mockPriceFeed);
        expect(oracle.priceFeeds.get('ETH')).toBe(mockPriceFeed);
    });

    test('should fetch price from registered price feed', async () => {
        const mockPriceFeed = { fetchPrice: jest.fn().mockResolvedValue(100) };
        oracle.registerPriceFeed('ETH', mockPriceFeed);
        const price = await oracle.getPrice('ETH');
        expect(price).toBe(100);
    });

    test('should throw error when fetching price from unregistered asset', async () => {
        await expect(oracle.getPrice('BTC')).rejects.toThrow("Price feed not registered");
    });
});
