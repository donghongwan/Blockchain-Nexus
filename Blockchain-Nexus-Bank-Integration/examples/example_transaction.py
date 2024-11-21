# examples/example_transaction.py

from web3 import Web3

# Connect to the Ethereum network (e.g., Infura or local node)
infura_url = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
web3 = Web3(Web3.HTTPProvider(infura_url))

# Check if connected
if not web3.isConnected():
    print("Failed to connect to the Ethereum network.")
    exit(1)

# Define transaction parameters
transaction = {
    'to': '0xRecipientAddress',  # Replace with the recipient's address
    'value': web3.toWei(0.01, 'ether'),  # Amount to send in Wei
    'gas': 2000000,
    'gasPrice': web3.toWei('50', 'gwei'),
    'nonce': web3.eth.getTransactionCount('0xYourAddress'),  # Replace with your address
}

# Sign the transaction
private_key = 'YOUR_PRIVATE_KEY'  # Replace with your private key
signed_txn = web3.eth.account.signTransaction(transaction, private_key)

# Send the transaction
txn_hash = web3.eth.sendRawTransaction(signed_txn.rawTransaction)

# Print the transaction hash
print(f"Transaction sent! Hash: {web3.toHex(txn_hash)}")
