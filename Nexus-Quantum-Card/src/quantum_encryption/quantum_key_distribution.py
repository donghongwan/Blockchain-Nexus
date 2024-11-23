import numpy as np
from quantum_encryptor import QuantumEncryptor
from quantum_decryptor import QuantumDecryptor

class QuantumKeyDistribution:
    def __init__(self):
        self.encryptor = QuantumEncryptor()
        self.decryptor = QuantumDecryptor()

    def generate_key(self, length):
        """Generates a quantum key using QKD."""
        # Step 1: Sender generates a random message
        message = ''.join(np.random.choice(['0', '1']) for _ in range(length))
        print(f"Original Message: {message}")

        # Step 2: Sender encodes the message into quantum states
        encoded_states = self.encryptor.encode(message)
        print(f"Encoded States: {encoded_states}")

        # Step 3: Receiver randomly chooses measurement bases
        measurement_bases = np.random.choice(self.encryptor.basis, length)
        print(f"Measurement Bases: {measurement_bases}")

        # Step 4: Receiver decodes the message
        decoded_message = self.decryptor.decode(encoded_states, measurement_bases)
        print(f"Decoded Message: {decoded_message}")

        # Step 5: Basis reconciliation
        original_bases = [state[1] for state in encoded_states]  # Original bases used by sender
        reconciled_bits = self.decryptor.basis_reconciliation(original_bases, measurement_bases)
        print(f"Basis Reconciliation: {reconciled_bits}")

        # Step 6: Error correction
        corrected_bits = self.decryptor.error_correction(decoded_message, message)
        print(f"Corrected Bits: {corrected_bits}")

        # Step 7: Final key generation
        final_key = ''.join(str(bit) for bit, reconciled in zip(corrected_bits, reconciled_bits) if reconciled)
        print(f"Final Key: {final_key}")
        return final_key

# Example usage
if __name__ == "__main__":
    qkd = QuantumKeyDistribution()
    key_length = 10  # Length of the key to be generated
    final_key = qkd.generate_key(key_length)
