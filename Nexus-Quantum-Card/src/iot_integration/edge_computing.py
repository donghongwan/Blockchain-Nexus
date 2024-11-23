import random
import time
import json

class EdgeComputing:
    def __init__(self):
        self.data_buffer = []

    def collect_data(self):
        """
        Simulate data collection from IoT devices.
        """
        # Simulate IoT device data (e.g., temperature, humidity, etc.)
        temperature = random.uniform(15.0, 30.0)  # Simulated temperature in Celsius
        humidity = random.uniform(30.0, 70.0)      # Simulated humidity in percentage
        device_id = random.choice(['device_1', 'device_2', 'device_3'])
        data = {
            'device_id': device_id,
            'temperature': temperature,
            'humidity': humidity,
            'timestamp': time.time()
        }
        return data

    def process_data(self, data):
        """
        Process the collected data to make decisions.
        
        :param data: The data collected from IoT devices.
        :return: Decision based on the processed data.
        """
        # Simple decision-making based on temperature and humidity
        if data['temperature'] > 25.0:
            decision = "Turn on cooling system."
        elif data['humidity'] < 40.0:
            decision = "Activate humidifier."
        else:
            decision = "Conditions are normal."
        
        return decision

    def run(self):
        """
        Main loop for edge computing.
        """
        print("Starting Edge Computing for IoT Data Processing...")
        while True:
            # Collect data from IoT devices
            data = self.collect_data()
            self.data_buffer.append(data)

            # Process the collected data
            decision = self.process_data(data)
            print(f"Data: {json.dumps(data, indent=2)}")
            print(f"Decision: {decision}")

            time.sleep(2)  # Simulate a delay between data collections

if __name__ == "__main__":
    edge_computing = EdgeComputing()
    edge_computing.run()
