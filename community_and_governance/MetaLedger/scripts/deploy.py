# deploy.py

import json
import sys
from web3 import Web3
from solcx import compile_source
from utils.logger import Logger
from utils.config import Config

log = Logger()
config = Config()

def deploy_contract(contract_source, contract_name):
    log.info("Compiling contract...")
    compiled_sol = compile_source(contract_source)
    contract_interface = compiled_sol[contract_name + ':{}'.format(contract_name)]

    w3 = Web3(Web3.HTTPProvider(config.get('web3_provider')))
    w3.eth.defaultAccount = w3.eth.accounts[0]

    log.info("Deploying contract...")
    contract = w3.eth.contract(
        abi=contract_interface['abi'],
        bytecode=contract_interface['bin']
    )

    tx_hash = contract.constructor().transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

    log.info(f"Contract deployed at address: {tx_receipt.contractAddress}")
    return tx_receipt.contractAddress

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python deploy.py <contract_source_file> <contract_name>")
        sys.exit(1)

    contract_source_file = sys.argv[1]
    contract_name = sys.argv[2]

    with open(contract_source_file, 'r') as file:
        contract_source = file.read()

    deploy_contract(contract_source, contract_name)
