import sys
from src.network.p2p_network import P2PNetwork
from src.utils.config import Config
from src.utils.logger import Logger

logger = Logger()

def main():
    config = Config()
    port = config.get('node_port', 5001)  # Default port
    network = P2PNetwork(port)

    try:
        network.start()
        logger.info(f"Node started on port {port}. Listening for connections...")
        while True:
            # Keep the node running
            pass
    except KeyboardInterrupt:
        logger.info("Shutting down the node.")
        network.stop()
        sys.exit(0)
    except Exception as e:
        logger.critical(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
