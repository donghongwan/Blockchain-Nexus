import json
import sys
from web3 import Web3
from src.utils.config import Config
from src.utils.logger import Logger

logger = Logger()

def load_contract_abi(abi_file):
    with open(abi_file, 'r') as file:
        return json.load(file)

def deploy_contract(w3, contract_abi, contract_bytecode, deployer_address, private_key):
    # Create the contract instance
    contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

    # Build the transaction
    transaction = contract.constructor().buildTransaction({
        'from': deployer_address,
        'nonce': w3.eth.getTransactionCount(deployer_address),
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei'),
    })

    # Sign the transaction
    signed_txn = w3.eth.account.signTransaction(transaction, private_key)

    # Send the transaction
    tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    logger.info(f"Transaction sent: {tx_hash.hex()}")

    # Wait for the transaction to be mined
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    logger.info(f"Contract deployed at address: {tx_receipt.contractAddress}")

def main():
    config = Config()
    w3 = Web3(Web3.HTTPProvider(config.get('node_url')))
    
    if not w3.isConnected():
        logger.critical("Failed to connect to the blockchain node.")
        sys.exit(1)

    deployer_address = config.get('deployer_address')
    private_key = config.get('private_key')
    contract_abi = load_contract_abi('path/to/your/contract_abi.json')
    contract_bytecode = '0x...'  # Replace with your contract bytecode

    deploy_contract(w3, contract_abi, contract_bytecode, deployer_address, private_key)

if __name__ == "__main__":
    main()
