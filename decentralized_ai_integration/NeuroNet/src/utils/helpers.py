import re
import hashlib
import random
import string

class Helpers:
    @staticmethod
    def generate_random_string(length=12):
        """Generates a random string of fixed length."""
        letters = string.ascii_letters + string.digits
        return ''.join(random.choice(letters) for i in range(length))

    @staticmethod
    def hash_string(input_string):
        """Hashes a string using SHA-256."""
        return hashlib.sha256(input_string.encode()).hexdigest()

    @staticmethod
    def validate_email(email):
        """Validates an email address using a regex pattern."""
        pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(pattern, email) is not None

    @staticmethod
    def read_file(file_path):
        """Reads the contents of a file and returns it as a string."""
        with open(file_path, 'r') as file:
            return file.read()

    @staticmethod
    def write_file(file_path, content):
        """Writes a string to a file."""
        with open(file_path, 'w') as file:
            file.write(content)
