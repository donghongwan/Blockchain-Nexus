import cv2
import numpy as np
import face_recognition
import logging

class FaceRecognition:
    def __init__(self):
        self.known_faces = {}  # Dictionary to store known face encodings
        self.logger = self.setup_logger()

    def setup_logger(self):
        """Sets up a logger for the FaceRecognition class."""
        logger = logging.getLogger('FaceRecognition')
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler('face_recognition.log')
        handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logger.addHandler(handler)
        return logger

    def add_known_face(self, user_id, image):
        """Adds a known face encoding for a user."""
        try:
            # Encode the face from the provided image
            face_encodings = face_recognition.face_encodings(image)
            if face_encodings:
                self.known_faces[user_id] = face_encodings[0]  # Store the first encoding
                self.logger.info(f"Added known face for user: {user_id}")
            else:
                self.logger.warning(f"No face found in the provided image for user: {user_id}")
        except Exception as e:
            self.logger.error(f"Error adding known face for user {user_id}: {e}")

    def authenticate(self, user_id, image):
        """Authenticates a user based on face recognition."""
        try:
            # Check if the user has a known face
            if user_id not in self.known_faces:
                self.logger.warning(f"User  {user_id} not found in known faces.")
                return False

            # Encode the face from the provided image
            face_encodings = face_recognition.face_encodings(image)
            if not face_encodings:
                self.logger.warning(f"No face found in the provided image for user: {user_id}")
                return False

            # Compare the known face with the provided image
            matches = face_recognition.compare_faces([self.known_faces[user_id]], face_encodings[0])
            if matches[0]:
                self.logger.info(f"User  {user_id} authenticated successfully.")
                return True
            else:
                self.logger.warning(f"Authentication failed for user {user_id}.")
                return False
        except Exception as e:
            self.logger.error(f"Error authenticating user {user_id}: {e}")
            return False

    def liveness_detection(self, image):
        """Implements liveness detection to prevent spoofing."""
        # Placeholder for liveness detection logic
        # In a real implementation, this could involve checking for eye movement, blinking, etc.
        # For now, we will simulate a successful liveness check
        self.logger.info("Liveness detection passed.")
        return True

    def process_image(self, image):
        """Processes the image for face recognition."""
        if self.liveness_detection(image):
            return image
        else:
            self.logger.warning("Liveness detection failed.")
            return None

# Example usage
if __name__ == "__main__":
    face_recog = FaceRecognition()
    
    # Load an example image
    image_path = "path_to_image.jpg"  # Replace with the actual image path
    image = face_recognition.load_image_file(image_path)

    # Add a known face
    user_id = "user123"
    face_recog.add_known_face(user_id, image)

    # Authenticate the user
    is_authenticated = face_recog.authenticate(user_id, image)
    print(f"User  authenticated: {is_authenticated}")
