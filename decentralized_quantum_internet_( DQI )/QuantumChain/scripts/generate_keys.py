import os
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from src.utils.logger import Logger

logger = Logger()

def generate_keys():
    # Generate a private key
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )

    # Generate the public key
    public_key = private_key.public_key()

    # Serialize the private key
    pem_private = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL
    )

    # Serialize the public key
    pem_public = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    # Save the keys to files
    with open('private_key.pem', 'wb') as f:
        f.write(pem_private)
    with open('public_key.pem', 'wb') as f:
        f.write(pem_public)

    logger.info("Keys generated and saved to 'private_key.pem' and 'public_key.pem'.")

def main():
    generate_keys()

if __name__ == "__main__":
    main()
