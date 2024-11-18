import random
import numpy as np

class QuantumKeyDistribution:
    def __init__(self):
        self.basis = ['Z', 'X']  # Measurement bases
        self.key = []

    def generate_qubits(self, n):
        qubits = []
        for _ in range(n):
            bit = random.randint(0, 1)
            basis = random.choice(self.basis)
            qubits.append((bit, basis))
        return qubits

    def measure_qubit(self, qubit):
        bit, basis = qubit
        if basis == 'Z':
            return bit  # Measurement in Z basis
        else:
            return random.randint(0, 1)  # Measurement in X basis

    def generate_key(self, n):
        qubits = self.generate_qubits(n)
        for qubit in qubits:
            self.key.append(self.measure_qubit(qubit))
        return self.key

    def get_key(self):
        return self.key
