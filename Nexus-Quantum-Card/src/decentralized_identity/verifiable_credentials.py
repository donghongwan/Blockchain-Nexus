import jwt
import datetime
from typing import Dict, Any

class VerifiableCredential:
    def __init__(self, secret_key: str):
        self.secret_key = secret_key

    def issue_credential(self, subject: str, claims: Dict[str, Any], expiration_minutes: int = 60) -> str:
        """
        Issue a verifiable credential as a JWT.
        
        :param subject: The subject of the credential (e.g., user ID).
        :param claims: The claims to include in the credential.
        :param expiration_minutes: The expiration time in minutes.
        :return: The signed JWT credential.
        """
        expiration = datetime.datetime.utcnow() + datetime.timedelta(minutes=expiration_minutes)
        credential = {
            "sub": subject,
            "iat": datetime.datetime.utcnow(),
            "exp": expiration,
            **claims
        }
        return jwt.encode(credential, self.secret_key, algorithm="HS256")

    def verify_credential(self, token: str) -> Dict[str, Any]:
        """
        Verify a verifiable credential.
        
        :param token: The JWT credential to verify.
        :return: The decoded claims if verification is successful.
        :raises jwt.ExpiredSignatureError: If the token has expired.
        :raises jwt.InvalidTokenError: If the token is invalid.
        """
        try:
            decoded = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            return decoded
        except jwt.ExpiredSignatureError:
            raise Exception("The credential has expired.")
        except jwt.InvalidTokenError:
            raise Exception("Invalid credential.")

if __name__ == "__main__":
    secret_key = "your_secret_key"
    vc = VerifiableCredential(secret_key)

    # Issue a credential
    claims = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "student"
    }
    credential = vc.issue_credential(subject="user123", claims=claims)
    print(f"Issued Credential: {credential}")

    # Verify the credential
    try:
        verified_claims = vc.verify_credential(credential)
        print("Verified Claims:", verified_claims)
    except Exception as e:
        print("Verification Error:", str(e))
