import jwt
import bcrypt
from datetime import datetime, timedelta

class AuthManager:
    def __init__(self, secret_key, algorithm='HS256'):
        self.secret_key = secret_key
        self.algorithm = algorithm

    def hash_password(self, password):
        """Hashes the password using bcrypt."""
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    def verify_password(self, password, hashed):
        """Verifies the provided password against the hashed password."""
        return bcrypt.checkpw(password.encode(), hashed)

    def generate_token(self, user_id, expiration_minutes=30):
        """Generates a JWT token for the authenticated user."""
        expiration = datetime.utcnow() + timedelta(minutes=expiration_minutes)
        token = jwt.encode({'user_id': user_id, 'exp': expiration}, self.secret_key, algorithm=self.algorithm)
        return token

    def decode_token(self, token):
        """Decodes the JWT token and returns the user ID."""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload['user_id']
        except jwt.ExpiredSignatureError:
            return None  # Token has expired
        except jwt.InvalidTokenError:
            return None  # Invalid token
