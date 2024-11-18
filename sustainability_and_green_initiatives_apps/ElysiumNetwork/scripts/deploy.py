import os
from web3 import Web3

def deploy_contract(w3, contract_path, contract_name):
    with open(contract_path, 'r') as f:
        contract_code = f.read()
    contract = w3.eth.contract(abi=contract_code, bytecode=contract_code)
    tx_hash = contract.constructor().transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f"Contract {contract_name} deployed at {tx_receipt.contractAddress}")

if __name__ == "__main__":
    w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/YOUR_PROJECT_ID"))
    deploy_contract(w3, "path/to/contract.sol", "CarbonCreditContract")
