class IdentityManager:
    def __init__(self):
        self.identities = {}

    def add_identity(self, user_id, public_key):
        self.identities[user_id] = public_key

    def verify_identity(self, user_id, signature):
        public_key = self.identities.get(user_id)
        if public_key:
            return public_key.verify(signature)
        return False
