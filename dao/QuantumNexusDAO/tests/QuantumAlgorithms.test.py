import unittest
from quantum_algorithms import QuantumAlgorithm

class TestQuantumAlgorithms(unittest.TestCase):

    def setUp(self):
        self.algorithm = QuantumAlgorithm()

    def test_performance_benchmark(self):
        result = self.algorithm.run_benchmark()
        self.assertTrue(result['time'] < 1.0)  # Ensure it runs within 1 second

    def test_accuracy_check(self):
        result = self.algorithm.run_algorithm()
        self.assertAlmostEqual(result['accuracy'], 1.0, delta=0.01)  # Check accuracy within 1%
