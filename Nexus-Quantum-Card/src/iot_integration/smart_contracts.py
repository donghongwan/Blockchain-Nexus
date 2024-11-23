import json
from hashlib import sha256

class SmartContract:
    def __init__(self, contract_id, owner):
        self.contract_id = contract_id
        self.owner = owner
        self.state = "active"
        self.actions = []

    def add_action(self, action):
        """
        Add an action to the smart contract.
        
        :param action: The action to be added.
        """
        self.actions.append(action)

    def execute(self):
        """
        Execute the actions defined in the smart contract.
        """
        if self.state != "active":
            print("Contract is not active.")
            return

        for action in self.actions:
            print(f"Executing action: {action}")
            # Here you would implement the actual logic for each action
            # For demonstration, we just print the action

    def terminate(self):
        """
        Terminate the smart contract.
        """
        self.state = "terminated"
        print(f"Contract {self.contract_id} terminated.")

    def get_contract_hash(self):
        """
        Get a hash of the contract for verification.
        
        :return: SHA-256 hash of the contract details.
        """
        contract_details = {
            "contract_id": self.contract_id,
            "owner": self.owner,
            "state": self.state,
            "actions": self.actions
        }
        return sha256(json.dumps(contract_details, sort_keys=True).encode()).hexdigest()

if __name__ == "__main__":
    # Example usage of SmartContract
    contract = SmartContract(contract_id= "contract_001", owner="device_1")
    contract.add_action("Turn on cooling system")
    contract.add_action("Send alert to owner")
    
    print(f"Contract Hash: {contract.get_contract_hash()}")
    contract.execute()
    contract.terminate()
