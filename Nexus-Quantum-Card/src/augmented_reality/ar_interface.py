import cv2
import numpy as np
from ar_visualization import ARVisualizer
from ar_utils import get_camera_matrix

class ARInterface:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)  # Initialize webcam
        self.visualizer = ARVisualizer()
        self.camera_matrix = get_camera_matrix()

    def start(self):
        """Starts the AR interface."""
        while True:
            ret, frame = self.cap.read()
            if not ret:
                break

            # Process the frame for AR
            self.visualizer.process_frame(frame, self.camera_matrix)

            # Display the augmented frame
            cv2.imshow('Augmented Reality', self.visualizer.get_augmented_frame())

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        self.cleanup()

    def cleanup(self):
        """Cleans up resources."""
        self.cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    ar_interface = ARInterface()
    ar_interface.start()
