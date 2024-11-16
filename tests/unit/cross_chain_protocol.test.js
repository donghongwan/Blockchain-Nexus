const CrossChainProtocol = require('../../src/interoperability/cross_chain_protocol');

describe('CrossChainProtocol', () => {
    let protocol;

    beforeEach(() => {
        protocol = new CrossChainProtocol();
    });

    test('should register a chain', () => {
        const mockChain = { id: 'chain1' };
        protocol.registerChain('chain1', mockChain);
        expect(protocol.chains.get('chain1')).toBe(mockChain);
    });

    test('should throw error when sending transaction to unregistered chain', async () => {
        await expect(protocol.sendTransaction('chain1', 'chain2', {})).rejects.toThrow("Chain not registered");
    });
});
