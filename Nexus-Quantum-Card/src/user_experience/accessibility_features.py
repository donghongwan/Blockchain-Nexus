class AccessibilityFeatures:
    def __init__(self):
        self.features = []

    def add_feature(self, feature_name, description):
        """
        Add an accessibility feature.
        
        :param feature_name: Name of the accessibility feature.
        :param description: Description of the feature.
        """
        feature = {
            'name': feature_name,
            'description': description
        }
        self.features.append(feature)

    def list_features(self):
        """
        List all accessibility features.
        """
        print("Accessibility Features:")
        for feature in self.features:
            print(f"- {feature['name']}: {feature['description']}")

if __name__ == "__main__":
    # Example usage of AccessibilityFeatures
    accessibility = AccessibilityFeatures()
    accessibility.add_feature("Screen Reader Support", "Allows visually impaired users to navigate the application using voice commands.")
    accessibility.add_feature("Keyboard Navigation", "Enables users to navigate the application using keyboard shortcuts.")
    accessibility.list_features()
