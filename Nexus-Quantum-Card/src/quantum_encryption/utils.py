import numpy as np

def generate_random_bits(length):
    """Generates a random binary string of the specified length."""
    return ''.join(np.random.choice(['0', '1']) for _ in range(length))

def prepare_bell_state():
    """Prepares a Bell state |Φ+> = (|00> + |11>) / sqrt(2)."""
    return np.array([[1], [0], [0], [1]]) / np.sqrt(2)

def measure_in_basis(state, basis):
    """Measures a quantum state in the specified basis."""
    if basis == 'Z':
        probabilities = np.abs(state.flatten())**2
        return 0 if np.random.rand() < probabilities[0] else 1
    elif basis == 'X':
        x_basis_states = np.array([[1, 1], [1, -1]]) / np.sqrt(2)  # |+> and |-> states
        probabilities = np.abs(np.dot(x_basis_states, state.flatten()))**2
        return 0 if np.random.rand() < probabilities[0] else 1
    else:
        raise ValueError("Invalid measurement basis. Choose 'Z' or 'X'.")

def basis_reconciliation(original_bases, measurement_bases):
    """Reconciles bases between sender and receiver."""
    return [original == measured for original, measured in zip(original_bases, measurement_bases)]

def error_correction(received_bits, original_bits):
    """Implements a simple error correction mechanism."""
    corrected_bits = []
    for received, original in zip(received_bits, original_bits):
        if received is None:
            corrected_bits.append(original)  # Assume original if received is None
        else:
            corrected_bits.append(received)  # Use received bit
    return corrected_bits

def print_quantum_state(state):
    """Prints the quantum state in a readable format."""
    print("Quantum State:")
    print(state)

# Example usage
if __name__ == "__main__":
    # Generate random bits
    random_bits = generate_random_bits(10)
    print(f"Random Bits: {random_bits}")

    # Prepare a Bell state
    bell_state = prepare_bell_state()
    print_quantum_state(bell_state)

    # Measure in Z basis
    measurement_result = measure_in_basis(bell_state, 'Z')
    print(f"Measurement Result in Z Basis: {measurement_result}")

    # Basis reconciliation example
    original_bases = ['Z', 'X', 'Z']
    measurement_bases = ['Z', 'Z', 'X']
    reconciled = basis_reconciliation(original_bases, measurement_bases)
    print(f"Basis Reconciliation: {reconciled}")

    # Error correction example
    received_bits = [0, None, 1]
    original_bits = [0, 1, 1]
    corrected_bits = error_correction(received_bits, original_bits)
    print(f"Corrected Bits: {corrected_bits}")
