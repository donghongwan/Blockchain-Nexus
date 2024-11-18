class EcoToken:
    def __init__(self):
        self.balances = {}
        self.total_supply = 0

    def mint(self, recipient, amount):
        if recipient in self.balances:
            self.balances[recipient] += amount
        else:
            self.balances[recipient] = amount
        self.total_supply += amount

    def transfer(self, sender, recipient, amount):
        if self.balances.get(sender, 0) >= amount:
            self.balances[sender] -= amount self.mint(recipient, amount)
            return True
        return False

    def balance_of(self, user):
        return self.balances.get(user, 0)

    def total_supply(self):
        return self.total_supply
