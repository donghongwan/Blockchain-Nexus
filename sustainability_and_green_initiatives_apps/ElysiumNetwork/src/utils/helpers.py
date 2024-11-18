import hashlib
import random
import string

class Helpers:
    @staticmethod
    def generate_random_string(length=10):
        """Generate a random string of fixed length."""
        letters = string.ascii_letters
        return ''.join(random.choice(letters) for i in range(length))

    @staticmethod
    def hash_string(input_string):
        """Return the SHA-256 hash of the input string."""
        return hashlib.sha256(input_string.encode()).hexdigest()

    @staticmethod
    def format_timestamp(timestamp):
        """Format a timestamp into a readable string."""
        return timestamp.strftime('%Y-%m-%d %H:%M:%S')

# Example usage
if __name__ == "__main__":
    random_string = Helpers.generate_random_string(12)
    print(f"Random String: {random_string}")
    hashed_value = Helpers.hash_string("example")
    print(f"Hashed Value: {hashed_value}")
