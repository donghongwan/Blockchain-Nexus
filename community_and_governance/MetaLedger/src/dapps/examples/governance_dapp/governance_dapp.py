# governance_dapp.py

from flask import Flask, request, jsonify
from governance_model import GovernanceModel
from voting_system import VotingSystem
from proposal_management import ProposalManagement

app = Flask(__name__)
governance_model = GovernanceModel()
voting_system = VotingSystem(governance_model)
proposal_management```python
= ProposalManagement()

@app.route('/api/create_proposal', methods=['POST'])
def create_proposal():
    data = request.json
    proposal = proposal_management.create_proposal(data['title'], data['description'], data['proposer'])
    return jsonify({'proposal_id': proposal.proposal_id, 'status': proposal.status})

@app.route('/api/vote', methods=['POST'])
def vote():
    data = request.json
    success = proposal_management.vote_on_proposal(data['proposal_id'], data['user_id'], data['vote_value'])
    return jsonify({'success': success})

@app.route('/api/finalize_proposal/<int:proposal_id>', methods=['POST'])
def finalize_proposal(proposal_id):
    status = proposal_management.finalize_proposal(proposal_id)
    return jsonify({'status': status})

if __name__ == '__main__':
    app.run(debug=True, port=5002)
