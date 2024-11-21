import json
import asyncio
from web3 import Web3
from web3.exceptions import TransactionNotFound, ContractLogicError

class BlockchainConnector:
    def __init__(self, provider_url, contract_address, abi):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))
        self.contract = self.web3.eth.contract(address=contract_address, abi=abi)
        self.account = self.web3.eth.account

    def is_connected(self):
        return self.web3.isConnected()

    async def send_transaction(self, function_name, *args):
        if not self.is_connected():
            raise ConnectionError("Unable to connect to the blockchain network.")

        # Get the account from environment variables or a secure vault
        private_key = "YOUR_PRIVATE_KEY"  # Replace with secure retrieval
        account = self.account.from_key(private_key)
        nonce = self.web3.eth.getTransactionCount(account.address)

        # Build the transaction
        transaction = self.contract.functions[function_name](*args).buildTransaction({
            'chainId': 1,  # Mainnet
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei'),
            'nonce': nonce,
        })

        # Sign the transaction
        signed_txn = self.web3.eth.account.sign_transaction(transaction, private_key)

        # Send the transaction
        tx_hash = self.web3.eth.sendRawTransaction(signed_txn.rawTransaction)

        return self.web3.toHex(tx_hash)

    async def get_transaction_receipt(self, tx_hash):
        try:
            receipt = await asyncio.get_event_loop().run_in_executor(None, self.web3.eth.getTransactionReceipt, tx_hash)
            if receipt is None:
                raise TransactionNotFound(f"Transaction {tx_hash} not found.")
            return receipt
        except Exception as e:
            raise Exception(f"Error retrieving transaction receipt: {str(e)}")

    async def call_contract_function(self, function_name, *args):
        try:
            result = await asyncio.get_event_loop().run_in_executor(None, self.contract.functions[function_name].call, *args)
            return result
        except ContractLogicError as e:
            raise Exception(f"Contract logic error: {str(e)}")
        except Exception as e:
            raise Exception(f"Error calling contract function: {str(e)}")

# Example usage
if __name__ == "__main__":
    provider_url = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
    contract_address = "0xYourContractAddress"
    abi = json.loads('[{"constant":true,"inputs":[],"name":"yourFunction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]')

    connector = BlockchainConnector(provider_url, contract_address, abi)

    async def main():
        tx_hash = await connector.send_transaction('yourFunction', arg1, arg2)
        print(f"Transaction sent: {tx_hash}")
        receipt = await connector.get_transaction_receipt(tx_hash)
        print(f"Transaction receipt: {receipt}")

    asyncio.run(main())
