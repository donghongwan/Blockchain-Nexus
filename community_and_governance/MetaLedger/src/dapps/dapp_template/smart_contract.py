# smart_contract.py

class SmartContract:
    def __init__(self):
        self.state = {}

    def execute(self, method, params):
        if hasattr(self, method):
            return getattr(self, method)(*params)
        else:
            return {'error': 'Method not found'}

    def get_state(self):
        return self.state

    def set_value(self, key, value):
        self.state[key] = value
        return {'status': 'success', 'key': key, 'value': value}

    def get_value(self, key):
        return {'key': key, 'value': self.state.get(key, None)}
