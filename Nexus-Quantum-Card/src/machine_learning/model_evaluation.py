from sklearn.metrics import confusion_matrix, classification_report

class ModelEvaluation:
    def __init__(self):
        pass

    def evaluate(self, y_true, y_pred):
        """
        Evaluate the model's performance.
        
        :param y_true: True labels.
        :param y_pred: Predicted labels.
        """
        cm = confusion_matrix(y_true, y_pred)
        report = classification_report(y_true, y_pred)
        print("Confusion Matrix:")
        print(cm)
        print("\nClassification Report:")
        print(report)

if __name__ == "__main__":
    # Example usage of ModelEvaluation
    y_true = [0, 1, 1, 0, 1]  # Example true labels
    y_pred = [0, 1, 0, 0, 1]  # Example predicted labels

    evaluator = ModelEvaluation()
    evaluator.evaluate(y_true, y_pred)
