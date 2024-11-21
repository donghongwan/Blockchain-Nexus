import json
import asyncio
from web3 import Web3

class EventListener:
    def __init__(self, provider_url, contract_address, abi):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))
        self.contract = self.web3.eth.contract(address=contract_address, abi=abi)

    def is_connected(self):
        return self.web3.isConnected()

    async def listen_for_events(self, event_name):
        if not self.is_connected():
            raise ConnectionError("Unable to connect to the blockchain network.")

        event_filter = self.contract.events[event_name].createFilter(fromBlock='latest')

        while True:
            for event in event_filter.get_new_entries():
                print(f"New event: {event}")
                # Process the event (e.g., store in a database, trigger notifications, etc.)
            await asyncio.sleep(2)  # Polling interval

# Example usage
if __name__ == "__main__":
    provider_url = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"
    contract_address = "0xYourContractAddress"
    abi = json.loads('[{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"recipient","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"PaymentMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"}],"name":"KYCCompleted","type":"event"}]')

    listener = EventListener(provider_url, contract_address, abi)

    async def main():
        await listener.listen_for_events('PaymentMade')
        await listener.listen_for_events('KYCCompleted')

    asyncio.run(main())
