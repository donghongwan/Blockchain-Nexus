const Bridge = require('../../src/interoperability/bridge');

describe('Bridge', () => {
    let bridge;

    beforeEach(() => {
        bridge = new Bridge();
    });

    test('should transfer assets between registered chains', async () => {
        const mockChainA = {
            signTransaction: jest.fn().mockResolvedValue({ asset: 'ETH', amount: 1 }),
        };
        const mockChainB = {
            receiveTransaction: jest.fn().mockResolvedValue('Transaction successful'),
        };

        bridge.registerChain('chainA', mockChainA);
        bridge.registerChain('chainB', mockChainB);

        await bridge.transferAssets('chainA', 'chainB', { asset: 'ETH', amount: 1, from: 'Alice', to: 'Bob' });

        expect(mockChainA.signTransaction).toHaveBeenCalled();
        expect(mockChainB.receiveTransaction).toHaveBeenCalled();
    });
});
