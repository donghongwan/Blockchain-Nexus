import os
from carbon_credit_contract import CarbonCreditContract

def mint_carbon_credits(contract_address, amount):
    contract = CarbonCreditContract(contract_address)
    tx_hash = contract.mint(amount)
    print(f"Carbon credits minted successfully. Transaction hash: {tx_hash}")

if __name__ == "__main__":
    mint_carbon_credits("0x1234567890abcdef1234567890abcdef12345678", 100)
