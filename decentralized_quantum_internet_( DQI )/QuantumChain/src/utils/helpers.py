import hashlib
import random
import string

class Helpers:
    @staticmethod
    def hash_string(input_string):
        """Returns the SHA-256 hash of the input string."""
        return hashlib.sha256(input_string.encode()).hexdigest()

    @staticmethod
    def generate_random_string(length=10):
        """Generates a random string of fixed length."""
        letters = string.ascii_letters + string.digits
        return ''.join(random.choice(letters) for i in range(length))

    @staticmethod
    def validate_email(email):
        """Validates an email address using a simple regex."""
        import re
        regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(regex, email) is not None

# Example usage
if __name__ == "__main__":
    print(Helpers.hash_string("Hello, World!"))
    print(Helpers.generate_random_string(12))
    print(Helpers.validate_email("test@example.com"))
