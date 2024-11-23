from quantum_computing.quantum_simulation import QuantumSimulation
from quantum_computing.quantum_optimization import QuantumOptimization
from qiskit.quantum_info import Pauli
from quantum_computing.quantum_networking import QuantumNetworking

def main():
    # Example for Quantum Simulation
    print("=== Quantum Simulation ===")
    simulation = QuantumSimulation(num_qubits=2)
    simulation.apply_hadamard(0)  # Apply Hadamard to qubit 0
    simulation.apply_cnot(0, 1)    # Apply CNOT with qubit 0 as control and qubit 1 as target
    simulation.measure()            # Measure the qubits
    results = simulation.run_simulation()
    print("Simulation results:", results)

    # Example for Quantum Optimization
    print("\n=== Quantum Optimization ===")
    hamiltonian = Pauli('Z')  # Define a simple Hamiltonian
    optimizer = QuantumOptimization(hamiltonian)
    result = optimizer.optimize()
    print("Optimized result:", result)

    # Example for Quantum Networking
    print("\n=== Quantum Networking ===")
    networking = QuantumNetworking(num_qubits=2)
    networking.entangle_qubits(0, 1)  # Entangle qubit 0 and qubit 1
    networking.measure()               # Measure the qubits
    results = networking.run_network_simulation()
    print("Networking simulation results:", results)

if __name__ == "__main__":
    main()
