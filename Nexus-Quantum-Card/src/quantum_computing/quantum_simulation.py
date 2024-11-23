from qiskit import QuantumCircuit, Aer, execute

class QuantumSimulation:
    def __init__(self, num_qubits):
        self.num_qubits = num_qubits
        self.circuit = QuantumCircuit(num_qubits)

    def apply_hadamard(self, qubit):
        """
        Apply Hadamard gate to a specific qubit.
        
        :param qubit: The qubit to which the Hadamard gate is applied.
        """
        self.circuit.h(qubit)

    def apply_cnot(self, control, target):
        """
        Apply CNOT gate with a control and target qubit.
        
        :param control: The control qubit.
        :param target: The target qubit.
        """
        self.circuit.cx(control, target)

    def measure(self):
        """
        Measure all qubits in the circuit.
        """
        self.circuit.measure_all()

    def run_simulation(self):
        """
        Run the quantum circuit simulation and return the results.
        """
        simulator = Aer.get_backend('qasm_simulator')
        job = execute(self.circuit, simulator, shots=1024)
        result = job.result()
        counts = result.get_counts(self.circuit)
        return counts

if __name__ == "__main__":
    # Example usage of QuantumSimulation
    simulation = QuantumSimulation(num_qubits=2)
    simulation.apply_hadamard(0)  # Apply Hadamard to qubit 0
    simulation.apply_cnot(0, 1)    # Apply CNOT with qubit 0 as control and qubit 1 as target
    simulation.measure()            # Measure the qubits
    results = simulation.run_simulation()
    print("Simulation results:", results)
