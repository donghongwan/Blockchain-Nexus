import unittest
from user_experience.ui_design import UIDesign
from user_experience.accessibility_features import AccessibilityFeatures
from user_experience.user_feedback import UserFeedback

class TestUIDesign(unittest.TestCase):
    def test_add_element(self):
        ui = UIDesign("Test UI")
        ui.add_element("Button", {"label": "Click Me", "color": "blue"})
        self.assertEqual(len(ui.elements), 1)
        self.assertEqual(ui.elements[0]['type'], "Button")

    def test_render(self):
        ui = UIDesign("Test UI")
        ui.add_element("Button", {"label": "Click Me", "color": "blue"})
        ui.add_element("TextField", {"placeholder": "Enter text"})
        ui.render()  # This will print, but we can check the elements count

class TestAccessibilityFeatures(unittest.TestCase):
    def test_add_feature(self):
        accessibility = AccessibilityFeatures()
        accessibility.add_feature("Screen Reader", "Supports visually impaired users.")
        self.assertEqual(len(accessibility.features), 1)
        self.assertEqual(accessibility.features[0]['name'], "Screen Reader")

class TestUser Feedback(unittest.TestCase):
    def test_collect_feedback(self):
        feedback_system = UserFeedback()
        feedback_system.collect_feedback("user_1", "Great app!")
        self.assertEqual(len(feedback_system.feedback_list), 1)
        self.assertEqual(feedback_system.feedback_list[0]['user_id'], "user_1")

if __name__ == "__main__":
    unittest.main()
