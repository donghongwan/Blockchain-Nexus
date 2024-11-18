import os
from decentralized_identity import DecentralizedIdentity

def setup_identity(identity_path):
    identity = DecentralizedIdentity(identity_path)
    identity.create_identity()
    print("Decentralized identity set up successfully.")

if __name__ == "__main__":
    setup_identity("path/to/identity")
