class UIDesign:
    def __init__(self, title):
        self.title = title
        self.elements = []

    def add_element(self, element_type, properties):
        """
        Add a UI element to the design.
        
        :param element_type: Type of the UI element (e.g., button, text field).
        :param properties: A dictionary of properties for the element.
        """
        element = {
            'type': element_type,
            'properties': properties
        }
        self.elements.append(element)

    def render(self):
        """
        Render the UI design.
        """
        print(f"Rendering UI: {self.title}")
        for element in self.elements:
            print(f"Element: {element['type']}, Properties: {element['properties']}")

if __name__ == "__main__":
    # Example usage of UIDesign
    ui = UIDesign("Sample Application")
    ui.add_element("Button", {"label": "Submit", "color": "blue"})
    ui.add_element("TextField", {"placeholder": "Enter your name"})
    ui.render()
