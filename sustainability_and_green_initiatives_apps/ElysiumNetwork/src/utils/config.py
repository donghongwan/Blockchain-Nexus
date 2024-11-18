import json
import os

class Config:
    def __init__(self, config_file='config.json'):
        self.config_file = config_file
        self.config_data = self.load_config()

    def load_config(self):
        if not os.path.exists(self.config_file):
            raise FileNotFoundError(f"Configuration file {self.config_file} not found.")
        with open(self.config_file, 'r') as f:
            return json.load(f)

    def get(self, key, default=None):
        return self.config_data.get(key, default)

# Example usage
if __name__ == "__main__":
    config = Config()
    db_host = config.get('database_host', 'localhost')
    print(f"Database Host: {db_host}")
