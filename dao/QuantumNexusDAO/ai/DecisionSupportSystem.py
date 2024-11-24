import pandas as pd

class DecisionSupportSystem:
    def __init__(self, proposals):
        self.proposals = proposals

    def evaluate_proposals(self):
        # Example evaluation logic
        self.proposals['score'] = self.proposals['impact'] * self.proposals['feasibility']
        return self.proposals.sort_values(by='score', ascending=False)

# Example usage
if __name__ == "__main__":
    proposals = pd.DataFrame({
        'proposal': ['Proposal A', 'Proposal B', 'Proposal C'],
        'impact': [5, 3, 4],
        'feasibility': [4, 5, 2]
    })
    dss = DecisionSupportSystem(proposals)
    ranked_proposals = dss.evaluate_proposals()
    print(ranked_proposals)
