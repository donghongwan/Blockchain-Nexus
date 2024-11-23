import unittest
from quantum_computing.quantum_simulation import QuantumSimulation
from quantum_computing.quantum_optimization import QuantumOptimization
from quantum_computing.quantum_networking import QuantumNetworking

class TestQuantumSimulation(unittest.TestCase):
    def test_hadamard_gate(self):
        simulation = QuantumSimulation(num_qubits=1)
        simulation.apply_hadamard(0)
        simulation.measure()
        results = simulation.run_simulation()
        self.assertIn('0', results)  # Check if the result contains '0' or '1'

class TestQuantumOptimization(unittest.TestCase):
    def test_optimize_hamiltonian(self):
        hamiltonian = Pauli('Z')
        optimizer = QuantumOptimization(hamiltonian)
        result = optimizer.optimize()
        self.assertIsNotNone(result)  # Ensure that the optimization returns a result

class TestQuantumNetworking(unittest.TestCase):
    def test_entangle_qubits(self):
        networking = QuantumNetworking(num_qubits=2)
        networking.entangle_qubits(0, 1)
        networking.measure()
        results = networking.run_network_simulation()
        self.assertIn('00', results)  # Check if the entangled state is present in the results

if __name__ == "__main__":
    unittest.main()
