# identity_setup.py

import json
from utils.logger import Logger
from decentralized_identity import DecentralizedIdentity

log = Logger()
identity_manager = DecentralizedIdentity()

def setup_identity(user_id):
    identity = identity_manager.create_identity(user_id)
    log.info(f"Identity created for user: {user_id}")
    return identity

if __name__ == "__main__":
    user_id = input("Enter user ID for identity setup: ")
    identity = setup_identity(user_id)
    print(json.dumps(identity, indent=4))
