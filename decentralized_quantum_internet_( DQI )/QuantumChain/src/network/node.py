import socket
import json

class Node:
    def __init__(self, address):
        self.address = address
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    def connect(self):
        self.socket.connect(self.address)
        print(f'Connected to node at {self.address}')

    def send_message(self, message):
        self.socket.sendall(json.dumps(message).encode())
        print(f'Message sent to {self.address}: {message}')

    def close(self):
        self.socket.close()
