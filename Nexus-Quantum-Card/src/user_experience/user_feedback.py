class UserFeedback:
    def __init__(self):
        self.feedback_list = []

    def collect_feedback(self, user_id, feedback):
        """
        Collect feedback from a user.
        
        :param user_id: The ID of the user providing feedback.
        :param feedback: The feedback provided by the user.
        """
        self.feedback_list.append({
            'user_id': user_id,
            'feedback': feedback
        })

    def analyze_feedback(self):
        """
        Analyze the collected feedback.
        """
        if not self.feedback_list:
            print("No feedback collected.")
            return

        print("Analyzing Feedback:")
        for feedback in self.feedback_list:
            print(f"User  {feedback['user_id']} said: {feedback['feedback']}")

if __name__ == "__main__":
    # Example usage of UserFeedback
    feedback_system = UserFeedback()
    feedback_system.collect_feedback("user_1", "Great app, very user-friendly!")
    feedback_system.collect_feedback("user_2", "Could use more accessibility features.")
    feedback_system.analyze_feedback()
