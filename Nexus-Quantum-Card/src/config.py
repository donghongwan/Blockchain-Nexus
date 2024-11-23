import os

class Config:
    """Configuration settings for Nexus-Quantum-Card."""
    # Quantum communication settings
    QUANTUM_SERVER_URL = os.getenv("QUANTUM_SERVER_URL", "https://quantum.example.com")
    QUANTUM_PORT = int(os.getenv("QUANTUM_PORT", 443))

    # Security settings
    ENCRYPTION_ALGORITHM = os.getenv("ENCRYPTION_ALGORITHM", "AES")
    KEY_SIZE = int(os.getenv("KEY_SIZE", 256))  # Key size for encryption
    HASH_ALGORITHM = os.getenv("HASH_ALGORITHM", "SHA256")

    # Logging settings
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE = os.getenv("LOG_FILE", "nexus_quantum_card.log")

    # Other settings
    TIMEOUT = int(os.getenv("TIMEOUT", 30))  # Timeout for requests
