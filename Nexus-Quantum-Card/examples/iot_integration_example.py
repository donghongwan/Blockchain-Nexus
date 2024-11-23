from nexus_quantum_card import NexusQuantumCard
import random
import time

def simulate_iot_device(nexus_card):
    """Simulates an IoT device sending secure messages."""
    device_id = "iot_device_1"
    
    while True:
        # Simulate data from the IoT device
        data = {
            "temperature": random.uniform(20.0, 30.0),
            "humidity": random.uniform(30.0, 70.0)
        }
        message = f"Device {device_id} data: {data}"
        
        # Send secure message
        secure_message = nexus_card.send_secure_message(message)
        if secure_message:
            print("Secure message sent from IoT device:", secure_message)
        
        time.sleep(5)  # Simulate sending data every 5 seconds

if __name__ == "__main__":
    nexus_card = NexusQuantumCard()
    simulate_iot_device(nexus_card)
