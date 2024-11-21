import logging
import os

def setup_logger(name: str, log_file: str = None, level=logging.INFO):
    """Set up a logger with specified name and log file."""
    if log_file is None:
        log_file = os.path.join(os.getcwd(), 'app.log')

    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    # Create a file handler
    file_handler = logging.FileHandler(log_file)
    file_handler.setFormatter(formatter)

    # Create a console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # Create a logger
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

# Example usage
logger = setup_logger('my_app_logger')
logger.info('Logger is set up.')
