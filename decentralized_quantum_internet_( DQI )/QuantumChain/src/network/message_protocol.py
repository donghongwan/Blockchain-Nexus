class MessageProtocol:
    def create_message(self, message_type, content):
        return {
            'type': message_type,
            'content': content
        }

    def parse_message(self, message):
        return message.get('type'), message.get('content')
