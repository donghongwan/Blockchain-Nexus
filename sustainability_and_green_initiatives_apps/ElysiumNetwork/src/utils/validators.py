import re

class Validators:
    @staticmethod
    def is_valid_email(email):
        """Validate the email format."""
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(email_regex, email) is not None

    @staticmethod
    def is_positive_integer(value):
        """Check if the value is a positive integer."""
        return isinstance(value, int) and value > 0

    @staticmethod
    def is_valid_address(address):
        """Validate a blockchain address format (example regex)."""
        address_regex = r'^[0-9a-fA-F]{40}$'  # Example for Ethereum addresses
        return re.match(address_regex, address) is not None

# Example usage
if __name__ == "__main__":
    email = "test@example.com"
    print(f"Is valid email: {Validators.is_valid_email(email)}")
    print(f"Is positive integer: {Validators.is_positive_integer(5)}")
    print(f"Is valid address: {Validators.is_valid_address('0x1234567890abcdef1234567890abcdef12345678')}")
