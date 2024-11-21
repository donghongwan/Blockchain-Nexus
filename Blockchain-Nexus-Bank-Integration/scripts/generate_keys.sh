#!/bin/bash

# Set key file names
PRIVATE_KEY_FILE="private_key.pem"
PUBLIC_KEY_FILE="public_key.pem"

# Generate a new private key
echo "Generating a new private key..."
openssl genpkey -algorithm RSA -out $PRIVATE_KEY_FILE -pkeyopt rsa_keygen_bits:2048

# Generate the corresponding public key
echo "Generating the corresponding public key..."
openssl rsa -pubout -in $PRIVATE_KEY_FILE -out $PUBLIC_KEY_FILE

# Check if the keys were generated successfully
if [ -f $PRIVATE_KEY_FILE ] && [ -f $PUBLIC_KEY_FILE ]; then
    echo "Keys generated successfully:"
    echo "Private Key: $PRIVATE_KEY_FILE"
    echo "Public Key: $PUBLIC_KEY_FILE"
else
    echo "Key generation failed."
    exit 1
fi
