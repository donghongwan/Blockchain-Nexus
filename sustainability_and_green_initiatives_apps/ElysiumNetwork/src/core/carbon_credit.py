class CarbonCredit:
    def __init__(self):
        self.credits = {}

    def mint_credit(self, user_id, amount):
        if user_id in self.credits:
            self.credits[user_id] += amount
        else:
            self.credits[user_id] = amount

    def transfer_credit(self, from_user, to_user, amount):
        if self.credits.get(from_user, 0) >= amount:
            self.credits[from_user] -= amount
            self.mint_credit(to_user, amount)
            return True
        return False

    def get_balance(self, user_id):
        return self.credits.get(user_id, 0)
