# helpers.py

import hashlib
import json

def hash_data(data):
    """Generate a SHA-256 hash of the given data."""
    if isinstance(data, dict):
        data = json.dumps(data, sort_keys=True).encode()
    elif isinstance(data, str):
        data = data.encode()
    return hashlib.sha256(data).hexdigest()

def validate_address(address):
    """Basic validation for a blockchain address."""
    if len(address) != 42 or not address.startswith('0x'):
        return False
    return True

def format_timestamp(timestamp):
    """Format a timestamp into a human-readable string."""
    return timestamp.strftime('%Y-%m-%d %H:%M:%S')

# Example usage
if __name__ == "__main__":
    sample_data = {"key": "value"}
    print("Hash of sample data:", hash_data(sample_data))
    print("Is valid address:", validate_address("0x1234567890abcdef1234567890abcdef12345678"))
