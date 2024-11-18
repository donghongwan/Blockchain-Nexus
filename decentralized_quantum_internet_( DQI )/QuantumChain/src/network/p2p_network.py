import socket
import threading
import json
from .node import Node
from .message_protocol import MessageProtocol

class P2PNetwork:
    def __init__(self, host='localhost', port=5000):
        self.host = host
        self.port = port
        self.nodes = {}
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        self.protocol = MessageProtocol()
        self.start_server()

    def start_server(self):
        print(f'Server started at {self.host}:{self.port}')
        threading.Thread(target=self.accept_connections, daemon=True).start()

    def accept_connections(self):
        while True:
            client_socket, address = self.server_socket.accept()
            print(f'Connection from {address} has been established!')
            threading.Thread(target=self.handle_client, args=(client_socket,), daemon=True).start()

    def handle_client(self, client_socket):
        while True:
            try:
                message = client_socket.recv(1024).decode()
                if not message:
                    break
                self.process_message(message)
            except Exception as e:
                print(f'Error: {e}')
                break
        client_socket.close()

    def process_message(self, message):
        data = json.loads(message)
        if data['type'] == 'new_transaction':
            print(f'New transaction received: {data["content"]}')
            # Handle new transaction logic here
        elif data['type'] == 'new_block':
            print(f'New block received: {data["content"]}')
            # Handle new block logic here

    def broadcast(self, message):
        for node in self.nodes.values():
            try:
                node.send_message(message)
            except Exception as e:
                print(f'Error sending message to {node.address}: {e}')

    def add_node(self, address):
        if address not in self.nodes:
            node = Node(address)
            self.nodes[address] = node
            print(f'Node added: {address}')

    def connect_to_node(self, address):
        try:
            node = Node(address)
            node.connect()
            self.add_node(address)
        except Exception as e:
            print(f'Could not connect to node {address}: {e}')
