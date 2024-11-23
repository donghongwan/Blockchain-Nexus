import numpy as np
from scipy.linalg import sqrtm

class QuantumEncryptor:
    def __init__(self):
        self.basis = ['Z', 'X']  # Measurement bases
        self.entangled_pairs = []  # Store entangled pairs for QKD

    def generate_entangled_pair(self):
        """Generates an entangled pair of qubits."""
        # Bell state |Φ+> = (|00> + |11>) / sqrt(2)
        state = np.array([[1], [0], [0], [1]]) / np.sqrt(2)
        self.entangled_pairs.append(state)
        return state

    def encode(self, message):
        """Encodes a classical message into quantum states using entangled pairs."""
        encoded_states = []
        for bit in message:
            basis_choice = np.random.choice(self.basis)
            entangled_state = self.generate_entangled_pair()
            encoded_state = self._prepare_state(entangled_state, bit, basis_choice)
            encoded_states.append((encoded_state, basis_choice))
        return encoded_states

    def _prepare_state(self, entangled_state, bit, basis):
        """Prepares a quantum state based on the chosen basis and the bit."""
        if basis == 'Z':
            return entangled_state if bit == 0 else np.array([[0], [1], [1], [0]]) / np.sqrt(2)  # |0> or |1>
        elif basis == 'X':
            return (entangled_state + np.array([[0], [1], [1], [0]])) / np.sqrt(2) if bit == 0 else (entangled_state - np.array([[0], [1], [1], [0]])) / np.sqrt(2)  # |+> or |->

    def get_encoded_message(self, encoded_states):
        """Returns the encoded quantum states."""
        return encoded_states

    def error_correction(self, received_states):
        """Implements a simple error correction mechanism."""
        corrected_states = []
        for state in received_states:
            # Placeholder for error correction logic
            # In a real implementation, you would apply a quantum error correction code
            corrected_states.append(state)  # No actual correction applied for simplicity
        return corrected_states

    def measure(self, encoded_states, measurement_bases):
        """Measures the encoded quantum states."""
        decoded_message = []
        for (state, original_basis), measurement_basis in zip(encoded_states, measurement_bases):
            if original_basis == measurement_basis:
                decoded_bit = self._measure(state, measurement_basis)
                decoded_message.append(decoded_bit)
            else:
                decoded_message.append(None)  # Indeterminate due to basis mismatch
        return decoded_message

    def _measure(self, state, basis):
        """Measures the quantum state based on the chosen basis."""
        if basis == 'Z':
            probabilities = np.abs(state.flatten())**2
            return 0 if np.random.rand() < probabilities[0] else 1
        elif basis == 'X':
            # Measure in the X basis
            x_basis_states = np.array([[1, 1], [1, -1]]) / np.sqrt(2)  # |+> and |-> states
            probabilities = np.abs(np.dot(x_basis_states, state.flatten()))**2
            return 0 if np.random.rand() < probabilities[0] else 1

# Example usage
if __name__ == "__main__":
    encryptor = QuantumEncryptor()
    message = "101"
    encoded_states = encryptor.encode(message)
    print("Encoded States:", encoded_states)
