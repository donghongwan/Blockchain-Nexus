# generate_keys.py

import os
from eth_keys import keys
from eth_utils import to_checksum_address
from utils.logger import Logger

log = Logger()

def generate_keypair():
    private_key = keys.PrivateKey(os.urandom(32))
    public_key = private_key.public_key
    log.info(f"Generated Key Pair:\nPrivate Key: {private_key}\nPublic Key: {public_key}")
    return private_key, public_key

if __name__ == "__main__":
    private_key, public_key = generate_keypair()
    print(f"Private Key: {private_key}\nPublic Key: {to_checksum_address(public_key)}")
