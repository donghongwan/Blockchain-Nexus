import paho.mqtt.client as mqtt
import json

class DataCollection:
    def __init__(self, broker_address):
        self.broker_address = broker_address
        self.client = mqtt.Client()

    def on_connect(self, client, userdata, flags, rc):
        """Callback for when the client connects to the broker."""
        print("Connected with result code " + str(rc))
        client.subscribe("iot/devices/#")  # Subscribe to all device topics

    def on_message(self, client, userdata, msg):
        """Callback for when a message is received from a subscribed topic."""
        print(f"Message received on topic {msg.topic}: {msg.payload.decode()}")
        # Here you would typically process and store the data
        data = json.loads(msg.payload.decode())
        self.process_data(data)

    def process_data(self, data):
        """Processes the incoming data from IoT devices."""
        # Implement data processing logic here
        print("Processing data:", data)

    def start(self):
        """Starts the MQTT client."""
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.connect(self.broker_address)
        self.client.loop_forever()

# Example usage
if __name__ == "__main__":
    data_collector = DataCollection("mqtt.eclipse.org")  # Example broker
    data_collector.start()
