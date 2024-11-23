from nexus_quantum_card import NexusQuantumCard

def basic_usage_example():
    nexus_card = NexusQuantumCard()
    
    # Sending a secure message
    message = "Hello, secure world!"
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

if __name__ == "__main__":
    basic_usage_example()
