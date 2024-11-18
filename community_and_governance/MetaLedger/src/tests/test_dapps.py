# test_dapps.py

import unittest
from dapp_template.dapp import app

class TestDApps(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_execute_contract(self):
        response = self.app.post('/api/execute', json={
            'method': 'set_value',
            'params': ['test_key', 'test_value']
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('success', response.get_json())

    def test_get_state(self):
        self.app.post('/api/execute', json={
            'method': 'set_value',
            'params': ['test_key', 'test_value']
        })
        response = self.app.get('/api/state')
        self.assertEqual(response.status_code, 200)
        state = response.get_json()
        self.assertEqual(state['test_key'], 'test_value')

if __name__ == '__main__':
    unittest.main()
