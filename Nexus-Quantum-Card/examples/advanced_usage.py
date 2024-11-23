from nexus_quantum_card import NexusQuantumCard

def advanced_usage_example():
    nexus_card = NexusQuantumCard()
    
    # Sending multiple secure messages
    messages = ["First message", "Second message", "Third message"]
    
    for message in messages:
        try:
            secure_message = nexus_card.send_secure_message(message)
            if secure_message:
                print("Secure message sent:", secure_message)
                
                # Simulating receiving the message
                decrypted_message = nexus_card.receive_secure_message(
                    secure_message['quantum_key'],
                    secure_message['nonce'],
                    secure_message['ciphertext'],
                    secure_message['tag']
                )
                print("Decrypted message:", decrypted_message)
        except Exception as e:
            print(f"Error sending message '{message}': {e}")

if __name__ == "__main__":
    advanced_usage_example()
