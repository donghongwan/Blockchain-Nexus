import logging
import os
from logging.handlers import RotatingFileHandler

class Logger:
    def __init__(self, name, log_file='app.log', level=logging.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(level)

        # Create a file handler that logs messages to a file
        handler = RotatingFileHandler(log_file, maxBytes=10*1024*1024, backupCount=5)  # 10 MB
        handler.setLevel(level)

        # Create a console handler for outputting logs to the console
        console_handler = logging.StreamHandler()
        console_handler.setLevel(level)

        # Create a formatter and set it for both handlers
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # Add the handlers to the logger
        self.logger.addHandler(handler)
        self.logger.addHandler(console_handler)

    def get_logger(self):
        return self.logger
